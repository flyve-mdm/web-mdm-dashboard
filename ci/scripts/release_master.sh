#!/bin/bash

export GIT_TAG=$(jq -r ".version" package.json)
git push origin :release/${GIT_TAG}
