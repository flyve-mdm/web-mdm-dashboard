#!/bin/bash

# Install jq for json parse
sudo apt-get install jq
sudo apt-get install python-pip
yarn cache clean
yarn global add jsdoc
yarn global add gh-pages
yarn install