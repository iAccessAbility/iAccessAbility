import os
from datetime import datetime

BASE_URL = "https://iaccessabilityservices.com"

def collect_html_files(base_dir):
    html_files = []
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".html"):
                rel_path = os.path.join(root, file).replace("\\", "/")
                url_path = rel_path.replace("html/", "").replace("index.html", "")
                html_files.append((rel_path, url_path))
    return html_files

def create_sitemap(files):
    today = datetime.today().strftime('%Y-%m-%d')
    sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    for filepath, url in files:
        full_url = f"{BASE_URL}/html/{url}"
        sitemap.append(f"""  <url>
    <loc>{full_url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>""")
    sitemap.append('</urlset>')
    return "\n".join(sitemap)

if __name__ == "__main__":
    files = collect_html_files("html")
    sitemap_content = create_sitemap(files)
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_content)
