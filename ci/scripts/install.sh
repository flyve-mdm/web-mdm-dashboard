#!/bin/bash

# Install jq for json parse

echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | tee /etc/apt/sources.list.d/webupd8team-java.list
echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886
echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
apt-get -y update
apt-get -y install jq python-pip zip unzip oracle-java8-installer oracle-java8-set-default wget xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 ruby-full
npm rebuild node-sass
yarn cache clean
yarn global add jsdoc
yarn global add gh-pages
yarn install
pip install html5validator