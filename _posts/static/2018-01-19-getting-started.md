---
layout: howtos
published: true
title: Getting started
permalink: howtos/getting-started
description: Welcome to Flyve MDM
category: user
---

The New Generation of the Web Dashboard presents a brand new design.

<img src="{{ '/images/picto-information.png' | absolute_url }}" alt="Important!" height="16px"/> You must have previously installed the [Flyve MDM plugin for GLPI](http://flyvemdm-doc.readthedocs.io/en/latest/installation/index.html) and in the devices the [MDM Agent for Android](http://flyve.org/android-mdm-agent/howtos/installation).

In this article you will learn how to

* [Sign in](#si)
* [Enroll an Agent](#ea)
* [Create a fleet](#cf)
* [Upload files and applications for deployment](#afd)
* [Apply the devices features](#df)
* [Unenroll an Agent](#ua)
* [Delete an Agent](#da)
* [Our Policies](#op)

## <a name="si"></a>Sign in

Using the same credential from your GLPI instance, you can login and take full control of your IT infrastructure

<img src="{{ '/images/posts/sign-in.gif' | absolute_url }}" alt="Signing in" width="300px"/>

## <a name="ea"></a>Enrolling Agents

In order to manage the agents, you must invite the user of the device:

* Go to the Invitations section
* Click on the "+" button
* Write the email of the user whose device you'll control
* Save

<img src="{{ '/images/posts/new-invitation.png' | absolute_url }}" alt="Invitation" width="700px"/>

Automatically, the user will receive an invitation in his email account and the invitation will be displayed on the left side in the dashboard.

The Invitations can have one of the following status:

* Pending: when the invitation hasn't been used for enrollment.
* Done: when the invitation had been used.

Please note that the users must have installed in the devices the Android or iOS MDM Agent, see these links for more information:

* [Android MDM Agent - Getting Started](http://flyve.org/android-mdm-agent/howtos/getting-started)
* [iOS MDM Agent - Getting started](http://flyve.org/ios-mdm-agent/howtos/getting-started)

## Manage your fleet

Every new enrolled device will have assigned the "not managed fleet" by default. You must create a new fleet to manage your mobile fleet.

<img src="{{ '/images/picto-warning.png' | absolute_url }}" alt="Warning:" height="16px"> To avoid future problems do not delete this preconfigured fleet, it is require for the software.

### <a name="cf"></a>Create your fleet

* Click in the "+" button on the Fleet section
* Name it
* Add the policies your fleet requires
* Save

<img src="{{ '/images/posts/new-fleet.png' | absolute_url }}" alt="New Fleet" width="700px"/>

##### Once you [assign the devices](#main) to the Fleet, all the policies will be immediately applied!

### <a name="afd"></a>Applications & files deployment

To Deploy applications on your fleets they must be added first on their respective sections.

* Go to the Applications section
* Click on "+" button
* Select the application your fleet requires

<img src="{{ '/images/posts/add-app.png' | absolute_url }}" alt="Add application" />

The same procedures applies to the Files.

* Go to the Files section
* Click on "+" button
* Select the file your fleet requires

<img src="{{ '/images/posts/file-saved.png' | absolute_url }}" alt="Add file" />

##### Once this is done you will be able to use them with the Deploy policy on the fleets.

<img src="{{ '/images/posts/deploy.png' | absolute_url }}" alt="Deploy app & file" width="600px" />

For this:

* Select the file or application desired.
* Click on the "+" button to add it to your fleet.

## <a name="df"></a>Device's features

Once the devices are enrolled, you can have access to the following features:

### <a name="main"></a>Main

You can assign the device to a Fleet or rename it.

* Click on the pencil Icon
* Save changes

<img src="{{ '/images/posts/main-devices.png' | absolute_url }}" alt="Main" />

### System report

Get a report of both software and hardware information.

<img src="{{ '/images/posts/system-report.png' | absolute_url }}" alt="Device System report" />

### Applications

Show the information of the applications installed.

<img src="{{ '/images/posts/device-apps.png' | absolute_url }}" alt="Device applications" />

### Policies

Apply policies specifically to a single device.

<img src="{{ '/images/posts/device-policies.png' | absolute_url }}" alt="Main" />

### Geolocation

Show the current location of the device.

<img src="{{ '/images/posts/geolocate.png' | absolute_url }}" alt="Device Geolocation" />

### Danger Zone

<img src="{{ '/images/picto-warning.png' | absolute_url }}" alt="Warning:" height="16px"> Be sure of what you're doing here, once an action is taken there is no going back.

* <a name="ua"></a>Unenroll Device: the policies will be unapplied, however files and applications already deployed won't be removed, as the MDM Agent app. The device will be erased from the database.
* <a name="da"></a>Delete Device: force the deletion of the device from database, the policies will be unapplied, however files and applications already deployed won't be removed, as the MDM Agent app. This is in case the device is stolen or lost and therefore offline forever.
* Wipe: erase all data on the device.

<img src="{{ '/images/posts/danger-zone.png' | absolute_url }}" alt="Danger zone" />

## <a name="op"></a>Our Policies

The policies selected are sent in a JSON file to the MDM Agent with the values specified.

If the MDM Agent does not have the system privileges it will require the confirmation of the user to implement the policies.

### Disable

* Bluetooth: allows/forbids the use of Bluetooth.

   Values: Checked or Unchecked.
* Airplane mode: allows/forbids the use of the airplane mode.

   Values: Checked or Unchecked.
* Camera: allows/forbids the use of any camera on the phone.

   Values: Checked or Unchecked.
* Create VPN profiles: allows/forbids the use to create VPN profiles. Available for devices with Api equal to or greater than 25.

   Values: Checked or Unchecked.
* GPS: allows/forbids the use of the GPS.

   Values: Checked or Unchecked.
* Hotspot and tethering: allows/forbids to configure the device as hotspot or tethering.

   Values: Checked or Unchecked.
* Mobile line: allows/forbids the user to use the mobile line.

   Values: Checked or Unchecked.
* NFC: allows/forbids the use of the Near Field Communication.

    Values: Checked or Unchecked.
* Roaming: allows/forbids the use of Roaming. Available for devices with Api equal to or greater than 21.

   Values: Checked or Unchecked.
* Screen capture: allows/forbids the user to make a screen capture. Available for devices with Api equal to or greater than 21.

   Values: Checked or Unchecked.
* SMS and MMS: allows/forbids the user to send SMS and MMS.

   Values: Checked or Unchecked.
* Speakerphone: allows/forbids the user to use speakerphone.

   Values: Checked or Unchecked.
* Status bar: allows/forbids the user to use the status bar.

   Values: Checked or Unchecked.
* USB ADB: allows/forbids the user to use the Android Debug Bridge through USB.

   Values: Checked or Unchecked.
* USB MTP: allows/forbids the user to use the Media Transfer Protocol through USB.

   Values: Checked or Unchecked.
* USB PTP: allows/forbids the use of the Picture Transfer Protocol through USB.

   Values: Checked or Unchecked.
* Wifi: allows/forbids the user to connect to Wifi.

   Values: Checked or Unchecked.

### Password

* Maximum failed password attempts for wipe: sets the number of failed attempts to unlock the device before wiping it.

   Value: number of failed attempts.
* Maximum time to lock: the time in milisecond before to lock the device.

   Values: number of miliseconds.
* Minimum letters required in password: minimum number of letters required.

   Values: number of letters.
* Minimum lowercase letters required in password: minimum number of lowercase letters required.

   Values: number of lowercase letters.
* Minimum non-letter characters required in password: minimum number of non-letter characters required.

   Values: number of non-letter character.
* Minimum numerical digits required in password: minimum number of digits required.

   Values: number of digits.
* Minimum password length: minimum length.

   Values: number of minimun length.
* Minimum symbols required in password: minimum number of symbols required (@, %, =, &, \*, etc).

   Values: number of symbols.
* Minimum uppercase letters required in password: minimum uppercase letters.

   Values: number of uppercase letters.
* Password enabled: enables/disables the password, if enabled it will request the password creation.

   Values: Checked or Unchecked.
* Password quality: sets the complexity of the password.

   Values:

   * Unspecified: no complexity specified.
   * Something: requires a password but without a specific requirement.
   * Numeric: numbers only.
   * Alphabetic: letters only.
   * Alphanumeric: numbers and letters.
   * Complex: a combination of numbers, letters and symbols.
* Reset password: if a pasword is forgotten, it resets it to a new value.

   Values: the new password (string).

### Encryption

* Internal Storage encryption: encrypts the internal storage of the device.

   Values: Checked or Unchecked.
* Use TLS: allows/forbids to use TLS protocol.

   Values: Checked or Unchecked.

### Apps & Files

* Deploy application: installs the application.

   Value: The application.

    Remove: if set to Yes, when the policy is removed, it will also remove the app by adding Remove application policy.

* Deploy file: downloads a file.

   Values: the file.

    Copy to: specifies the path where the file will be downloaded.

    Remove: if set to Yes, when the policy is removed, it will also remove the file by adding Remove file policy.

* Remove application: uninstalls an application.

   Value: the id of the APK.

    Example: ``com.remove.app``.

* Remove file: removes a file from the device.

   Value: the name of the file with its format.

    Example: myfile.jpg

<img src="{{ '/images/picto-information.png' | absolute_url }}" alt="Important!" height="16px"/> The Apps & Files policies can be used as many times as the Administrator requires.

### Inventory

* Set an inventory frequency: set the frequency in which will be run the inventory.

   Values: number of minutes.
