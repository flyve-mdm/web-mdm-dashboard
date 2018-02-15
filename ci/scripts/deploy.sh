#!/bin/bash

if [[ $CIRCLE_BRANCH = "develop" ]]; then
    source ci/scripts/deploy_develop.sh
elif [[ $TRAVIS_BRANCH = "master" ]]; then
    source ci/scripts/deploy_master.sh
fi