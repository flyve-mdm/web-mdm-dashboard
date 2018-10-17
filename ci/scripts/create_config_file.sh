#!/bin/bash

cat <<EOF >public/config.js
window.appConfig = {
  glpiApiLink: "$API_LINK",
  appName: "MDM Dashboard",
  bugsnag: "$BUGSNAG_KEY"
}
EOF
