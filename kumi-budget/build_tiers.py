"""Builds the live Kumi budget page: runs gen_v2.py for the core build and tiers 1–3 and joins them under one left rail.
The rail picks the build; every number on the page comes from that build's own run.
Run:  python3 build_tiers.py            (writes the hosted page and the local copy)
      python3 build_tiers.py out.html   (writes a check copy only)"""
import json, os, re, subprocess, sys
from doc_style import HEAD, RUNNING

HERE = os.path.dirname(os.path.abspath(__file__))
OUTS = [os.path.join(HERE, '..', 'public', 'kumi-pilot-budget.html'),          # hosted page (singsinghai.com.au/kumi-pilot-budget): no internal rates
        os.path.join(HERE, 'dist', 'kumi-budget-with-rates.html')]            # local copy that keeps the #team rates appendix
if len(sys.argv) > 1: OUTS = [sys.argv[1]]

parts, totals = {}, {}
for t in (0, 1, 2, 3):   # tier 0 = the core build
    part = os.path.join(HERE, f'part{t}.html')
    res = subprocess.run([sys.executable, 'gen_v2.py'], cwd=HERE, capture_output=True, text=True,
                         env={**os.environ, 'TIER': str(t), 'PART': '1', 'OUT': part}, check=True)
    totals[t] = json.loads(res.stdout)
    parts[t] = open(part, encoding='utf8').read()
    os.remove(part)

# Each rail line: (text, task codes, purchases, other costs). Its price is what those add over the tier below,
# with the management fee and contingency included. The last line of each box takes the remainder, so lines add up to the tier price.
RAIL = {
 0: [("Windows app that works offline, with no lost data", ["1.3","1.4","A1","A3","A4","A5","A6","A7"], ["code-signing","Cloud hosting during build","laptop"], []),
     ("Student profiles and sign-in, in Tok Pisin or English", ["A2"], [], []),
     ("20 lessons in numeracy and literacy, with a question bank", ["1.1","B2","C1","C2","C3","C4"], [], []),
     ("Teacher dashboard", ["E1"], [], []),
     ("Benchmark tests, a comparison class and reports", ["E2","I7","I8"], [], []),
     ("Safeguarding, testing, installation, local support and project management", None, [], [])],
 1: [("Kumi narrates every lesson in English, with Tok Pisin on screen", [], ["ElevenLabs"], []),
     ("Live AI help from Kumi, processed in Australia", ["D1","G6","A1"], ["Claude API"], ["pilot_exact"]),
     ("Adaptive practice at each child’s level", ["D2","I8"], [], []),
     ("Offline help: hints and encouragement, checked by people", ["D3"], [], []),
     ("Kumi kept online for 3 months after the pilot", None, [], ["bridge_exact"])],
 2: [("Children answer Kumi by voice in English", ["B1","B7","B8","B9","1.4","G4"], [], []),
     ("Kumi’s own Tok Pisin voice", ["B3","B6"], ["voice actor","recording kit","Kumi’s voice training","ElevenLabs"], []),
     ("Weekly review of Kumi’s conversations", ["D4","I4"], [], []),
     ("External education specialist sign-off", ["G7"], [], []),
     ("3 months of full support after the pilot", [], [], ["bridge_exact"]),
     ("Extra testing and pilot support for the above", None, [], [])],
 3: [("Kumi understands children speaking Tok Pisin", ["B2","B3","B4","B5","B6","B9"], ["Tok Pisin speakers","IARPA","speech recognition training"], []),
     ("Speech retuned on real classroom voices", ["I5"], [], []),
     ("Personal development lessons: 30 hours over 3 subjects", ["C1","C2","C3","C4"], [], [])],
}
LAB, OTH = 1.25, 1.15   # labour carries the 10% fee and 15% contingency; purchases carry the contingency
def line_cost(t, tasks, buys, other):
    now, before = totals[t], (totals[t-1] if t else {"task_cost": {}, "tp_cost": {}})
    c = sum(LAB*(now["task_cost"].get(k, 0) - before["task_cost"].get(k, 0)) for k in tasks)
    for key in buys:
        hit = [i for i in now["tp_cost"] if key.lower() in i.lower()]; assert len(hit) == 1, key
        c += OTH*(now["tp_cost"][hit[0]] - before["tp_cost"].get(hit[0], 0))
    c += sum(OTH*(now[k] - (before.get(k, 0) if t else 0)) for k in other)
    return c
COSTS = {}
for t, lines in RAIL.items():
    step = totals[t]["grand"] - (totals[t-1]["grand"] if t else 0)
    got = [round(line_cost(t, tk, bu, ot)) if tk is not None else None for _, tk, bu, ot in lines]
    rest = step - sum(g for g in got if g is not None)
    COSTS[t] = [g if g is not None else rest for g in got]
    assert sum(COSTS[t]) == step and min(COSTS[t]) >= 0, (t, COSTS[t], step)
