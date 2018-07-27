---
layout: post
howtos: true
published: true
title: How it works
permalink: howtos/how-it-works-dk
description: Container's specifications
category: docker
---

## Docker Environment for Web MDM Dashboard

Docker is a tool that allows us to create an environment based in containers and work with several dependencies linked together.

### Containers

#### 1. Dashboard-Node

This container has the necessary dependencies to start the project in develop.

- Components:

<table class="zebra-style">
  <tbody>
  <tr>	   
     <th>Component</th>
     <th>Version Installed</th>
   </tr>
   <tr>
     <td style="width:150px"><a href="https://nodejs.org/en/" alt="NodeJS">NodeJS</a></td>
     <td>8.11.3</td>
   </tr>
   <tr>
     <td style="width:150px"><a href="https://yarnpkg.com/lang/en/" alt="Yarn">Yarn</a></td>
     <td>1.6.0</td>
   </tr>
   <tr>
     <td style="width:150px"><a href="https://curl.haxx.se/docs/manual.html" alt="Curl">Curl</a></td>
     <td>Latest</td>
   </tr>
   <tr>
     <td style="width:150px"><a href="https://www.nano-editor.org/" alt="Nano">Nano</a></td>
     <td>Latest</td>
   </tr>
   </tbody>
</table>

This contianer is based in the [official image of Node](https://hub.docker.com/_/node/).

#### 2. Dashboard-apache

This container has installed the necessary dependencies to build and execute the project in a web server.

- Components:

<table class="zebra-style">
  <tbody>
  <tr>	   
     <th>Component</th>
     <th>Version Installed</th>
   </tr>
   <tr>
     <td><a href="https://www.apache.org/" alt="Apache">Apache</a></td>
     <td>2.4.33</td>
   </tr>
   <tr>
     <td><a href="https://curl.haxx.se/docs/manual.html" alt="Curl">Curl</a></td>
     <td>Latest</td>
   </tr>
   <tr>
     <td><a href="https://www.nano-editor.org/" alt="Nano">Nano</a></td>
     <td>Latest</td>
   </tr>
   </tbody>
</table>

This contianer is based in the [official image of HTTPD](https://hub.docker.com/_/httpd/).

##### Network interface

This environment has a network defined to link the service containers. This network has a subnet *172.27.0.0/24* and its getway is 172.27.0.1.

We must verify the services running in these ports:

<table class="zebra-style">
  <tbody>
  <tr>	   
     <th>Port</th>
     <th>Used by</th>
   </tr>
   <tr>
     <td>8081</td>
     <td><a href="https://www.apache.org/" alt="Apache">Apache</a></td>
   </tr>
   <tr>
     <td>3000</td>
     <td><a href="https://nodejs.org/en/" alt="NodeJS">NodeJS</a></td>
   </tr>
   </tbody>
</table>

If your host machine has a service listening in some of these ports, you have to stop that service or change the port in the *.env* file that is in the docker root in the project, before the build process of the  docker environment.

<img src="{{ '/images/picto-warning.png' | absolute_url }}" alt="Important!" height="16px"/> If the *.env* file is edited, PLEASE DO NOT PUSH OF THIS CHANGE in the repository.