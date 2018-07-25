#!/bin/bash

cat <<EOF >public/config.js
window.appConfig = {
  glpiApiLink: "$API_LINK",
  demoToken: "$DEMO_TOKEN",
  pluginToken: "$PLUGIN_TOKEN",
  appName: "MDM Dashboard",
  bugsnag: "$BUGSNAG_KEY"
}
EOF
