#!/bin/bash

# Install jq for json parse

apt-get -y update
apt-get -y install jq python-pip zip unzip
npm rebuild node-sass
yarn cache clean
yarn global add jsdoc
yarn global add gh-pages
yarn install