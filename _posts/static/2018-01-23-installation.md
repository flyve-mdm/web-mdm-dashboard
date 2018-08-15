---
layout: howtos
howtos: true
published: true
title: Installation
permalink: howtos/installation
description: Get it now
category: user
---

## First of all

The Web MDM Dashboard works in conjuction with [Flyve MDM plugin](http://flyve.org/glpi-plugin/) for GLPI and [Flyve MDM Demo plugin](http://flyve.org/demo-mode/).

The plugins must be already installed in your GLPI instance, as they provide features to the Dashboard. For more information, check the [Installation article](http://flyve.org/glpi-plugin/howtos/installation-wizard) of Flyve MDM plugin for GLPI, there your'll find instructions and links that will help you to make a successful installation of GLPI + Flyve MDM.

### Compatibility Matrix

<br>

<table>
    <tr>
        <th style="width:200px">GLPI</th>
        <td style="width:100px">9.1.x</td>
        <td>9.2.x</td>
    </tr>
    <tr>
        <th>Flyve MDM plugin</th>
        <td>1.x.x</td>
        <td>2.0.0-dev</td>
    </tr>
    <tr>
        <th>Flyve MDM Demo plugin</th>
        <td>-</td>
        <td>1.0.0-dev</td>
    </tr>
    <tr>
        <th>Web MDM Dashboard</th>
        <td>-</td>
        <td>1.0.0-dev</td>
    </tr>
</table>

## Get Flyve MDM Web Dashboard

You can download it with any of these methods:

<!--- 1.[Download the latest release from GitHub](https://github.com/flyve-mdm/web-mdm-dashboard/releases)--->
1. [Download the zip file](https://github.com/flyve-mdm/web-mdm-dashboard/archive/develop.zip) (Develop branch)
1. Using Git, clone the repo:

```console
    git clone https://github.com/flyve-mdm/web-mdm-dashboard.git
```

## Install Dependencies

The following commands can be used either with npm or yarn

* Run the following command:

```console
    npm install
```

## Configure the Dashboard

* Go to src/config/config.json
* Add the url of the GLPI API and the User Token from Demo plugin where indicated in the config.json file.

You can find the GLPI API url in Setup>General>API

![GLPI](https://raw.githubusercontent.com/Naylin15/Screenshots/master/dashboard-legacy/api-legacy-dashboard.png)

The Demo plugin provides the User Token in its configuration as the Service's API Token, go to Setup>Plugins>Flyve MDM Demo

![Demo User Token](https://github.com/Naylin15/Screenshots/blob/master/glpi/demo-mode/demo-settings.png?raw=true)

<img src="{{ 'images/picto-information.png' | absolute_url }}" alt="Good to know!" height="16"> The User Token can be found in Administration>Users>Settings - Remote Access Keys, the API Token is the user token.

<img src="https://github.com/Naylin15/Screenshots/blob/master/glpi/api-token.png?raw=true" alt="API Token location" height="550px">

* For building, use one of the following commands depending of the package manager you prefer:

```console
     npm run-script build
     yarn build
```

* Check that all tests pass

```console
    npm test
```

* For preview run

```console
    npm start
```

It will open a new window with a test server localhost:3000.
