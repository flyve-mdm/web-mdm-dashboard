const fs = require('fs')

function getWebRoot (argv) {
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--webRoot") {
      let webRoot = (argv[index + 1] || '/')
      if (webRoot[0] !== '/') {
        webRoot = `/${webRoot}`
      }
      if (webRoot[webRoot.length - 1] !== '/') {
        webRoot = `${webRoot}/`
      }
      return webRoot
    }
  }
  return '/'
}

function getDev (argv) {
  if(argv.filter(element => element === '--dev').length > 0) {
    return true
  }
  return false
}

const DASHBOARD_WEBROOT = getWebRoot(process.argv.slice(2))

fs.writeFile('build/.htaccess',

`# .htaccess for production server

# url relative to web root dir for example /dashboard/
# if you url is http://www.example.com/dashboard/
SetEnvIf Host ^ DASHBOARD_WEBROOT=${DASHBOARD_WEBROOT}

#Custom error pages
ErrorDocument 400 ${DASHBOARD_WEBROOT}error?code=400
ErrorDocument 401 ${DASHBOARD_WEBROOT}error?code=401
ErrorDocument 403 ${DASHBOARD_WEBROOT}error?code=403
ErrorDocument 404 ${DASHBOARD_WEBROOT}error?code=404
ErrorDocument 500 ${DASHBOARD_WEBROOT}error?code=500

<IfModule mod_rewrite.c>
    RewriteEngine On
    # RewriteBase must also match with DASHBOARD_WEBROOT
    RewriteBase ${DASHBOARD_WEBROOT}
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . ${DASHBOARD_WEBROOT}index.html [L]
</IfModule>

`, function (err) {
  if (err) throw err
  if (getDev(process.argv.slice(2))){
    fs.appendFile('build/.htaccess',

`# DISABLE ALL CACHING WHILE DEVELOPING
<FilesMatch "\.(html|htm|js|css|json)$">
  FileETag None

  <IfModule mod_headers.c>
    Header unset ETag
    Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Note "CACHING IS DISABLED ON LOCALHOST OR DEVELOP"
    Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"
  </IfModule>
</FilesMatch>

# EXPIRES CACHING
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access 1 year"
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/gif "access 1 year"
  ExpiresByType image/png "access 1 year"
  ExpiresByType text/css "access 1 month"
  ExpiresByType text/html "access 1 month"
  ExpiresByType application/pdf "access 1 month"
  ExpiresByType text/x-javascript "access 1 month"
  ExpiresByType application/x-shockwave-flash "access 1 month"
  ExpiresByType image/x-icon "access 1 year"
  ExpiresDefault "access 1 month"
</IfModule>`

    , function (err) {
      if (err) throw err
    })
  }
})
