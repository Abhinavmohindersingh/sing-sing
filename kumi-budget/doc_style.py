"""Page styles and A4 pagination for the Kumi budget.
HEAD is the page head (styles) up to the opening <div class="wrap">; paginate() cuts the generated body into A4 sheets."""
import os, re

HERE = os.path.dirname(os.path.abspath(__file__))
HEAD = open(os.path.join(HERE, 'doc_head.html'), encoding='utf8').read()
RUNNING = "Kumi · Grade 3 pilot in one school · Investment budget, version 2"
RUNHEAD = f'<div class="runhead"><span>{RUNNING}</span><span class="pg"></span></div>'

STAGE_CARD = '<div class="card"><div class="card-h"><div><div class="ph">'
INTERNAL = re.compile(r'<script>\(function\(\)\{function f\(\)\{document\.documentElement\.classList\.toggle\("show-internal".*?</script>'
                      r'<section class="internal-only" id="team-rates">(.*?)</section>\n', re.S)
TABLE = re.compile(r'(<table[^>]*>)(.*?)</table>', re.S)

def _thead(m):
    """Repeat a table's header row on every printed page: first row with <th> goes in <thead>, the rest in <tbody>."""
    open_tag, inner = m.group(1), m.group(2)
    th = inner.find('<th')
    if th < 0: return m.group(0)
    end = inner.index('</tr>', th) + len('</tr>')
    return f'{open_tag}<thead>{inner[:end]}</thead><tbody>{inner[end:]}</tbody></table>'

def paginate(h):
    a = len(HEAD); b = h.rindex('</div></body></html>')
    body = h[a:b]
    m = INTERNAL.search(body)
    internal = None
    if m:
        script = body[m.start():body.index('<section class="internal-only"', m.start())]
        internal = (script, m.group(1)); body = body[:m.start()] + body[m.end():]
    body = TABLE.sub(_thead, body)
    # sheets: page 1, then one per <h2>, and one per stage card in the work breakdown
    cuts = [0] + [x.start() for x in re.finditer(r'<h2>', body)]
    wb = body.index('<h2>Work breakdown')
    cuts += [x.start() for x in re.finditer(re.escape(STAGE_CARD), body) if x.start() > wb][1:]
    cuts.remove(body.index('<h2>Cost summary</h2>'))   # cost summary shares the travel sheet
    cuts = sorted(set(cuts)) + [len(body)]
    chunks = [body[x:y] for x, y in zip(cuts, cuts[1:])]
    pay = next(c for c in chunks if c.startswith('<h2>Payment schedule'))
    chunks.remove(pay); chunks.insert(next(i for i, c in enumerate(chunks) if c.startswith('<h2>Timeline')) + 1, pay)
    out = '\n'.join(f'<section class="sheet">{RUNHEAD}{c}</section>' for c in chunks)
    if internal:
        script, inner = internal
        out += (f'\n{script}<section class="internal-only sheet" id="team-rates">{RUNHEAD}'
                f'<div class="internal-flag">Internal · team view only</div>{TABLE.sub(_thead, inner)}</section>')
    return HEAD + out + '</div></body></html>'
