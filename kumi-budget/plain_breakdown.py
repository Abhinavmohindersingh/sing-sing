"""Kumi quote builder (platform-only view).
The page starts at $0 with every line struck through. Ticking a step in the left rail adds its cost and
un-strikes its lines in the breakdown; the build total and the monthly operating cost update as you go.
Full scope comes from the Tier 3 run of gen_v2.py, with on-ground pilot work cut (always struck: "Not in our scope").
Run: python3 plain_breakdown.py   ->  kumi-cost-breakdown-full.html (local file, not published)"""
import contextlib, html, io, json, math, os, re, runpy, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'kumi-cost-breakdown-full.html')
CUT_CODES = ['1.6', 'H1', 'H2', 'H3', 'H4', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8']
os.environ.update(PLATFORM='1',   # platform-only wording; project management 3 weeks, no school coordination
                  KEYWORDS='1',   # B10: keyword listening, for one-way speech
                  OWNAI='1',      # D5: our own AI model on the school computer
                  CUT=','.join(CUT_CODES + ['headsets', 'transport', 'allowance', 'criminal', 'travel', 'pilot_run', 'bridge']))

# Hardware for our own AI model: one GPU server per school, on the lab network. Provisional: confirm with a live quote.
PC_BUY = 3000    # A$ each: desktop with a 16 GB graphics card (RTX 4060 Ti 16 GB class; the card alone is about A$730–2,250 in Australia, Oct 2026), plus a network switch
PC_LEASE = 110   # A$ a month each, 36-month lease: estimate (buy price over 36 months, plus finance and support)
OWN_GPU = 100*5  # 100 GPU-hours at ~A$5/hour: several tuning runs, evaluation on the validation and test sets, and 4-bit compression (same rate as the speech training)
TRAIN_BUY = 7500  # A$: workstation with an RTX 5090 32 GB to train our own model in-house instead of renting (provisional)
RETRAIN_GPU = 30*5   # 30 GPU-hours at ~A$5/hour to retrain on pilot data
RETRAIN_LABEL = round(10000*(3000*2 + 300*10)/1e6*0.5*1.55)   # 10,000 pilot records labelled by Claude Sonnet 5.5 in batches
OWN_DATA = round(30000*((4000*2 + 1500*10) + (3000*2 + 300*10))/1e6*0.5*1.55)   # 30,000 examples written, then each checked, by Claude Sonnet 5.5 in batches (half price) ≈ US$480 at A$1.55
SRC_PC = [("RTX 4060 Ti 16 GB prices in Australia (GPUPrix)", "https://gpuprix.com/de/australia/gpus/geforce-rtx-4060-ti-16gb"),
          ("RTX 4060 Ti cards and builds (PLE Computers)", "https://ple.com.au/RTX40Series/RTX4060Ti"),
          ("HP Australia business leasing terms", "https://www.hp.com/au-en/shop/hp-business-leasing"),
]

# ---- 1. the full-scope breakdown (HTML) and its numbers, from the same generator run ----
part = os.path.join(HERE, 'part_plain.html')
subprocess.run([sys.executable, 'gen_v2.py'], cwd=HERE, check=True, capture_output=True,
               env={**os.environ, 'TIER': '3', 'PART': '1', 'OUT': part})
s = open(part, encoding='utf8').read(); os.remove(part)
sys.path.insert(0, HERE)
os.environ.update(TIER='3', PART='1', OUT=os.devnull)
with contextlib.redirect_stdout(io.StringIO()):
    g = runpy.run_path(os.path.join(HERE, 'gen_v2.py'), run_name='gen')
W, RATE, DFAT, FX = g['W'], g['RATE'], g['DFAT'], g['FX']
NAME = {r: v[0].replace('Pijin', 'Tok Pisin') for r, v in DFAT.items()}

# ---- 2. what each step buys. Conditions are named; the page works them out from the ticks (see preds() in the script) ----
# A task's allocation can grow by tier; each step of growth belongs to the feature that needs it.
COND = {
 '1.1': 'found', '1.2': 'found', '1.3': 'found', '1.4': {0: 'desktop', 2: 'twoway'}, '1.5': 'found',
 'A1': {0: 'desktop', 1: 'cur'}, 'A2': 'login', 'A3': 'SPLIT', 'A4': 'online', 'A5': 'online', 'A6': 'online', 'A7': 'desktop',
 'B1': 'twoway', 'B2': {0: 'lessons', 3: 'tprec'}, 'B3': {2: 'ownspeech', 3: 'tprec'}, 'B4': 'tprec', 'B5': 'tprec',
 'B6': {2: 'ownspeech', 3: 'tprec'}, 'B7': 'speechrun', 'B8': 'twoway', 'B9': {2: 'speechrun', 3: 'tprec'}, 'B10': 'mode',
 'C1': 'PER', 'C2': ('PER', 'content_own'), 'C3': 'PER', 'C5': 'lessons', 'C6': ('PER', 'content_own'),
 'D1': 'claude', 'D2': 'cur', 'D3': 'cur', 'D4': 'review', 'D5': 'ownai', 'D6': 'retrain',
 'E1': 'teacher', 'E2': 'tests',
 'G1': {0: 'found', 2: 'twoway'}, 'G2': {0: 'found', 2: 'twoway'}, 'G3': {0: 'found', 2: 'twoway'}, 'G4': {0: 'found', 2: 'twoway'},
 'G5': 'found', 'G6': 'cur', 'G7': 'expert', 'G8': 'found', 'G9': 'found', 'P1': 'found'}
COND = {k: v for k, v in COND.items() if any(w[1] == k for w in W)}   # C4 is folded into C1 in the platform view
ROLE_COND = {('B9', 'PL'): 'ownspeech'}   # listening tests of Kumi's Tok Pisin voice: only with our own speech model
TASKS = {}
for ph, code, t0, task, alloc in W:
    if code in CUT_CODES: continue
    spec = COND[code]; parts = []; order = []
    if spec == 'PER' or (isinstance(spec, tuple) and spec[0] == 'PER'):   # weeks per lesson, from the budget's own 20- and 30-lesson allocations (they scale exactly)
        pc_ = 'lessons' if spec == 'PER' else spec[1]
        a20, a30 = dict(alloc[0]), dict(alloc[3])
        for r in a20:
            per = a20[r]/20; fixed = abs(a30[r] - a20[r]) < 1e-9
            assert fixed or abs(a30[r] - per*30) < 1e-9, (code, r)
            parts.append(dict(c=pc_, r=r, w=a20[r], cost=a20[r]*5*RATE[r]) if fixed else dict(c=pc_, r=r, per=per, w=a20[r], cost=a20[r]*5*RATE[r]))
            order.append(r)
        TASKS[code] = dict(parts=parts, order=order); continue
    if code == 'A3':   # SE 3 weeks: local database (offline) + sync engine (both); online-only adds a simple live capture instead
        assert alloc == [("SE", 3.0)], alloc
        TASKS[code] = dict(order=['SE'], parts=[dict(c=c, r='SE', w=w, cost=w*5*RATE['SE']) for c, w in (('offline', 1.5), ('both_net', 1.5), ('online_only', 0.5))])
        continue
    if isinstance(alloc, list):
        assert isinstance(spec, str), code
        steps = [(spec, alloc)]
    else:
        assert isinstance(spec, dict) and sorted(spec) == sorted(alloc), code
        steps = [(spec[k], alloc[k]) for k in sorted(alloc)]
    prev = {}
    for c, al in steps:
        cur = dict(al)
        for r in list(cur) + [r for r in prev if r not in cur]:
            if r not in order: order.append(r)
            d = cur.get(r, 0) - prev.get(r, 0)
            if d: parts.append(dict(c=ROLE_COND.get((code, r), c), r=r, w=d, cost=d*5*RATE[r]))
        prev = cur
    TASKS[code] = dict(parts=parts, order=order)
assert set(TASKS) == set(COND), set(TASKS) ^ set(COND)

TP_COND = [("code-signing", "found"), ("ElevenLabs", None), ("voice actor", "ownspeech"), ("Tok Pisin speakers", "tprec"),
           ("recording kit", "ownspeech"), ("Claude API", "cur"), ("Cloud hosting during build", "found"), ("laptop", "found"),
           ("Criminal record", "found"), ("IARPA", "tprec"), ("speech recognition training", "tprec"), ("Kumi’s voice training", "ownspeech")]
TPS = []   # purchase rows: id, parts [{c, amt}] ('amt' may be the string 'pcbuy': GPU servers × buy price)
for item, amt, basis, src, t in g['TP_IN']:
    key, c = next((k, c) for k, c in TP_COND if k.lower() in item.lower())
    if key == "ElevenLabs":   # Pro plan for English narration; the Scale plan when Kumi's own voice is also cloned in English
        parts = [dict(c='eleven_mode', amt=99*FX), dict(c='eleven_own', amt=(330-99)*FX)]
    else:
        parts = [dict(c=c, amt=amt)]
    TPS.append(dict(id=f"tp{len(TPS)}", key=key, item=item, parts=parts))
OWN_TP = [dict(id='tpgpu', item='GPU rental to tune our own AI model: about 100 GPU-hours', basis='~A$5/hr: H100 on-demand. Several tuning runs, evaluation and compression', parts=[dict(c='trrent', amt=OWN_GPU)]),
          dict(id='tptrbuy', item='Training workstation, bought: RTX 5090 32 GB, to tune our own AI model in-house', basis=f'Provisional, about A${TRAIN_BUY:,}. Kept after the build for retraining', parts=[dict(c='trbuy', amt=TRAIN_BUY)]),
          dict(id='tprtgpu', item='GPU rental to retrain on pilot data: about 30 GPU-hours', basis='~A$5/hr: H100 on-demand', parts=[dict(c='retrain_rent', amt=RETRAIN_GPU)]),
          dict(id='tprtlab', item='Labelling about 10,000 pilot records with Claude', basis='Claude Sonnet 5.5 in batches', parts=[dict(c='retrain', amt=RETRAIN_LABEL)]),
          dict(id='tpdata', item='Training data for our own AI model: about 30,000 example lessons-and-help conversations written and checked with Claude', basis='Claude Sonnet 5.5 in batches, about 260M tokens', parts=[dict(c='ownai', amt=OWN_DATA)]),
          dict(id='tppc', item='GPU server to run our own AI model, bought: one per school, on the lab network', basis='', parts=[dict(c='buy', amt='pcbuy')])]

# check: with everything on, the parts add back up to the generator's own totals
ALL = dict(found=1, desktop=1, online=1, offline=1, login=1, teacher=1, lessons=1, content_own=1, tests=1, claude=1, ownai=0,
           hwbuy=0, hwlease=0, trrent=0, trbuy=0, oneway=0, twoway=1, eleven=1, ownspeech=1, review=1, expert=1, retrain=0)
def preds(S):
    p = {k: bool(v) for k, v in S.items()}
    p.update(both_net=p['online'] and p['offline'], online_only=p['online'] and not p['offline'], cur=p['claude'] or p['ownai'], mode=p['oneway'] or p['twoway'], tprec=p['ownspeech'] and p['twoway'],
             speechrun=p['twoway'] or p['ownspeech'], eleven_mode=p['eleven'] and (p['oneway'] or p['twoway']),
             eleven_own=p['eleven'] and p['ownspeech'], buy=p['ownai'] and p['hwbuy'], lease=p['ownai'] and p['hwlease'], retrain_rent=p['retrain'] and p['trrent'])
    return p
def pcost(pt, nl): return pt['per']*nl*5*RATE[pt['r']] if 'per' in pt else pt['cost']
def build_total(S, pcs=1, nl=20):
    p = preds(S)
    lab = sum(pcost(pt, nl) for t in TASKS.values() for pt in t['parts'] if p[pt['c']])
    tp = sum((pcs*PC_BUY if pt['amt'] == 'pcbuy' else pt['amt']) for r in TPS + OWN_TP for pt in r['parts'] if p[pt['c']])
    direct = lab + tp
    return direct + 0.10*lab + 0.15*direct
full = {k: 1 for k in ALL}; full.update(oneway=0)
assert abs(sum(pcost(pt, 30) for t in TASKS.values() for pt in t['parts'] if preds(full)[pt['c']]) - g['lab_total']) < 0.01   # the full scope has 30 lessons
assert abs(sum(pt['amt'] for r in TPS for pt in r['parts'] if preds(full)[pt['c']]) - g['tp_total']) < 0.01
OLD_CORE = dict(ALL, twoway=0, oneway=1, ownspeech=0, review=0, expert=0)
def gen_total(t):   # the generator's own total for a tier (without our own AI model, which is not in the tiers)
    env = {**os.environ, 'TIER': str(t), 'PART': '1', 'OUT': os.devnull}; env.pop('OWNAI', None)
    return json.loads(subprocess.run([sys.executable, 'gen_v2.py'], cwd=HERE, env=env, capture_output=True, text=True, check=True).stdout)['grand_exact']
assert abs(build_total(OLD_CORE) - gen_total(1)) < 0.5, (build_total(OLD_CORE), gen_total(1))   # the agreed Core = Tier 1 (one-way, Claude, ElevenLabs)
assert abs(build_total(ALL, nl=30) - gen_total(3)) < 0.5, (build_total(ALL, nl=30), gen_total(3))   # everything, 30 lessons = Tier 3

# ---- 2b. release testing is priced with each feature ----
# The project foundation is planning only (setup, requirements, architecture, safeguarding, project management).
# Release testing is a share of each ticked feature's build work, set so the agreed Core still matches Tier 1.
# Lesson hours do not drive it: the designer's hourly work needs little extra testing.
POOL = ['G1', 'G2', 'G3', 'G4', 'G5', 'G8', 'G9']
FLOOR_SHARE = 0      # nothing to test until a feature is ticked
POOL_CORE = sum(pt['cost'] for c in POOL for pt in TASKS[c]['parts'] if pt['c'] == 'found')
for c in POOL:   # their two-way steps are replaced by the share below
    TASKS[c]['parts'] = [dict(pt, s=1) for pt in TASKS[c]['parts'] if pt['c'] == 'found']
def feat(S, nl):   # feature labour: everything but the foundation itself and the per-hour lesson work
    p = preds(S)
    return sum(pcost(pt, nl) for t in TASKS.values() for pt in t['parts'] if p[pt['c']] and pt['c'] != 'found' and 'per' not in pt)
FEAT_CORE = feat(OLD_CORE, 20)
K = (1 - FLOOR_SHARE)*POOL_CORE/FEAT_CORE   # about 28% of each feature's build work
def factor(S, nl): return FLOOR_SHARE + K*feat(S, nl)/POOL_CORE
def pcost(pt, nl, fa=1): return (pt['per']*nl*5*RATE[pt['r']] if 'per' in pt else pt['cost'])*(fa if pt.get('s') else 1)
def build_total(S, pcs=1, nl=20):
    p = preds(S); fa = factor(S, nl)
    lab = sum(pcost(pt, nl, fa) for t in TASKS.values() for pt in t['parts'] if p[pt['c']])
    tp = sum((pcs*PC_BUY if pt['amt'] == 'pcbuy' else pt['amt']) for r in TPS + OWN_TP for pt in r['parts'] if p[pt['c']])
    direct = lab + tp
    return direct + 0.10*lab + 0.15*direct
assert abs(build_total(OLD_CORE) - gen_total(1)) < 0.5, (build_total(OLD_CORE), gen_total(1))   # Core still = Tier 1

# ---- 3. the breakdown body: keep the cost tables, tag rows for the script ----
def drop_div(h, opener):
    """Remove every balanced <div ...> block that starts with `opener`."""
    while (i := h.find(opener)) >= 0:
        depth, j = 0, i
        for m in re.finditer(r'<div\b|</div>', h[i:]):
            depth += 1 if m.group(0) != '</div>' else -1
            if depth == 0: j = i + m.end(); break
        h = h[:i] + h[j:]
    return h
keep = []
for sh in s.split('<section class="sheet">')[1:]:
    sh = sh.split('</section>')[0]
    if 'internal-flag' in sh: continue
    if re.search(r'<h2>(Project team|Work breakdown|Licences|Travel to)', sh) or '<div class="ph">' in sh:
        keep.append(sh)
body = '\n'.join(keep)
body = re.sub(r'<div class="runhead">.*?</div>', '', body, flags=re.S)
body = drop_div(body, "<div class='outputs'>"); body = drop_div(body, "<div class='note pre'>")
body = re.sub(r"<span class='chip c\d'>T\d</span>", '', body)
body = re.sub(r"<span class='h\d'>(.*?)</span>", r'\1', body, flags=re.S)
BULLET_COND = {('A1', 2): 'twoway', ('C2', 1): 'cur', ('C1', 2): 'ownspeech', ('G3', 1): 'cur'}   # bullets whose tier is not a step in COND
def tag_bullets(m):
    code, spec = m.group(2), COND.get(m.group(2))
    def one(b):
        t = int(b.group(1))
        c = BULLET_COND.get((code, t)) or (spec.get(t) if isinstance(spec, dict) else None)
        return f"<li data-c='{c}'>" if c else b.group(0)
    return re.sub(r"<li class='h(\d)'>", one, m.group(0))
body = re.sub(r"<tr( class='[^']*')?><td class='code'>([^<]+)(?:<br>)?</td>.*?</tr>", tag_bullets, body, flags=re.S)
body = re.sub(r"<li class='h\d'>", '<li>', body)
body = re.sub(r"<tr class='(?:r\d|x)'>", '<tr>', body)
body = re.sub(r"<tr class='r\d cut'>", "<tr class='cut'>", body)
body = re.sub(r"(class='n(?: wk| co)?) h\d'", r"\1'", body)
body = re.sub(r"<br></td>", '</td>', body)
body = body.replace('<table class="tasks">', '<table>')
bad = re.findall(r"class=['\"][^'\"]*\bh[123]\b|chip|Tier|\bT[123]\b", body)
assert not bad, bad[:5]
OOS = '<span class="oos">Not in our scope</span>'
# task rows
body, n = re.subn(r"<tr( class='cut')?><td class='code'>([^<]+)</td><td><b>(.*?)</b>",
                  lambda m: f"<tr data-code='{m.group(2)}'{m.group(1) or ''}><td class='code'>{m.group(2)}</td><td><b>{m.group(3)}</b>{' ' + OOS if m.group(1) else ''}", body)
assert n == len(TASKS) + len(CUT_CODES), n
# team table
for r, name in NAME.items():
    body = body.replace(f"<tr><td><b>{html.escape(name)}</b></td>", f"<tr data-role='{r}'><td><b>{html.escape(name)}</b></td>", 1)
body = body.replace('<td colspan="2">Total team effort</td><td class="n">', '<td colspan="2">Total team effort</td><td class="n" id="team-tot">', 1)
# wording that follows the ticks: every task, role and stage text as the budget writes it for tiers 0–3
def unwrap(h): return re.sub(r"<span class='h\d'>(.*?)</span>", r'\1', re.sub(r"<span class='chip c\d'>T\d</span>", '', h), flags=re.S)
def bullets(code, h):
    spec = COND.get(code)
    def one(b):
        t = int(b.group(1)); c = BULLET_COND.get((code, t)) or (spec.get(t) if isinstance(spec, dict) else None)
        return f"<li data-c='{c}'>" if c else '<li>'
    return re.sub(r"<li class='h(\d)'>", one, h)
LABELS, RESPS, TITLES, TEAMP = {}, {}, {}, {}
for t in (0, 1, 2, 3):
    if t == 3: raw = s
    else:
        pt = os.path.join(HERE, f'part_t{t}.html')
        subprocess.run([sys.executable, 'gen_v2.py'], cwd=HERE, check=True, capture_output=True, env={**os.environ, 'TIER': str(t), 'PART': '1', 'OUT': pt})
        raw = open(pt, encoding='utf8').read(); os.remove(pt)
    for m in re.finditer(r"<tr class='r\d( cut)?'><td class='code'>([^<]+)(?:<br>.*?)?</td><td>(.*?)</td><td class='role'>", raw, re.S):
        code, lab = m.group(2), m.group(3)
        if code in TASKS and 'Tier' not in unwrap(lab): LABELS.setdefault(code, {})[t] = bullets(code, unwrap(lab))
    for r, name in NAME.items():
        mm = re.search(r"<tr><td><b>" + re.escape(html.escape(name)) + r"</b></td><td>(.*?)</td>", raw, re.S)
        if mm: RESPS.setdefault(r, {})[t] = unwrap(mm.group(1))
    for mm in re.finditer(r'<div class="t[^"]*">(.*?)</div></div><div class="r">', raw):
        code = re.search(r"<td class='code'>([^<]+)", raw[mm.end():]).group(1)
        if code in TASKS and 'Tier' not in mm.group(1): TITLES.setdefault(code, {})[t] = unwrap(mm.group(1))
    mm = re.search(r'<h2>Project team</h2>\n<p class="h2sub">(.*?)</p>', raw, re.S)
    TEAMP[t] = mm.group(1)
assert set(LABELS) == set(TASKS), set(TASKS) - set(LABELS)
A3_BULLETS = [('Offline-first local database', 'offline'), ('Every interaction saved as a record', 'both_net'), ('Several students sharing one computer', 'offline'),
              ('Sync queue', 'both_net'), ('The server rebuilds', 'both_net'), ('Connectivity detection', 'both_net'), ('Built and tested against simulated outages', 'offline')]
def tag_a3(h):
    for start, c in A3_BULLETS:
        h, n = re.subn(r"<li>(?=" + re.escape(start) + ")", f"<li data-c='{c}'>", h)
        assert n == 1, start
    return h.replace('</ul>', "<li data-c='online_only'>Online only: every answer is sent straight to the cloud as it happens</li></ul>", 1)
LABELS['A3'] = {t: tag_a3(v) for t, v in LABELS['A3'].items()}
PART_LABEL = {'A3|offline': 'Offline mode: a local database on each computer', 'A3|both_net': 'Sync between online and offline',
              'A3|online_only': 'Online mode: answers sent straight to the cloud'}
body = body.replace('<h2>Project team</h2>\n<p class="h2sub">', '<h2>Project team</h2>\n<p class="h2sub" id="team-p">', 1)
TEST_NOTE = (f"<p class='h2sub'>Release testing (G1–G5, G8, G9) is priced with each feature: about {K:.0%} of its build work, "
             "so these lines grow and shrink with the ticks. G6 AI safety testing comes with the AI.</p>")
body, n = re.subn(r'(<div class="t">Testing &amp; release readiness</div>.*?</div></div></div>)', lambda m: m.group(1) + TEST_NOTE, body, count=1, flags=re.S)
assert n == 1
assert 'id="team-p"' in body
body = re.sub(r'(<div class="t[^"]*">.*?</div></div><div class="r">)', lambda m: m.group(1), body)
# licences: tag rows, add the own-AI rows, id the total
a = body.index('<h2>Licences'); b = body.index('</table>', a)
lic = body[a:b]
def tag_tp(m):
    cls, cell = m.group(1) or '', m.group(2)
    if cls: return f"<tr class='cut'><td>{cell} {OOS}"
    rid = next(r['id'] for r in TPS if html.unescape(re.sub('<[^>]+>', '', cell)).strip() == r['item'])
    return f"<tr data-tp='{rid}'><td>{cell}"
lic = re.sub(r"<tr( class='cut')?><td>(.*?)(?=</td>)", tag_tp, lic)
own_rows = ''.join(f"<tr data-tp='{r['id']}'><td>{r['item']}</td><td>{r['basis'] or ''}" +
                   ("<span id='pc-basis'></span> [<a href='" + SRC_PC[0][1] + "'>source</a>]" if r['id'] == 'tppc' else '') +
                   f"</td><td class='n'></td></tr>" for r in OWN_TP)
lic = re.sub(r"(<tr class='tot'><td colspan='2'>Licences, services and equipment total</td><td class='n')>", own_rows + r"\1 id='tp-tot'>", lic)
assert "id='tp-tot'" in lic and lic.count('data-tp=') == len(TPS) + len(OWN_TP)
body = body[:a] + lic + body[b:]
# travel: on-ground, not ours
body = body.replace('<h2 class="cut">Travel to Port Moresby</h2>', f'<h2 class="cut">Travel to Port Moresby</h2>{OOS}', 1)
# cost summary: rebuilt as a live table
a = body.index('<div class="total-box">'); b = body.index('</table></div>', a) + len('</table></div>')
WHY_M = 'Professional indemnity and liability insurance, accounting, administration and company overhead.'
WHY_C = 'Covers tasks that run long, rework and exchange-rate movement. Drawn only with written approval; unused contingency is not billed.'
def money(x): return '$' + f'{x:,.0f}'
body = body[:a] + f'''<div class="total-box"><table>
<tr><td>Project team — <span id="cs-wk"></span> person-weeks</td><td class="n" id="cs-lab"></td></tr>
<tr><td>Licences, services and equipment</td><td class="n" id="cs-tp"></td></tr>
<tr class="cut"><td>Travel to Port Moresby {OOS}</td><td class="n">{money(g['travel_shown'])}</td></tr>
<tr class="cut"><td>Running costs during the pilot {OOS}</td><td class="n">{money(g['pilot_shown'])}</td></tr>
<tr class="cut"><td>Kumi kept running for 3 months after the pilot {OOS}</td><td class="n">{money(g['bridge_shown'])}</td></tr>
<tr><td>Management fee — 10% of labour<span class="why">{WHY_M}</span></td><td class="n" id="cs-mg"></td></tr>
<tr><td>Contingency — 15% of direct costs<span class="why">{WHY_C}</span></td><td class="n" id="cs-ct"></td></tr>
<tr class="g"><td>Total build cost, excluding GST</td><td class="n" id="cs-tot"></td></tr></table></div>''' + body[b:]

# ---- 4. "How Kumi works" (top of the page) and the operating cost table (end) ----
def L(w): return f'<span class="lang{" tp" if w.startswith("Tok") else ""}">{w}</span>'
ON, OFF = '<span class="mode on">Online</span>', '<span class="mode off">Works offline</span>'
HOW = f'''<h2>How Kumi works</h2><ol class="how">
<li><b>Desktop application.</b> Runs on the Windows computers the school already has. Installs from a USB stick and updates itself when online.</li>
<li><b>Online and offline support.</b> Pick one or both:
<span class="sub"><b>Online</b> {ON} Works while the school has internet. Every answer goes straight to the cloud, lessons load from the cloud, and the teacher screen and live AI help work.</span>
<span class="sub"><b>Offline</b> {OFF} Works with no internet. Lessons, questions and student login run on the computer, Kumi still talks from saved lines, and everything is saved on the computer first, so a power cut loses nothing. Offline only (without Online) needs our own AI model and our own speech model, because Claude and ElevenLabs need the internet; they are ticked for you and stay ticked.</span>
<span class="sub"><b>Both</b> Works either way. Saved work is sent by itself when the internet is back, with nothing lost and nothing doubled. Kumi switches between live and saved help by itself.</span></li>
<li><b>Individual student login and profiles.</b> Every student has their own profile and signs in with a picture and a PIN. Their progress is kept in their profile, and one student cannot open another student’s work.</li>
<li><b>Lessons.</b> <span class="nl">20</span> one-hour lessons with pictures, animations and practice questions, in English and Tok Pisin. Pick the subjects (numeracy, literacy, personal development) and set the hours for each in the left panel; the cost follows the hours. If the content is provided to us, our designer turns it into animated lessons. If we have to prepare the content ourselves, that is a separate tick with its own cost.</li>
<li><b>AI content curation.</b> Every child gets the same lessons, but Kumi watches every answer and chooses what comes next. <i>Mary gets three answers wrong, so she gets easier questions and a hint. Dura answers fast, so he gets harder ones.</i> Two ways to run it (pick one):
<span class="sub"><b>Way 1: Claude AI</b> {ON} Best quality answers, processed in Australia. Needs the internet, so it needs the Online option; offline, Kumi uses its saved help. Monthly usage cost.</span>
<span class="sub"><b>Way 2: our own AI model</b> {OFF} Runs on one GPU server in the school lab, which the computers reach over the lab network, so the school’s computers stay as they are. No usage cost. Simpler answers than Claude. If the server is down, Kumi uses its saved help.</span></li>
<li><b>AI speech.</b> <span class="sub"><b>One-way</b> Kumi talks to the child. The child taps Kumi, or says a keyword like “help” (halivim), “again” (gen) or “next” (nekis), and Kumi explains the step out loud. The child answers by tapping.</span>
<span class="sub"><b>Two-way</b> A real conversation, like talking to a teacher: the child speaks any question about the lesson and Kumi answers out loud.</span>
<span class="sub"><b>Way 1: ElevenLabs</b> {L("English")} A natural English voice from a cloud service, so it needs the Online option. Monthly plan.</span>
<span class="sub"><b>Way 2: our own speech models</b> {L("Tok Pisin")} {OFF} No major provider supports Tok Pisin speech, so we build Kumi’s own Tok Pisin voice and a model that understands children speaking Tok Pisin. No per-minute cost.</span></li>
<li><b>Teacher screen.</b> See how the whole class is doing and which students need help.</li></ol>'''
OPS = [  # id, name, how it is worked out (filled in by the script where it depends on the fields), condition
 ('host', 'Cloud hosting', 'App server, database, storage and backups, AWS Sydney', 'found'),
 ('lic', 'Code-signing certificate', 'A$341 a year, spread over 12 months', 'found'),
 ('claude', 'Claude AI usage', '', 'claude'),
 ('eleven', 'ElevenLabs voice', '', 'eleven_mode'),
 ('ownai', 'Our own AI model', 'Runs on the school’s GPU server: no usage cost', 'ownai'),
 ('lease', 'Leased GPU server', '', 'lease'),
 ('ownspeech', 'Our own speech models', 'Run on the school computers: no per-minute cost', 'ownspeech'),
 ('support', 'Support and maintenance', '', 'found')]
OPS_HTML = ('<h2>Operating cost per month</h2><p class="h2sub">What it costs to keep Kumi running once it is built. Change the numbers to see it move.</p>'
            '<div class="fields"><label>Students <input id="f-stu" type="number" min="1" step="10" value="100"></label>'
            '<label>Schools <input id="f-pc" type="number" min="1" step="1" value="1"></label></div>'
            '<div class="card"><table><tr><th>Per month, AUD</th><th>How it’s worked out</th><th class="n">Cost</th></tr>' +
            ''.join(f"<tr data-op='{i}'><td>{n}</td><td id='op-how-{i}'>{h}</td><td class='n' id='op-{i}'></td></tr>" for i, n, h, c in OPS) +
            '<tr class="tot"><td colspan="2">Total per month</td><td class="n" id="op-tot"></td></tr>'
            '<tr><td colspan="2">Per student, per month</td><td class="n" id="op-per"></td></tr>'
            '<tr><td colspan="2">Per year</td><td class="n" id="op-year"></td></tr></table>'
            f'<div class="note">GPU server prices are provisional: one per school, buy about A${PC_BUY:,} each, lease about A${PC_LEASE} a month each on 36 months. Sources: ' +
            '; '.join(f"<a href='{u}'>{t}</a>" for t, u in SRC_PC) + '. Get a live quote before contract.</div></div>')

# ---- 5. the rail ----
SUBJECTS = [('num', 'Numeracy', True), ('lit', 'Literacy', True), ('pd', 'Personal development', False)]   # each with its own hours of content; Core is numeracy and literacy, 10 hours each
STEPS = [  # (number, title, hint, rows); a row is (id, label, badge HTML) or ('-', sub-heading)
 ('1', 'Project foundation', 'Each feature below carries its own backend and release testing.', [('found', 'Planning & project management', '<span class="req">required</span>')]),
 ('2', 'App', '', [('desktop', 'Desktop application', ''), ('-', 'Online + offline · one or both'), ('online', 'Online', '<span class="mode on">Online</span>', 'sub'),
                      ('offline', 'Offline', '<span class="mode off">Offline</span>', 'sub'), ('login', 'Individual student login & profiles', ''), ('teacher', 'Teacher screen', '')]),
 ('3', 'Lessons', 'Tick Subjects, then the subjects and their hours. Content is provided to us unless ticked.', [('lessons', 'Subjects', ''), ('=', 'subjects'),
                           ('content_own', 'We prepare the content', '', 'sub'), ('tests', 'Benchmark tests', '')]),
 ('4', 'AI content curation', 'Pick one', [('claude', 'Claude AI', '<span class="mode on">Online</span>'), ('ownai', 'Own AI model', '<span class="mode off">Offline</span>'),
                                          ('hwbuy', 'Buy GPU server', '', 'sub'), ('hwlease', 'Lease GPU server', '', 'sub'), ('trrent', 'Rent GPU to train (cloud)', '', 'sub'), ('trbuy', 'Buy GPU to train', '', 'sub')]),
 ('5', 'AI speech', '', [('-', 'Mode · pick one'), ('oneway', 'One-way', ''), ('twoway', 'Two-way', ''),
                         ('-', 'Voice'), ('eleven', 'ElevenLabs', L('English')), ('ownspeech', 'Own speech model', L('Tok Pisin'))]),
 ('6', 'Extras', '', [('review', 'Weekly AI check', ''), ('expert', 'Expert teacher check', ''), ('retrain', 'Retrain on pilot data', '<span class="mode off">Own AI</span>')])]
REQ = {'found': [], 'desktop': [['found']], 'online': [['desktop']], 'offline': [['desktop']], 'login': [['desktop']], 'teacher': [['online']],
       'lessons': [['desktop']], 'content_own': [['lessons']], 'tests': [['desktop']], 'expert': [['lessons']],
       'claude': [['online']], 'ownai': [['desktop'], ['hwbuy', 'hwlease'], ['trrent', 'trbuy']], 'hwbuy': [['ownai']], 'hwlease': [['ownai']],
       'oneway': [['desktop'], ['eleven', 'ownspeech']], 'twoway': [['desktop'], ['eleven', 'ownspeech'], ['claude', 'ownai']],
       'eleven': [['oneway', 'twoway']], 'ownspeech': [['oneway', 'twoway']], 'review': [['claude', 'ownai']], 'trrent': [['ownai']], 'trbuy': [['ownai']], 'retrain': [['ownai']]}
LOCK = {'claude': {}, 'teacher': {}, 'eleven': {}}   # need the internet, so locked until Online is ticked
GROUP = {'claude': 'cur', 'ownai': 'cur', 'hwbuy': 'hw', 'hwlease': 'hw', 'trrent': 'tr', 'trbuy': 'tr', 'oneway': 'mode', 'twoway': 'mode'}
assert set(REQ) == set(ALL)
def rail_html():
    out = ['<button class="reopen" id="reopen" type="button" title="Show the build panel">▶ <span id="tabtotal"></span></button>',
           '<aside class="rail"><div class="grip" id="grip" title="Drag to resize"></div><div class="scroll">',
           '<div class="head"><h3>Build the quote</h3><button class="rbtn" id="collapse" type="button" title="Hide this panel">◀ Hide</button></div>']
    for num, title, hint, rows in STEPS:
        out.append(f'<details class="step" open><summary><span class="num">{num}</span>{title}<span class="done" id="done-{num}"></span></summary>')
        if hint: out.append(f'<div class="hint">{hint}</div>')
        for row in rows:
            if row[0] == '-': out.append(f'<div class="subh">{row[1]}</div>'); continue
            if row[0] == '=':   # one hours field for every subject, shown once a subject is ticked
                out.append('<div class="subjs" id="hrs-row">' + ''.join(
                    f'<div class="opt sub subj" id="subj-{k}"><label class="nm"><input type="checkbox" data-subj="{k}"{" checked" if on else ""}><span>{nm}</span></label>'
                    f'<input class="hrs" data-hrs="{k}" type="number" min="1" max="200" step="1" value="10" aria-label="Hours of {nm.lower()}"><span class="hu">h</span>'
                    f'<span class="pc" id="pc-s-{k}"></span></div>' for k, nm, on in SUBJECTS) +
                    '<div class="hu htot" id="h-tot"></div></div>'); continue
            rid, label, badge = row[:3]; kind = row[3] if len(row) > 3 else ''
            out.append(f'<div class="opt{" sub" if kind == "sub" else ""}" id="row-{rid}"><label class="nm"><input type="checkbox" data-id="{rid}"><span>{label} {badge}</span></label>'
                       f'<span class="pc" id="pc-{rid}"></span><button class="dd" type="button" data-dd="{rid}" title="Show what this costs">▾</button></div><div class="det" id="det-{rid}" hidden></div>')
        out.append('</details>')
    out.append('</div><div class="total"><span>Build cost, one-off · AUD excl. GST</span><b id="total"></b>'
               '<small>Running: <b id="run-total"></b> a month · <span id="run-stu"></span> students</small></div></aside>')
    return ''.join(out)

# ---- 6. page ----
TTL = {code: g['plain'](task.split('|')[0]).replace('Pijin', 'Tok Pisin') for ph, code, t0, task, alloc in W if code in TASKS}
for r in TPS + OWN_TP: r['short'] = re.split(r' — | \(|: ', r['item'])[0]
DATA = dict(partLabel=PART_LABEL, ttl=TTL, tasks=TASKS, roles={r: dict(name=NAME[r], rate=RATE[r]) for r in RATE}, tps=TPS + OWN_TP,
            req=REQ, group=GROUP, lock=LOCK, items=list(ALL), steps={num: [r[0] for r in rows if r[0] not in '-='] for num, _, _, rows in STEPS},
            ops=[dict(id=i, c=c) for i, n, h, c in OPS], subjects=[[k, nm] for k, nm, on in SUBJECTS], scale=dict(floor=FLOOR_SHARE, k=K, pool=POOL_CORE), elevenSrc=g['SRC']['elevenlabs'][1], labels=LABELS, resps=RESPS, titles=TITLES, teamp=TEAMP, pcBuy=PC_BUY, pcLease=PC_LEASE,
            run=dict(host=150, lic=g['LIC'], aiStu=g['AI_PER']*g['SESS']*FX, sess=g['SESS'], support=g['SUPPORT'], seRate=RATE['SE'],
                     credits=5*150*g['SESS']*0.5, voice=[[500000, 99*FX, 'Pro'], [2000000, 330*FX, 'Scale'], [None, 1320*FX, 'Business']]))
JS = r"""<script>(function(){
var D=__DATA__, S={}, root=document.documentElement, body=document.body;
D.items.forEach(function(k){S[k]=false;});
function fmt(n){return '$'+Math.round(n).toLocaleString('en-AU');}
function wk(x){return String(Math.round(x*100)/100);}
function fields(){var n=Math.max(1,+document.getElementById('f-stu').value||100), pcs=Math.max(1,+document.getElementById('f-pc').value||1),subj=[],hrs=0;
 D.subjects.forEach(function(s){var h=Math.max(1,Math.round(+document.querySelector('input[data-hrs="'+s[0]+'"]').value||10));
  if(document.querySelector('input[data-subj="'+s[0]+'"]').checked){subj.push([s[0],s[1],h]);hrs+=h;}});   // hours of content = the ticked subjects' hours
 return {n:n,pcs:pcs,hrs:hrs,subj:subj};}
function hourRate(){return perHour('lessons')+(S.content_own?perHour('content_own'):0);}
function subjHtml(f){if(!S.lessons)return '';var r=hourRate();return '<div class="drow g"><span>Hourly work, by subject</span></div>'+f.subj.map(function(s){return '<div class="drow"><span>'+s[1]+' · '+s[2]+' h × '+fmt(r)+'</span><span>'+fmt(s[2]*r)+'</span></div>';}).join('')
 +'<div class="dnote">Part of the total below; the rest is set-up work that does not change with hours.</div>';}
function nlOf(S,f){return S.lessons?f.hrs:0;}   // one-hour lessons = hours of content
function nlAll(f){return f.hrs;}
function perHour(c){var v=0;for(var k in D.tasks)D.tasks[k].parts.forEach(function(pt){if(pt.c===c&&pt.per)v+=pt.per*5*D.roles[pt.r].rate*1.25;});return v;}   // cost of one more hour of content, with fee and contingency
function pw(pt,nl,fa){return (pt.per?pt.per*nl:pt.w)*(pt.s?fa:1);}function pc(pt,nl,fa){return (pt.per?pt.per*nl*5*D.roles[pt.r].rate:pt.cost)*(pt.s?fa:1);}   // per-lesson parts scale with the lessons
function feat(p,nl){var v=0;for(var c in D.tasks)D.tasks[c].parts.forEach(function(pt){if(p[pt.c]&&pt.c!=='found'&&!pt.per)v+=pc(pt,nl,1);});return v;}
function fac(p,nl){return D.scale.floor+D.scale.k*feat(p,nl)/D.scale.pool;}   // release testing: a share of the feature work
function ownLab(T,nl){var p=preds(T),o={},F=0;for(var c in D.tasks)D.tasks[c].parts.forEach(function(pt){if(p[pt.c]&&pt.c!=='found'&&!pt.per){
  var w=OWN[pt.c]?OWN[pt.c](T):pt.c,v=pc(pt,nl,1);o[w]=(o[w]||0)+v;F+=v;}});return {by:o,F:F};}   // each step's own build work, which its testing follows
function preds(S){var p={};for(var k in S)p[k]=!!S[k];p.both_net=p.online&&p.offline;p.online_only=p.online&&!p.offline;p.cur=p.claude||p.ownai;p.mode=p.oneway||p.twoway;p.tprec=p.ownspeech&&p.twoway;
 p.speechrun=p.twoway||p.ownspeech;p.eleven_mode=p.eleven&&p.mode;p.eleven_own=p.eleven&&p.ownspeech;p.buy=p.ownai&&p.hwbuy;p.lease=p.ownai&&p.hwlease;p.retrain_rent=p.retrain&&p.trrent;return p;}
var ALLON=preds((function(){var a={};D.items.forEach(function(k){a[k]=true;});return a;})());
function amt(pt,f){return pt.amt==='pcbuy'?f.pcs*D.pcBuy:pt.amt;}
function build(S,f){var p=preds(S),lab=0,wks=0,tp=0,nl=nlOf(S,f),fa=fac(p,nl);
 for(var c in D.tasks)D.tasks[c].parts.forEach(function(pt){if(p[pt.c]){lab+=pc(pt,nl,fa);wks+=pw(pt,nl,fa);}});
 D.tps.forEach(function(r){r.parts.forEach(function(pt){if(p[pt.c])tp+=amt(pt,f);});});
 var direct=lab+tp,mg=0.10*lab,ct=0.15*direct;return {lab:lab,wks:wks,tp:tp,mg:mg,ct:ct,total:direct+mg+ct};}
var OWN={both_net:function(){return 'offline';},online_only:function(){return 'online';},cur:function(S){return S.claude?'claude':'ownai';},mode:function(S){return S.twoway?'twoway':'oneway';},tprec:function(){return 'ownspeech';},
 speechrun:function(S){return S.twoway?'twoway':'ownspeech';},eleven_mode:function(){return 'eleven';},eleven_own:function(){return 'ownspeech';},
 buy:function(){return 'hwbuy';},lease:function(){return 'hwlease';},retrain_rent:function(){return 'retrain';}};
function shares(S,f){var p=preds(S),sh={},nl=nlOf(S,f),fa=fac(p,nl),L=ownLab(S,nl);function add(c,v){
  var o=OWN[c]?OWN[c](S):c;sh[o]=(sh[o]||0)+v;}
 for(var c in D.tasks)D.tasks[c].parts.forEach(function(pt){if(!p[pt.c])return;var v=pc(pt,nl,fa)*1.25;
  if(pt.s){for(var k in L.by)sh[k]=(sh[k]||0)+v*L.by[k]/L.F;}else add(pt.c,v);});   // release testing goes to the steps it tests      // labour carries the 10% fee and 15% contingency
 D.tps.forEach(function(r){r.parts.forEach(function(pt){if(p[pt.c])add(pt.c,amt(pt,f)*1.15);});});   // purchases carry the contingency
 return sh;}
function adds(id,f){var A=withTick(id),gp=D.group[id],swap=false;
 if(gp)for(var k in D.group)if(D.group[k]===gp&&S[k])swap=true;
 if(swap)return id==='hwlease'?running(A,f).lease-running(S,f).lease:build(A,f).total-build(S,f).total;   // switching: the change in the total
 var A0=Object.assign({},A);A0[id]=false;                                                                   // adding: this step's own cost
 return id==='hwlease'?running(A,f).lease-running(A0,f).lease:build(A,f).total-build(A0,f).total;}
var FD='Release testing';
var GROUPS=[['1.','Planning & design'],['A','App & backend'],['B','Speech'],['C','Lessons'],['D','AI'],['E','Dashboard & tests'],['G','Testing'],['P','Project management']];
function ttl(c){var b=document.querySelector('tr[data-code="'+c+'"] td:nth-child(2) b');return b?b.textContent:D.ttl[c];}   // the task's title as the page currently words it
function grp(c){for(var i=0;i<GROUPS.length;i++)if(c.indexOf(GROUPS[i][0])===0)return GROUPS[i][1];return 'Other';}
function delta(id,f){var A=withTick(id),gp=D.group[id],swap=false;if(gp)for(var k in D.group)if(D.group[k]===gp&&S[k])swap=true;
 var B0=swap?S:Object.assign({},A);if(!swap)B0[id]=false;var pa=preds(A),pb=preds(B0),na=nlOf(A,f),nb=nlOf(B0,f),fa=fac(pa,na),fb=fac(pb,nb),G={},order=[],tot=0;
 function add(g,label,v){if(!G[g]){G[g]={t:0,rows:[]};order.push(g);}G[g].t+=v;G[g].rows.push([label,v]);tot+=v;}
 for(var c in D.tasks)D.tasks[c].parts.forEach(function(pt){var v=(pa[pt.c]?pc(pt,na,fa):0)-(pb[pt.c]?pc(pt,nb,fb):0);
  if(Math.abs(v)>0.5)add(pt.s?FD:grp(c),c+' '+(D.partLabel[c+'|'+pt.c]||ttl(c)),v*1.25);});   // release testing is one line
 D.tps.forEach(function(r){var v=0;r.parts.forEach(function(pt){v+=(pa[pt.c]?amt(pt,f):0)-(pb[pt.c]?amt(pt,f):0);});if(Math.abs(v)>0.5)add('Licences & equipment',r.short,v*1.15);});
 order=order.filter(function(g){return g!==FD;}).concat(G[FD]?[FD]:[]);   // release testing comes last
 return {G:G,order:order,tot:tot};}
function detail(id,f){var h=detail0(id,f);return id==='lessons'?subjHtml(f)+h:h;}
function detail0(id,f){if(!S[id]&&id!=='hwlease'){var X=delta(id,f);if(!X.order.length)return '<div class="dnote">No cost of its own</div>';
  function m(v){return (v<0?'−':'')+fmt(Math.abs(v));}
  return X.order.map(function(g){var rows={};X.G[g].rows.forEach(function(r){rows[r[0]]=(rows[r[0]]||0)+r[1];});
   var head='<span>'+g+'</span><b>'+m(X.G[g].t)+'</b>',list=Object.keys(rows).map(function(k){return '<div class="drow"><span>'+k+'</span><span>'+m(rows[k])+'</span></div>';}).join('');
   return g===FD?'<details class="fd"><summary class="drow g">'+head+'</summary>'+list+'</details>':'<div class="drow g">'+head+'</div>'+list;}).join('')
   +'<div class="drow tt"><span>Ticking it adds</span><b>'+(X.tot<0?'−':'+')+fmt(Math.abs(X.tot))+'</b></div><div class="dnote">Includes fee and contingency.</div>';}
 var T=S,p=preds(T),nl=nlOf(T,f),fa=fac(p,nl),L=ownLab(T,nl),G={},order=[],tot=0;
 function add(g,label,v){if(!G[g]){G[g]={t:0,rows:[]};order.push(g);}G[g].t+=v;G[g].rows.push([label,v]);tot+=v;}
 for(var c in D.tasks){var sum=0;D.tasks[c].parts.forEach(function(pt){if(!p[pt.c]||pt.s)return;var v=pc(pt,nl,fa)*1.25;
   var o=OWN[pt.c]?OWN[pt.c](T):pt.c;if(o===id)sum+=v;});
  if(Math.abs(sum)>0.5){var named=D.tasks[c].parts.filter(function(pt){return D.partLabel[c+'|'+pt.c];});
   if(named.length)named.forEach(function(pt){if(p[pt.c]&&(OWN[pt.c]?OWN[pt.c](T):pt.c)===id)add(grp(c),c+' '+D.partLabel[c+'|'+pt.c],pc(pt,nl,fa)*1.25);});   // one line per piece of work
   else add(grp(c),c+' '+ttl(c),sum);}}
 D.tps.forEach(function(r){var sum=0;r.parts.forEach(function(pt){if(p[pt.c]&&(OWN[pt.c]?OWN[pt.c](T):pt.c)===id)sum+=amt(pt,f)*1.15;});
  if(sum>0.5)add('Licences & equipment',r.short,sum);});
 if(L.by[id])for(var c2 in D.tasks){var tv=0;D.tasks[c2].parts.forEach(function(pt){if(pt.s&&p[pt.c])tv+=pc(pt,nl,fa)*1.25*L.by[id]/L.F;});if(tv>0.5)add(FD,c2+' '+ttl(c2),tv);}
 if(id==='hwlease')return '<div class="drow"><span>'+f.pcs+(f.pcs===1?' GPU server':' GPU servers')+' × A$'+D.pcLease+' a month</span><b>'+fmt(f.pcs*D.pcLease)+'/mo</b></div><div class="dnote">Running cost, not in the build total</div>';
 if(!order.length)return '<div class="dnote">No cost of its own</div>';
 return order.map(function(g){var head='<span>'+g+'</span><b>'+fmt(G[g].t)+'</b>',list=G[g].rows.map(function(r){return '<div class="drow"><span>'+r[0]+'</span><span>'+fmt(r[1])+'</span></div>';}).join('');
  return g===FD?'<details class="fd"><summary class="drow g">'+head+'</summary>'+list+'</details>':'<div class="drow g">'+head+'</div>'+list;}).join('')
  +(order.length>1||G[order[0]].rows.length>1?'<div class="drow tt"><span>Total</span><b>'+fmt(tot)+'</b></div>':'')+(id==='ownai'?'<div class="dnote">The GPU server (buy or lease) is priced on its own line.</div>':'');}
function plan(n){var c=n*D.run.credits;for(var i=0;i<D.run.voice.length;i++){var v=D.run.voice[i];if(v[0]===null||c<=v[0])return v;}}
function running(S,f){var p=preds(S),o={},n=f.n;
 o.host=p.found?D.run.host:0;o.lic=p.found?D.run.lic:0;o.claude=p.claude?D.run.aiStu*n:0;o.eleven=p.eleven_mode?plan(n)[1]:0;
 o.ownai=0;o.lease=p.lease?f.pcs*D.pcLease:0;o.ownspeech=0;o.support=p.found?D.run.support*Math.ceil(n/300):0;
 var t=0;for(var k in o)t+=o[k];o.total=t;return o;}
// ticking: exclusive groups, and each step's requirements (auto-ticked) and dependants (auto-cleared)
function sat(r,T){return r.some(function(x){return T[x];});}
function locked(id,T){var l=D.lock[id];return !!l&&!T.online&&(!l.when||!!T[l.when]);}
function tick(T,id){T[id]=true;var gp=D.group[id];if(gp)for(var k in D.group)if(k!==id&&D.group[k]===gp)T[k]=false;
 (D.req[id]||[]).forEach(function(r){if(!sat(r,T)){var ok=r.filter(function(x){return !locked(x,T);});tick(T,ok.length?ok[0]:r[0]);}});}   // auto-pick an option that is not locked
function offlineOnly(T){return !!T.offline&&!T.online;}
var FORCED=['ownai','ownspeech'];   // offline only: Claude and ElevenLabs cannot work, so our own AI and speech models are required
function forced(id,T){return offlineOnly(T)&&FORCED.indexOf(id)>=0;}
function settle(T){var ch=true;while(ch){ch=false;for(var k in T)if(T[k]&&(locked(k,T)||(D.req[k]||[]).some(function(r){return !sat(r,T);}))){T[k]=false;ch=true;}
 if(offlineOnly(T))FORCED.forEach(function(k){if(!T[k]){tick(T,k);ch=true;}});}return T;}
function withTick(id){var T=Object.assign({},S);tick(T,id);return settle(T);}
function withUntick(id){var T=Object.assign({},S);T[id]=false;return settle(T);}
// the breakdown
function partsHtml(t,p,nl){var by={},fa=fac(p,nl);t.parts.forEach(function(pt){if(p[pt.c])by[pt.r]=(by[pt.r]||0)+pw(pt,nl,fa);});
 var ls=t.order.filter(function(r){return Math.abs(by[r]||0)>1e-9;}).map(function(r){return [r,by[r],by[r]*5*D.roles[r].rate];});return ls;}
function setRow(tr,ls,off){var c=tr.cells;
 c[2].textContent=ls.map(function(l){return D.roles[l[0]].name;}).join(' + ');
 c[3].textContent=ls.map(function(l){return wk(l[1]);}).join(' + ')+' wk';
 var sum=ls.reduce(function(a,l){return a+l[2];},0);
 c[4].innerHTML=ls.map(function(l){return fmt(l[2]);}).join(' + ')+(ls.length>1?'<br>= <b>'+fmt(sum)+'</b>':'');
 tr.classList.toggle('xoff',off);return sum;}
function pick(m,T){var best=null;for(var k in m){k=+k;if(k<=T&&(best===null||k>best))best=k;}if(best===null)for(var k2 in m){k2=+k2;if(best===null||k2<best)best=k2;}return m[best];}
var CONTENT={'1.1':1,'C1':1,'C2':1,'C3':1,'C4':1,'C5':1,'E2':1,'UX':1,'TC':1};   // lesson wording follows the lesson ticks; the rest follows the AI and speech ticks
function andList(a){return a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];}
function subjText(){var f=fields(),n=f.subj.map(function(s){return s[1].toLowerCase();});return {list:andList(n),
 each:f.subj.every(function(s){return s[2]===f.subj[0][2];})?(f.subj.length?f.subj[0][2]:0)+' lessons each in '+andList(n):andList(f.subj.map(function(s){return s[2]+' lessons in '+s[1].toLowerCase();}))};}
function lessonText(h,nl){var st=subjText();
 return h.replace(/10 lessons each in (numeracy, literacy and personal development|numeracy and literacy)/g,st.each)
 .replace(/numeracy, literacy and personal development|numeracy and literacy/g,st.list).replace(/\b20 one-hour lessons/g,nl+' one-hour lessons')
 .replace(/around 800 in total/g,'around '+(nl*40).toLocaleString('en-AU')+' in total').replace(/\b20 lessons mapped/g,nl+' lessons mapped').replace(/into 20 animated lessons/g,'into '+nl+' animated lessons')
 .replace(/One lesson per subject per week: 2 hours of learning per child each week/g,'About '+(Math.round(nl/10*10)/10)+(nl===10?' hour':' hours')+' of learning per child each week')
 .replace(/about 600 approved lines/g,'about '+(nl*30).toLocaleString('en-AU')+' approved lines');}
function words(p){var f=fields(),nl=f.hrs;var Ts=p.tprec?3:(p.twoway||p.ownspeech||p.review||p.expert)?2:(p.cur||p.mode)?1:0,
 Tc=p.twoway?2:(p.cur||p.mode)?1:0;function T(k){return CONTENT[k]?Tc:Ts;}
 [].forEach.call(document.querySelectorAll('tr[data-code]'),function(tr){var k=tr.dataset.code,v=D.labels[k];if(v)tr.cells[1].innerHTML=lessonText(pick(v,T(k)),nl);});
 [].forEach.call(document.querySelectorAll('tr[data-role]'),function(tr){var k=tr.dataset.role,v=D.resps[k];if(v)tr.cells[1].innerHTML=lessonText(pick(v,T(k)),nl);});
 [].forEach.call(document.querySelectorAll('.nl'),function(e){e.textContent=nl;});
 [].forEach.call(document.querySelectorAll('.main .card'),function(card){var r=card.querySelector('tr[data-code]'),v=r&&D.titles[r.dataset.code];if(v)card.querySelector('.card-h .t').innerHTML=pick(v,T(r.dataset.code));});
 document.getElementById('team-p').innerHTML=pick(D.teamp,Ts);
 var a3=document.querySelector('tr[data-code="A3"] td:nth-child(2) b');   // the A3 title says what is actually being built
 a3.textContent=p.both_net?'Online and offline modes, with data synchronisation':p.offline?'Offline mode: a local database on each computer':p.online?'Online mode: answers sent straight to the cloud':'Online and offline modes, with data synchronisation';}
function render(){var f=fields(),p=preds(S),B=build(S,f),R=running(S,f),role={},roleAll={};words(p);
 // task rows and stage cards
 [].forEach.call(document.querySelectorAll('.main .card'),function(card){var rows=card.querySelectorAll('tr[data-code]'),cs=0,cw=0,fs=0,fw=0,any=false;
  [].forEach.call(rows,function(tr){var t=D.tasks[tr.dataset.code];if(!t)return;any=true;
   var ls=partsHtml(t,p,nlOf(S,f)),lsAll=partsHtml(t,ALLON,nlAll(f)),on=ls.length>0;
   var sum=setRow(tr,on?ls:lsAll,!on);if(on){cs+=sum;ls.forEach(function(l){cw+=l[1];role[l[0]]=(role[l[0]]||0)+l[1];});}
   lsAll.forEach(function(l){fs+=l[2];fw+=l[1];roleAll[l[0]]=(roleAll[l[0]]||0)+l[1];});});
  if(!any)return;var off=cs===0,h=card.querySelector('.card-h'),tot=card.querySelector('tr.tot');
  [h.querySelector('.amt'),h.querySelector('.wk')].forEach(function(e){e.classList.toggle('xoff',off);});
  h.querySelector('.amt').textContent=fmt(off?fs:cs);h.querySelector('.wk').textContent=wk(off?fw:cw)+' person-weeks';
  tot.classList.toggle('xoff',off);tot.querySelector('.wk').textContent=wk(off?fw:cw)+' wk';tot.querySelector('.co').textContent=fmt(off?fs:cs);});
 // team
 [].forEach.call(document.querySelectorAll('tr[data-role]'),function(tr){var r=tr.dataset.role,w=role[r]||0,on=w>1e-9;
  tr.classList.toggle('xoff',!on);var ww=on?w:(roleAll[r]||0);tr.cells[2].textContent=wk(ww)+(ww===1?' week':' weeks');});
 document.getElementById('team-tot').textContent=wk(B.wks)+' person-weeks';
 // licences
 D.tps.forEach(function(r){var tr=document.querySelector('tr[data-tp="'+r.id+'"]');if(!tr)return;var a=0,all=0;
  r.parts.forEach(function(pt){if(p[pt.c])a+=amt(pt,f);if(ALLON[pt.c])all+=amt(pt,f);});
  tr.classList.toggle('xoff',a===0);tr.cells[2].textContent=fmt(a||all);
  if(r.key==='ElevenLabs')tr.cells[1].innerHTML=(p.eleven_own?'US$330/mo Scale plan, ~2M credits (English voice cloned from the voice actor)':'US$99/mo Pro plan, 500k credits')+' <span class="src">[<a href="'+D.elevenSrc+'">source</a>]</span>';});
 document.getElementById('pc-basis').textContent=f.pcs+' × A$'+D.pcBuy.toLocaleString('en-AU')+' (desktop with a 16 GB graphics card, plus a network switch)';
 document.getElementById('tp-tot').textContent=fmt(B.tp);
 // cost summary
 document.getElementById('cs-wk').textContent=wk(B.wks);document.getElementById('cs-lab').textContent=fmt(B.lab);
 document.getElementById('cs-tp').textContent=fmt(B.tp);document.getElementById('cs-mg').textContent=fmt(B.mg);
 document.getElementById('cs-ct').textContent=fmt(B.ct);document.getElementById('cs-tot').textContent=fmt(B.total);
 // operating cost
 var pl=plan(f.n);
 document.getElementById('op-how-claude').textContent='About '+D.run.sess+' sessions per student a month, about A$'+D.run.aiStu.toFixed(2)+' per student';
 document.getElementById('op-how-eleven').textContent=pl[2]+' plan, sized to '+f.n+' students';
 document.getElementById('op-how-lease').textContent=f.pcs+(f.pcs===1?' GPU server':' GPU servers')+' × A$'+D.pcLease+' a month (36-month lease)';
 document.getElementById('op-how-support').textContent=(2*Math.ceil(f.n/300))+' days a month at A$'+D.run.seRate+'/day (2 days per 300 students)';
 D.ops.forEach(function(o){var tr=document.querySelector('tr[data-op="'+o.id+'"]'),on=p[o.c];tr.classList.toggle('xoff',!on);
  document.getElementById('op-'+o.id).textContent=on?fmt(R[o.id]):'—';});
 document.getElementById('op-tot').textContent=fmt(R.total);document.getElementById('op-per').textContent=R.total?'$'+(R.total/f.n).toFixed(2):'—';
 document.getElementById('op-year').textContent=fmt(R.total*12);
 // rail
 var SH=shares(S,f);
 [].forEach.call(document.querySelectorAll('.det:not([hidden])'),function(dv){dv.innerHTML=detail(dv.id.slice(4),f);});
 D.items.forEach(function(id){var box=document.querySelector('input[data-id="'+id+'"]');box.checked=!!S[id];
  var el=document.getElementById('pc-'+id),d,txt,lk=!S[id]&&locked(id,S),fz=forced(id,S);
  box.disabled=lk||fz;document.getElementById('row-'+id).classList.toggle('locked',lk);document.getElementById('row-'+id).classList.toggle('forced',fz);
  if(lk){el.textContent='needs Online';return;}
  if(S[id]){d=id==='hwlease'?R.lease:(SH[id]||0);txt=fmt(d)+(id==='hwlease'?'/mo':'');}
  else{d=adds(id,f);txt=(d<0?'−':'+')+fmt(Math.abs(d))+(id==='hwlease'?'/mo':'');}
  el.textContent=txt;document.getElementById('row-'+id).classList.toggle('on',!!S[id]);});
 [].forEach.call(document.querySelectorAll('li[data-c]'),function(li){li.classList.toggle('xoff',!p[li.dataset.c]);});
 document.getElementById('hrs-row').classList.toggle('show',!!S.lessons);
 document.getElementById('h-tot').textContent=f.hrs+' hours · '+fmt(perHour('lessons'))+' an hour'+(S.content_own?' + '+fmt(perHour('content_own'))+' to prepare':'');
 var hr=hourRate();D.subjects.forEach(function(s){var on=document.querySelector('input[data-subj="'+s[0]+'"]').checked,h=+document.querySelector('input[data-hrs="'+s[0]+'"]').value||10;
  document.getElementById('subj-'+s[0]).classList.toggle('on',on);document.getElementById('pc-s-'+s[0]).textContent=(on?'':'+')+fmt(h*hr);});
 for(var num in D.steps)document.getElementById('done-'+num).textContent=D.steps[num].some(function(id){return S[id];})?'✓':'';
 ['hwbuy','hwlease','trrent','trbuy'].forEach(function(k){document.getElementById('row-'+k).style.display=S.ownai?'':'none';if(!S.ownai)document.getElementById('det-'+k).hidden=true;});
 document.getElementById('total').textContent=fmt(B.total);document.getElementById('tabtotal').textContent=fmt(B.total);
 document.getElementById('run-total').textContent=fmt(R.total);document.getElementById('run-stu').textContent=f.n;
 document.getElementById('banner').innerHTML=B.total?'<b>Struck-through lines are not in this build.</b> Lines marked <span class="oos">Not in our scope</span> are on-ground pilot work, run by the partner.'
  :'<b>Nothing selected yet.</b> Tick the steps on the left to build the quote. Every line below stays struck through until you add it.';}
[].forEach.call(document.querySelectorAll('.rail input[data-id]'),function(b){b.addEventListener('change',function(){
 var id=b.dataset.id;S=b.checked?withTick(id):withUntick(id);
 if(S.lessons&&!fields().subj.length)D.subjects.forEach(function(x,i){document.querySelector('input[data-subj="'+x[0]+'"]').checked=i<2;});   // back to numeracy and literacy
 render();});});
['f-stu','f-pc'].forEach(function(i){document.getElementById(i).addEventListener('input',render);});
[].forEach.call(document.querySelectorAll('.rail input[data-hrs]'),function(b){b.addEventListener('input',render);});
[].forEach.call(document.querySelectorAll('.rail input[data-subj]'),function(b){b.addEventListener('change',function(){
 if(!fields().subj.length)S=withUntick('lessons');render();});});   // no subject left: no lessons
[].forEach.call(document.querySelectorAll('.rail .dd'),function(b){b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();
 var dv=document.getElementById('det-'+b.dataset.dd);dv.hidden=!dv.hidden;b.classList.toggle('open',!dv.hidden);if(!dv.hidden)dv.innerHTML=detail(b.dataset.dd,fields());});});
// resize and hide the rail
var grip=document.getElementById('grip'),drag=false;
try{var sw=+localStorage.getItem('kumiRailW');if(sw>=240&&sw<=700)root.style.setProperty('--rw',sw+'px');if(localStorage.getItem('kumiRailHide')==='1')body.classList.add('collapsed');}catch(e){}
grip.addEventListener('pointerdown',function(e){drag=true;grip.classList.add('on');body.classList.add('resizing');try{grip.setPointerCapture(e.pointerId)}catch(x){}e.preventDefault();});
document.addEventListener('pointermove',function(e){if(!drag)return;root.style.setProperty('--rw',Math.max(240,Math.min(700,e.clientX))+'px');});
document.addEventListener('pointerup',function(){if(!drag)return;drag=false;grip.classList.remove('on');body.classList.remove('resizing');try{localStorage.setItem('kumiRailW',parseInt(getComputedStyle(root).getPropertyValue('--rw'))||300)}catch(e){}});
function hide(on){body.classList.toggle('collapsed',on);try{localStorage.setItem('kumiRailHide',on?'1':'0')}catch(e){}}
document.getElementById('collapse').addEventListener('click',function(){hide(true)});document.getElementById('reopen').addEventListener('click',function(){hide(false)});
window.KUMI={S:function(){return S;},set:function(T){S=settle(Object.assign({},S,T));render();},total:function(){return build(S,fields()).total;}};
render();})();</script>""".replace('__DATA__', json.dumps(DATA))

CSS = """body{font:14px/1.45 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111;margin:0;padding:24px 16px 24px calc(var(--rw,300px) + 16px)}
.main{max-width:1000px;margin:0 auto}
h1{font-size:22px;margin:0 0 4px}h2{font-size:17px;margin:34px 0 6px;border-bottom:2px solid #111;padding-bottom:4px}
.card{margin:18px 0}.card-h{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid #999;padding-bottom:4px}
.ph{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#555}.t{font-size:16px;font-weight:700}.amt{font-size:16px;font-weight:700;text-align:right}.wk{font-size:12px;color:#555;text-align:right}
table{width:100%;border-collapse:collapse;margin:6px 0;font-size:13px}th,td{border:1px solid #bbb;padding:5px 8px;vertical-align:top;text-align:left}
th{background:#f2f2f2;font-size:11px;text-transform:uppercase;letter-spacing:.04em}.n,th.n{text-align:right;white-space:nowrap}tr.tot td,tr.g td{font-weight:700;background:#f7f7f7}
td.code{font-weight:700;white-space:nowrap}ul.sub,ul.plain{margin:4px 0 0;padding-left:18px}ul.sub li{margin:1px 0}.src,.why,.h2sub,.note{font-size:12px;color:#555}.why{display:block}
.total-box table td:last-child{text-align:right;font-weight:700}p.h2sub{margin:4px 0 8px}
.xoff,tr.xoff td,.xoff td,li.xoff{color:#9a9a9a;text-decoration:line-through}tr.xoff td *{color:#9a9a9a}
.cut,tr.cut td{color:#9a9a9a;text-decoration:line-through}
.oos{display:inline-block;text-decoration:none;font-size:10px;font-weight:700;color:#8a1c1c;background:#fde3e3;border-radius:2px;padding:1px 5px;margin-left:6px;vertical-align:middle}
.banner{border:2px solid #111;background:#fffbe6;padding:10px 12px;margin:10px 0 0;font-size:13px}
.lang{background:#ffd54a;color:#111;font-weight:700;padding:1px 5px;border-radius:2px;white-space:nowrap;font-size:11px}.lang.tp{background:#8fdc9f}
.mode{font-size:10px;font-weight:700;padding:1px 5px;border-radius:2px;white-space:nowrap}.mode.on{background:#b9d8ff;color:#0b2a55}.mode.off{background:#ffd9b3;color:#5a2d00}
ol.how{padding-left:20px;margin:6px 0}ol.how li{margin:8px 0}ol.how .sub{display:block;margin:4px 0 0;padding-left:8px;border-left:2px solid #ccc;color:#333}
.fields{display:flex;gap:16px;flex-wrap:wrap;margin:6px 0}.fields label{font-weight:700;font-size:13px}.fields input{width:90px;margin-left:6px;font:inherit;padding:3px 6px}
/* rail */
.rail{position:fixed;top:0;left:0;bottom:0;width:var(--rw,300px);background:#fff;border-right:1px solid #999;display:flex;flex-direction:column;z-index:5;transition:transform .2s}
.rail .scroll{flex:1;overflow:auto;padding:14px 14px 10px}
.rail .head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.rail h3{margin:0;font-size:11px;text-transform:uppercase;letter-spacing:.1em}
.rail .rbtn{border:1px solid #bbb;background:#fff;border-radius:3px;cursor:pointer;font-size:12px;padding:2px 7px}
.rail .step{border-top:1px solid #ddd;padding:6px 0}.rail .step summary{cursor:pointer;font-weight:700;font-size:13px;list-style:none;display:flex;align-items:center;gap:7px}
.rail .step summary::-webkit-details-marker{display:none}.rail .num{display:inline-block;width:18px;height:18px;border-radius:50%;background:#111;color:#fff;font-size:11px;text-align:center;line-height:18px}
.rail .done{margin-left:auto;color:#1a7f37;font-weight:700}
.rail .hint{font-size:11px;color:#777;margin:2px 0 2px 25px}.rail .subh{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#777;margin:6px 0 0 25px}
.rail .opt{display:flex;align-items:center;gap:6px;padding:4px 0 4px 25px;font-size:13px}.rail .opt.sub{padding-left:45px;font-size:12px}
.rail .opt .nm{flex:1;min-width:0;display:flex;align-items:center;gap:7px;cursor:pointer}.rail .det{min-width:0;overflow:hidden}.rail .opt.locked .nm,.rail .opt.forced .nm{cursor:not-allowed}
.rail .dd{border:0;background:none;cursor:pointer;color:#777;font-size:11px;padding:0 2px;line-height:1;transition:transform .15s}.rail .dd.open{transform:rotate(180deg);color:#111}
.rail .det{margin:2px 0 6px 25px;padding:6px 8px;background:#f6f6f6;border-left:2px solid #111;font-size:11px}
.rail .drow{display:flex;justify-content:space-between;gap:8px;padding:1px 0;color:#333}.rail .drow span:first-child{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rail .drow>:last-child{flex:none}
.rail .drow.g{font-weight:700;color:#111;margin-top:4px}.rail .drow.g:first-child{margin-top:0}.rail .drow.tt{border-top:1px solid #bbb;margin-top:4px;padding-top:3px;font-weight:700;color:#111}
.rail details.fd summary{list-style:none;cursor:pointer;font-size:11px}.rail details.fd summary::-webkit-details-marker{display:none}.rail details.fd summary span::before{content:'▸ ';color:#777}.rail details.fd[open] summary span::before{content:'▾ '}.rail details.fd .drow:not(.g){padding-left:12px}
.rail .dnote{color:#777;font-style:italic;margin-top:3px}.rail .opt .pc{font-size:12px;color:#777;white-space:nowrap;font-variant-numeric:tabular-nums}.rail .opt.on .pc{color:#111;font-weight:700}
.rail .req{font-size:10px;color:#777;font-weight:400}
.rail .opt .nm input{margin:0 5px 0 0}.rail label.nm{display:flex;align-items:center;cursor:pointer}
.rail .hrsrow{display:none;align-items:center;gap:8px;margin:4px 0 4px 25px;padding:6px 8px;border:2px solid #111;background:#fffbe6;font-size:12px;font-weight:700}
.rail .hrsrow.show{display:flex}.rail .subjs{display:none;margin:2px 0 4px}.rail .subjs.show{display:block}.rail .subj .hrs{margin-left:4px}.rail .htot{margin:2px 0 0 45px}.rail .hrs{width:52px;font:inherit;padding:1px 4px}.rail .hu{font-size:11px;color:#666;font-weight:400}
.rail .opt.locked{opacity:.45;cursor:not-allowed}.rail .opt.forced .nm::after{content:'required offline';font-size:10px;color:#8a1c1c;font-weight:700}.rail .opt.locked .pc{font-style:italic}
.rail .total{border-top:2px solid #111;padding:10px 14px;background:#f7f7f7}.rail .total span{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#555}
.rail .total b#total{display:block;font-size:24px;font-variant-numeric:tabular-nums}.rail .total small{color:#444;font-size:12px}
.rail .grip{position:absolute;top:0;right:-4px;bottom:0;width:9px;cursor:col-resize;z-index:6;touch-action:none}.rail .grip:hover,.rail .grip.on{background:rgba(0,0,0,.15)}
.reopen{display:none;position:fixed;top:12px;left:12px;z-index:6;border:2px solid #111;background:#fff;border-radius:3px;cursor:pointer;font:700 13px -apple-system,Segoe UI,Arial,sans-serif;padding:7px 10px}
body.collapsed .rail{transform:translateX(-100%)}body.collapsed .reopen{display:block}body.collapsed{padding-left:16px}body.resizing{user-select:none;cursor:col-resize}
@media (max-width:900px){body{padding:0 0 96px}.main{padding:16px}.rail{position:static;width:auto;border-right:0;border-bottom:1px solid #999}.rail .scroll{overflow:visible}
 .rail .total{position:fixed;left:0;right:0;bottom:0;z-index:7}.rail .grip,.rail .rbtn,.reopen,body.collapsed .reopen{display:none!important}body.collapsed .rail{transform:none}}"""

page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Kumi quote builder</title><style>{CSS}</style></head><body>{rail_html()}<div class="main">
<h1>Kumi · Grade 3 pilot · quote builder</h1>
<p class="h2sub">Sing Singh AI builds the platform. AUD, excluding GST. Task codes (1.1, A1, B5 …) match the full budget.</p>
<div class="banner" id="banner"></div>
{HOW}
{body}
{OPS_HTML}
</div>{JS}</body></html>"""
page = page.replace('Pijin', 'Tok Pisin').replace('Kingi', 'Kumi')
open(OUT, 'w', encoding='utf8').write(page)
print(OUT, len(page), '| Core, 20 lessons', round(build_total(OLD_CORE)), '| everything, 30 lessons', round(build_total(ALL, nl=30)), '| per hour of content', round(build_total(dict(OLD_CORE), nl=21) - build_total(OLD_CORE)))
