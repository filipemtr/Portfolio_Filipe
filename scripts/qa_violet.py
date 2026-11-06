from playwright.sync_api import sync_playwright
from pathlib import Path
root=Path(__file__).resolve().parents[1]
from bs4 import BeautifulSoup
import base64, mimetypes
base=root/'preview'
soup=BeautifulSoup((base/'index.html').read_text(),'lxml')
for link in list(soup.select('link[rel="stylesheet"]')):
    st=soup.new_tag('style')
    st.string=(base/link['href']).read_text()
    link.replace_with(st)
for img in soup.find_all('img'):
    path=(base/img.get('src',''))
    if path.exists():
        mt=mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
        img['src']='data:'+mt+';base64,'+base64.b64encode(path.read_bytes()).decode()
for source in soup.find_all('source'):
    path=base/source.get('srcset','')
    if path.exists():
        mt=mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
        source['srcset']='data:'+mt+';base64,'+base64.b64encode(path.read_bytes()).decode()
html=str(soup)
report=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-gpu'])
 for width,height in [(1440,900),(1280,800),(980,800),(768,950),(390,844),(375,812),(320,700)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1, reduced_motion='reduce')
  errors=[]
  page.on('pageerror',lambda err: errors.append(str(err)))
  page.set_content(html,wait_until='load')
  page.wait_for_timeout(250)
  val=page.evaluate('''() => ({wide:document.documentElement.scrollWidth, client:document.documentElement.clientWidth, img:document.querySelector('.portrait-photo')?.naturalWidth, map:!!document.querySelector('.systems-lab-map .hero-visual'), header:document.querySelector('.signature-header')?.textContent.trim(), cards:document.querySelectorAll('.project-card').length})''')
  if width==1440:
   page.screenshot(path=str(root/'tests/violet-desktop-hero.png'))
   page.locator('#projetos').scroll_into_view_if_needed()
   page.wait_for_timeout(300)
   page.screenshot(path=str(root/'tests/violet-desktop-projects.png'))
  elif width==390:
   page.screenshot(path=str(root/'tests/violet-mobile-hero.png'))
  # interactions
  if width==1440:
   page.locator('.map-node').last.click()
   report.append('map selected: '+str(page.locator('.map-readout b').inner_text()))
   page.locator('.project-filters button').nth(2).click()
   report.append('filter software visible cards: '+str(page.locator('.project-card:visible h3').all_inner_texts()))
  report.append(f'{width}px: {val} errors={errors}')
  page.close()
 browser.close()
print('\n'.join(report))
