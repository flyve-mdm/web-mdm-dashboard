#!/usr/bin/env bash

# set transifex credentials and update the translations
cat /dev/null > ~/.transifexrc
echo "[https://www.transifex.com]" >> ~/.transifexrc
echo "hostname = https://www.transifex.com" >> ~/.transifexrc
echo "username = ${TRANSIFEX_USER}" >> ~/.transifexrc
echo "password = ${TRANSIFEX_API_TOKEN}" >> ~/.transifexrc
echo "token = ${TRANSIFEX_API_TOKEN}" >> ~/.transifexrc
tx pull -a

# set configuration
source ci/scripts/create_config_file.sh

# build the dashboard
yarn build
rm -r /var/www/public/dashboard
cp -r ./build /var/www/public/dashboard
cp -f ./htaccess_dev /var/www/public/dashboard/.htaccess