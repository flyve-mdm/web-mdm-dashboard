#!/usr/bin/env bash

webroot="/var/www/public/dashboard"

# set transifex credentials and update the translations
cat /dev/null > ~/.transifexrc
echo "[https://www.transifex.com]" >> ~/.transifexrc
echo "hostname = https://www.transifex.com" >> ~/.transifexrc
echo "username = ${TRANSIFEX_USER}" >> ~/.transifexrc
echo "password = ${TRANSIFEX_API_TOKEN}" >> ~/.transifexrc
echo "token = ${TRANSIFEX_API_TOKEN}" >> ~/.transifexrc
tx pull -a


# install dependencies
apt-get -y update
apt-get -y install jq wget

# set configuration
source ci/scripts/create_config_file.sh

# build the dashboard
yarn build
source ci/scripts/sitemap_generator.sh
rm -r ${webroot}
cp -r ./build ${webroot}

# set the production htaccess for public web site
cp -f ./htaccess_prod ${webroot}/.htaccess

# change web server options for development environment
sed -i -- 's/DASHBOARD_WEBROOT \//DASHBOARD_WEBROOT \/dashboard\//g' ${webroot}/.htaccess
cat ./htaccess_dev >> ${webroot}/.htaccess
