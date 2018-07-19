#!/bin/bash

# Node dependencies
npm rebuild node-sass
yarn cache clean
yarn global add jsdoc
yarn global add gh-pages
yarn install
