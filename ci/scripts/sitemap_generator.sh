#!/bin/bash

# url configuration
URL=$(jq -r ".homepage" package.json)

# values: always hourly daily weekly monthly yearly never
FREQ="weekly"

# date in format AAAA-MM-DD
DATE=`date +"%Y-%m-%d"`

cat > build/sitemap.xml << EOF1
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${URL}</loc>
    <lastmod>$DATE</lastmod>
    <changefreq>$FREQ</changefreq>
    <priority>1</priority>
  </url>
</urlset>
EOF1

wget -O- "http://www.google.com/webmasters/tools/ping?sitemap=$URL/sitemap.xml"
wget -O- "http://search.yahooapis.com/SiteExplorerService/V1/ping?sitemap=$URL/sitemap.xml"
wget -O- "http://www.bing.com/webmaster/ping.aspx?siteMap=$URL/sitemap.xml"