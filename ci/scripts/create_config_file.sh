#!/bin/bash

cat <<EOF >public/config.json
{
    "selfRegistration": true,
    "glpiApiLink": "$API_LINK",
    "demoToken": "$DEMO_TOKEN",
    "pluginToken": "$PLUGIN_TOKEN",
    "appName": "MDM Dashboard"
}
EOF
