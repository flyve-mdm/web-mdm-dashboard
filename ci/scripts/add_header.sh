#!/bin/bash

directory='./coverage'
header='---\
layout: conatiner\
---\
'
find -d $directory -type f -name "*.html" -exec sed -i "1s/^/$header /" "{}" \;
