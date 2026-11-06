from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import base64, mimetypes
root=Path(__file__).resolve().parents[1]
base=root/'preview'
soup=BeautifulSoup((base/'index.html').read_text(),'lxml')
for link in list(soup.select('link[rel="stylesheet"]')):
 style=soup.new_tag('style');style.string=(base/link['href']).read_text();link.replace_with(style)
for img in soup.find_all('img'):
 path=base/img.get('src','')
 if path.exists(): img['src']='data:'+(mimetypes.guess_type(str(path))[0] or 'application/octet-stream')+';base64,'+base64.b64encode(path.read_bytes()).decode()
for source in soup.find_all('source'):
 path=base/source.get('srcset','')
 if path.exists(): source['srcset']='data:'+(mimetypes.guess_type(str(path))[0] or 'application/octet-stream')+';base64,'+base64.b64encode(path.read_bytes()).decode()
html=str(soup)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-gpu'])
 for width,height,name,where in [(1440,900,'Filipe-Monteiro-Violet-Desktop.png','top'),(1440,1000,'Filipe-Monteiro-Violet-Projetos.png','projects'),(390,1210,'Filipe-Monteiro-Violet-Mobile.png','top')]:
  page=b.new_page(viewport={'width':width,'height':height},device_scale_factor=1,reduced_motion='reduce')
  page.set_content(html,wait_until='load')
  if where=='projects':
   page.evaluate("() => window.scrollTo(0, document.getElementById('projetos').getBoundingClientRect().top + scrollY + 12)")
   page.wait_for_timeout(250)
  outfile=Path('/mnt/data')/name
  page.screenshot(path=str(outfile))
  print(outfile, outfile.stat().st_size)
  if width==1440 and where=='top':
   page.locator('.terminal-trigger').click()
   assert page.locator('.terminal-window').is_visible()
   page.locator('.terminal-window input').fill('help')
   page.locator('.terminal-window input').press('Enter')
   assert 'Comandos:' in page.locator('.term-results').inner_text()
   print('terminal interaction OK')
  page.close()
 b.close()
