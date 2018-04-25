#!/bin/bash

yarn start > ../yarn.log &
until grep -m 1 'Compiled successfully!' ../yarn.log ; do true; done
node node_modules/sonarwhal/dist/src/bin/sonarwhal.js http://localhost:3000/