BASE = {1: "Core", 2: "Tier 1", 3: "Tier 2"}
def ul(t): return "<ul>" + "".join(f"<li><span>{x}</span><span class='pc'>{'' if t == 0 else '+'}${c:,}</span></li>" for (x, *_), c in zip(RAIL[t], COSTS[t])) + "</ul>"
rail = ['<aside class="rail"><h3>Choose a build</h3><div class="tiers">',
        f'<div class="tierbox core t0" data-tier="0"><button class="pick" type="button"><span class="sw"></span><span class="nm">Core build</span><span class="pr">${totals[0]["grand"]:,}</span></button>'
        f'<details><summary>In every tier</summary>{ul(0)}</details></div>']
for t in (1, 2, 3):
    rail.append(f'<div class="tierbox t{t}" data-tier="{t}"><button class="pick" type="button"><span class="sw"></span><span class="nm">Tier {t}</span>'
                f'<span class="pr">${totals[t]["grand"]:,}</span></button>'
                f'<details><summary>{BASE[t]} + {len(RAIL[t])} more <span class="pc">+${sum(COSTS[t]):,}</span></summary>{ul(t)}</details></div>')

# --- "Adjust your estimate": levers that move the price
OFFICE_MONTH = 5000          # A$ a month, office expense set by Sing Singh AI
OFFICE_MONTHS = 20*12/52     # office paid for the 20-week build only, in months
ICON = {  # small line icons, 14 px
 "book": '<path d="M2 3h4a2 2 0 0 1 2 2v8a1.5 1.5 0 0 0-1.5-1.5H2zM14 3h-4a2 2 0 0 0-2 2v8a1.5 1.5 0 0 1 1.5-1.5H14z"/>',
 "office": '<path d="M3 14V2h7v12M10 6h3v8M1 14h14M5 4.5h1M7.5 4.5h1M5 7h1M7.5 7h1M5 9.5h1M7.5 9.5h1"/>',
 "puzzle": '<path d="M3 3h4v1.5a1.5 1.5 0 0 0 3 0V3h3v4h-1.5a1.5 1.5 0 0 0 0 3H13v3H3z"/>',
 "shield": '<path d="M8 1.5 13.5 4v4c0 3.2-2.4 5.6-5.5 6.5C4.9 13.6 2.5 11.2 2.5 8V4z"/>',
 "people": '<path d="M6 7a2.25 2.25 0 1 0 0-4.5A2.25 2.25 0 0 0 6 7zM1.5 14c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5M11 7a2 2 0 1 0 0-4M12 9.6c1.6.5 2.6 2.2 2.6 4.4"/>',
}
def ic(k): return f'<svg class="ic" viewBox="0 0 16 16" aria-hidden="true">{ICON[k]}</svg>'
def stepper(k, d, val, label, icon, extra=""):
    return (f'<div class="row"><span class="lab">{ic(icon)}{label}</span><span class="step"><button type="button" data-k="{k}" data-d="-{d}" aria-label="Less">−</button>'
            f'<b id="v-{k}">{val}</b><button type="button" data-k="{k}" data-d="{d}" aria-label="More">+</button></span></div>{extra}')
ADDON_NAMES = [x[0].replace("Pijin", "Tok Pisin") for x in totals[3]["addons"]]
rail.append('</div><details class="calc" id="calcbox" open><summary>Adjust your estimate</summary>'
  + stepper("subj", 1, 2, "Subjects", "book")
  + stepper("less", 1, 10, "Lessons per subject", "book", '<div class="sub" id="c-hours"></div>')
  + f'<div class="row"><label class="lab">{ic("office")}<input type="checkbox" id="v-office"> Office expense</label><b class="num" id="d-office"></b></div>'
  + f'<div class="sub">${OFFICE_MONTH:,} a month for the first 20 weeks (the build)</div>'
  + f'<div class="row"><span class="lab">{ic("puzzle")}Optional add-ons</span></div>'
  + ''.join(f'<label class="addon"><input type="checkbox" data-addon="{i}"> {n}</label>' for i, n in enumerate(ADDON_NAMES))
  + f'<div class="row"><span class="lab">{ic("shield")}Contingency</span><span class="seg" id="v-cont">'
  + ''.join(f'<button type="button" data-c="{c}"{" class=on" if c == 15 else ""}>{c}%</button>' for c in (10, 15, 20)) + '</span></div>'
  + '<ul class="chg" id="c-lines"></ul>'
  + '<div class="tot"><span>Your estimate</span><b id="c-total"></b></div><div class="sub" id="c-vs"></div>'
  + '<div class="gap"></div><h3>Running cost after the pilot</h3>'
  + f'<div class="row"><span class="lab">{ic("people")}Students</span><span class="step"><button type="button" data-k="stu" data-d="-25" aria-label="Fewer">−</button>'
    '<input id="v-stu" type="number" min="25" max="5000" step="25" value="100" aria-label="Number of students"><button type="button" data-k="stu" data-d="25" aria-label="More">+</button></span></div>'
  + '<div class="row"><span>Per month</span><b class="num" id="r-month"></b></div>'
  + '<div class="row"><span>Per student, per month</span><b class="num" id="r-per"></b></div>'
  + '<div class="row"><span>Per year</span><b class="num" id="r-year"></b></div>'
  + f'<p class="rnote">Each one-hour lesson changes the build by about ${totals[3]["per_lesson"]:,.0f}. '
    'Labour carries the 10% management fee; everything carries the contingency you choose. Support steps up by 2 days a month for every 300 students. The pages show the standard tier.</p></details>')
