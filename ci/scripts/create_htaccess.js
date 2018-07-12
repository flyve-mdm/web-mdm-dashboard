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

const DASHBOARD_WEBROOT = getWebRoot(process.argv.slice(2))

fs.writeFile('build/.htaccess', `# .htaccess for production server

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
  console.log('Saved!')
})
