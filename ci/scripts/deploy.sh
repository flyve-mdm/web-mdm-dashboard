#!/bin/bash

if [[ $TRAVIS_BRANCH = "develop" && $TRAVIS_PULL_REQUEST = false ]]; then

    source ci/scripts/deploy_develop.sh

fi