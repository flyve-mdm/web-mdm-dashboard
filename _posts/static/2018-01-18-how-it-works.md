---
layout: howtos
howtos: true
published: true
title: How it works
permalink: howtos/how-it-works
description: What you need to know
category: user
---
The Web MDM Dashboard of Flyve MDM is a centralised mobile device management tool.

It is designed to work with:

* [Flyve MDM plugin](http://flyve.org/glpi-plugin/) for GLPI.
* [Flyve MDM Demo plugin](http://flyve.org/demo-mode/)
* [Android MDM Agent](http://flyve.org/android-mdm-agent/)

#### Plugin's functionality

The Dashboard uses the GLPI API Rest to save glpi/flyve users, however GLPI doesn't count with the option to self-create accounts, this is is enabled on the Web Dashboard with the Demo mode plugin, allowing to register new accounts directly into GLPI DB.

The management features are the same of the Flyve MDM plugin, the Administrator of the IT infrastructure will be able to:

* Control and monitor the security policies
* Configure and deploy your mobile fleet
* Install and uninstall applications remotely
* Send files remotely to all terminals
* User's accounts configuration
* Create an inventory of all of your company terminals (mobile fleet inventory)
* Deploy and control Bluetooth and Wi-Fi connectivity
* Support to Bring Your Own Devices (BYOD)
* Enable and disable cameras
* Activate real-time geolocation of your terminals
* Delete, partially or totally, your data in case of loss or theft

#### MDM Agent

The MDM Agent takes control of the device and implements the policies coming from the Dashboard, the backend and the Agent on the devices maintain a two-way communication through a M2M server.

The exception is the enrollment, the information from the Agent is sent directly to the backend.
