#!/bin/bash
#
# Instalation / Configuration Dashboad WEB
#
if [ ! -d $APPPATH/node_modules ] || [ ! "$(ls -A $APPPATH/node_modules)" ]; then
    yarn install
fi
if [ ! -d $APPPATH/build ] || [ ! "$(ls -A $APPPATH/build)" ]; then
    yarn build
fi
yarn start