rail.append('<label><input type="checkbox" id="showhl" checked> Show what each tier adds</label>'
            '<p class="rnote">Untick for a clean copy of the chosen tier. Printing gives the chosen tier only.</p></aside>')

CALC = {"tiers": {t: dict(grand=totals[t]["grand_exact"], direct=totals[t]["direct_exact"], mgmt=totals[t]["mgmt_exact"],
                            subjects=totals[t]["subjects"], lessons=totals[t]["lessons"], run=totals[t]["run_params"],
                            lesson=totals[t]["per_lesson_labour"], bridge=totals[t]["bridge_month_exact"],
                            tripLab=totals[t]["trip_labour"], tripOther=totals[t]["trip_other"], addons=totals[t]["addons"]) for t in (0, 1, 2, 3)},
        "office": OFFICE_MONTH, "months": OFFICE_MONTHS, "addonNames": ADDON_NAMES}
JS = """<script>(function(){
var KEY='kumiTier', root=document.documentElement, RUN=%s, CALC=%s,
    st8={subj:2, less:10, stu:100, office:false, add:{}, cont:15, tier:'3'},
    LIM={subj:[1,5], less:[5,20], stu:[25,5000]};
function fmt(n){ return '$'+Math.round(n).toLocaleString('en-AU'); }
function sgn(n){ return (n<0?'−':'+')+fmt(Math.abs(n)); }
function voice(r, n){ if(!r.voice.length) return 0; var c=n*r.credits_per_student; for(var i=0;i<r.voice.length;i++){ if(r.voice[i][0]===null || c<=r.voice[i][0]) return r.voice[i][1]; } return 0; }
function calc(){
  var T=CALC.tiers[st8.tier], r=T.run, c=st8.cont/100, lines=[];
  ['subj','less'].forEach(function(k){ document.getElementById('v-'+k).textContent=st8[k]; });
  var hrs=st8.subj*st8.less; document.getElementById('c-hours').textContent=hrs+' hours of content for each student';
  // each change as [label, labour, other costs]; labour also carries the management fee
  var ch=[['Content', (hrs - T.subjects*T.lessons)*T.lesson, 0],
          ['Office expense', 0, st8.office ? CALC.office*CALC.months : 0]];
  CALC.addonNames.forEach(function(n,i){ if(st8.add[i]) ch.push([n, T.addons[i][1], T.addons[i][2]]); });
  var dLab=0, dOth=0, ul=document.getElementById('c-lines'); ul.innerHTML='';
  ch.forEach(function(x){ var v=x[1]*(1+0.10+c)+x[2]*(1+c); dLab+=x[1]; dOth+=x[2];
    if(Math.abs(v)>=1){ var li=document.createElement('li'); li.innerHTML='<span></span><b></b>'; li.firstChild.textContent=x[0]; li.lastChild.textContent=sgn(v); ul.appendChild(li); } });
  var total=(T.direct+dLab+dOth)*(1+c) + T.mgmt + 0.10*dLab, contChange=T.direct*(c-0.15);
  if(Math.abs(contChange)>=1){ var li=document.createElement('li'); li.innerHTML='<span>Contingency '+st8.cont+'%%</span><b></b>'; li.lastChild.textContent=sgn(contChange); ul.appendChild(li); }
  document.getElementById('d-office').textContent=fmt(CALC.office*CALC.months*(1+c));
  document.getElementById('c-total').textContent=fmt(total);
  var nm=st8.tier==='0' ? 'the core build' : 'the standard Tier '+st8.tier;
  document.getElementById('c-vs').textContent=Math.abs(total-T.grand)<1 ? 'Same as '+nm : sgn(total-T.grand)+' on '+nm+' ('+fmt(T.grand)+')';
  var n=st8.stu, month=r.host+r.lic+r.support*Math.ceil(n/300)+r.ai_stu*n+voice(r,n);
  document.getElementById('v-stu').value=n;
  document.getElementById('r-month').textContent=fmt(month);
  document.getElementById('r-per').textContent='$'+(month/n).toFixed(2);
  document.getElementById('r-year').textContent=fmt(month*12);
}
document.querySelectorAll('.calc .step button').forEach(function(b){ b.addEventListener('click', function(){
  var k=b.getAttribute('data-k'), d=+b.getAttribute('data-d'); st8[k]=Math.min(LIM[k][1], Math.max(LIM[k][0], st8[k]+d)); calc(); }); });
document.getElementById('v-stu').addEventListener('change', function(e){ var v=Math.round(+e.target.value/25)*25; st8.stu=Math.min(5000, Math.max(25, v||100)); calc(); });
document.getElementById('v-office').addEventListener('change', function(e){ st8.office=e.target.checked; calc(); });
document.querySelectorAll('.calc [data-addon]').forEach(function(x){ x.addEventListener('change', function(){ st8.add[x.getAttribute('data-addon')]=x.checked; calc(); }); });
document.querySelectorAll('#v-cont button').forEach(function(b){ b.addEventListener('click', function(){
  st8.cont=+b.getAttribute('data-c'); document.querySelectorAll('#v-cont button').forEach(function(x){ x.classList.toggle('on', x===b); }); calc(); }); });
function setTier(t){
  st8.tier=t; st8.subj=CALC.tiers[t].subjects; st8.less=CALC.tiers[t].lessons; calc();
  document.querySelectorAll('.tierdoc').forEach(function(d){ d.hidden = d.getAttribute('data-tier')!==t; });
  document.querySelectorAll('.tierbox[data-tier]').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-tier')===t); });
  root.setAttribute('data-tier', t);
  var s=document.getElementById('pagehead'); if(s) s.textContent='@page{@top-left{content:"'+RUN+' · '+(t==='0'?'Core build':'Tier '+t)+'"}}';
  try{localStorage.setItem(KEY,t)}catch(e){}
}
var q=(location.search.match(/tier=([0123])/)||[])[1], st=null; try{st=localStorage.getItem(KEY)}catch(e){}
setTier(q||st||'3');
document.querySelectorAll('.tierbox[data-tier] .pick').forEach(function(b){ b.addEventListener('click', function(){ setTier(b.parentNode.getAttribute('data-tier')); }); });
var cb=document.getElementById('showhl');
try{ if(localStorage.getItem('kumiHl')==='0') cb.checked=false }catch(e){}
function hl(){ root.classList.toggle('nohl', !cb.checked); try{localStorage.setItem('kumiHl', cb.checked?'1':'0')}catch(e){} }
cb.addEventListener('change', hl); hl();
if(window.matchMedia && matchMedia('(max-width:600px)').matches){ var cbx=document.getElementById('calcbox'); if(cbx) cbx.open=false; }
})();</script>""" % (json.dumps(RUNNING), json.dumps(CALC))

