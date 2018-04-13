#!/bin/bash

# Install jq for json parse

apt-get -y update
apt-get -y install jq
apt-get -y install python-pip
apt-get -y install zip unzip
npm rebuild node-sass
yarn cache clean
yarn global add jsdoc
yarn global add gh-pages
yarn install