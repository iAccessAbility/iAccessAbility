import os
from datetime import datetime

# Configuration
BASE_URL = "https://iaccessabilityservices.com"

EXCLUDE_PATHS = {
    "404.html",
    "navbar/navbar.html",
    "html/thankyou.html",
    "html/dino.html",
    "html/apple-store-escape.html",
    "html/trivia.html"
}
OUTPUT_FILE = "sitemap.xml"

def find_html_files(base_dir):
    html_files = []
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".html"):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ".").replace("\\", "/")
                if rel_path not in EXCLUDE_PATHS:
                    html_files.append(rel_path)
    return html_files

def generate_sitemap(urls):
    today = datetime.now().strftime("%Y-%m-%d")
    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    for url in urls:
        xml.append("    <url>")
        xml.append(f"       <loc>{BASE_URL}/{url}</loc>")
        xml.append(f"           <lastmod>{today}</lastmod>")
        xml.append("            <changefreq>monthly</changefreq>")
        xml.append("        <priority>1.0</priority>")
        xml.append("    </url>")

    xml.append("</urlset>")
    return "\n".join(xml)

def main():
    html_files = find_html_files(".")
    sitemap = generate_sitemap(html_files)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(sitemap)
    print(f"Sitemap generated with {len(html_files)} URLs.")

if __name__ == "__main__":
    main()
