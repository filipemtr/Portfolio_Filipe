"""QA estático da exportação offline, sem depender do navegador."""
from pathlib import Path
from bs4 import BeautifulSoup

base=Path(__file__).resolve().parent.parent
preview=base/'preview'
main=BeautifulSoup((preview/'index.html').read_text(encoding='utf-8'),'html.parser')
projects=['lastfm-tracker','pipeline-databricks-s3','realeza-barbers','cofree']
imgs=main.select('img.project-cover')
assert len(imgs)==4, f'4 imagens esperadas, encontrou {len(imgs)}'
for img in imgs:
    path=preview/img['src']
    assert path.is_file(), f'Imagem não encontrada: {path}'

assert len(main.select('.card-github'))==3, 'Os 3 cards menores precisam de botão GitHub'
assert len(main.select('.round-icon-link'))>=1, 'O card em destaque precisa de botão GitHub'
for slug in projects:
    doc=BeautifulSoup((preview/'projetos'/f'{slug}.html').read_text(encoding='utf-8'),'html.parser')
    for img in doc.select('img.project-cover'):
        assert (preview/'projetos'/img['src']).is_file(), f'Imagem de case ausente para {slug}'
    assert doc.find('a',href=lambda x: x and x.startswith('https://github.com/filipemtr/'))

for a in main.select('.card-github'):
    assert a.get('target')=='_blank'
    assert 'noopener' in a.get('rel',[])
    assert a.get('aria-label') and 'GitHub' in a['aria-label']

assert 'fictional.svg' in [x['src'] for x in imgs if 'pipeline-databricks-s3' in x['src']][0]
assert 'verified.png' in [x['src'] for x in imgs if 'realeza-barbers' in x['src']][0]
assert 'ILUSTRAÇÃO FICTÍCIA' in (preview/'projetos/pipeline-databricks-s3.html').read_text()
assert not (preview/'assets/projects/pipeline-databricks-s3/verified.png').exists()
assert 'border-bottom:1px solid rgba(99,152,222,.12)' not in (preview/'styles.css').read_text()
print('PASS — 4 imagens, 4 estudos de caso, 4 links GitHub, CSS e proveniência básica.')
