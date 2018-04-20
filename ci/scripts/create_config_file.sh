#!/bin/bash

cat <<EOF >src/config/config.json
{
    "selfRegistration": true,
    "glpiApiLink": "$API_LINK",
    "userToken": "$USER_TOKEN",
    "appName": "MDM Dashboard"
}
EOF
