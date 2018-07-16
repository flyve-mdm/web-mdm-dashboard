#!/bin/bash
#
# Instalation / Configuration Dashboad WEB
#
if [ ! -d $APPPATH/node_modules ] && [ ! "$(ls -A $APPPATH/node_modules)" ]; then
    yarn install
    yarn build
fi
yarn start
