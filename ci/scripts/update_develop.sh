#!/bin/bash

# Update develop branch
  git fetch origin develop
  git checkout develop
  git clean -d -x -f
  git merge $CIRCLE_BRANCH
  git push origin develop
