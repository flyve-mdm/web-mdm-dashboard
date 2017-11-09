#!/bin/bash

if [[ $TRAVIS_BRANCH = "develop" && $TRAVIS_PULL_REQUEST = false ]]; then
    source ci/scripts/deploy_develop.sh
elif [[ $TRAVIS_BRANCH = "master" && $TRAVIS_PULL_REQUEST = false ]]; then
    source ci/scripts/deploy_master.sh
fi