head = HEAD.replace('</head>', '<meta name="robots" content="noindex, nofollow">\n<style id="pagehead"></style>\n</head>', 1)
head = head.replace('<body>\n<div class="wrap">', '<body>\n' + ''.join(rail) + '\n<div class="wrap">', 1)
assert '<aside class="rail">' in head
body = ''.join(f'<div class="tierdoc" data-tier="{t}">{parts[t]}</div>\n' for t in (0, 1, 2, 3))
widget = open(os.path.join(HERE, 'cmt_widget.html'), encoding='utf8').read()
INTERNAL = re.compile(r'<script>\(function\(\)\{function f\(\)\{document\.documentElement\.classList\.toggle\("show-internal".*?</script><section class="internal-only sheet" id="team-rates-\d">.*?</section>', re.S)
page = head + body + '</div>' + JS + widget + '</body></html>'
for OUT in OUTS:
    os.makedirs(os.path.dirname(os.path.abspath(OUT)), exist_ok=True)
    hosted = OUT.endswith('kumi-pilot-budget.html')   # the public copy never carries the internal team rates
    out = INTERNAL.sub('', page) if hosted else page
    if hosted: assert 'team-rates' not in out and 'DFAT MRP / day' not in out
    open(OUT, 'w', encoding='utf8').write(out)
print(json.dumps({t: dict(grand=totals[t]['grand'], lines=list(zip([x[0] for x in RAIL[t]], COSTS[t]))) for t in totals}, ensure_ascii=False, indent=1))
