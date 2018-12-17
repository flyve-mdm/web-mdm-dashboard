#!/bin/bash

# Get version number from package.json
export GIT_TAG=$(jq -r ".version" package.json)

# Get the current date
export DATE=`date '+%Y-%m-%d %H:%M:%S'`

cat <<EOF >public/config.js
window.appConfig = {
  glpiApiLink: '$API_LINK',
  appName: 'MDM Dashboard',
  bugsnag: '$BUGSNAG_KEY',
  release: {
    lastCommit: '$CIRCLE_SHA1',
    currentVersion: '$GIT_TAG',
    buildNumber: '$CIRCLE_BUILD_NUM',
    deployDate: '$DATE',
    buildUrl: '$CIRCLE_BUILD_URL',
  },
}
EOF
