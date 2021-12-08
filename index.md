# uRP Framework - Documentation

Welcome! uRP Framework is a project in development that utilizes the alt:V platform, our goal is to create an easy to work framework serving as a quickstart to build roleplay servers.

## Getting started

### Pre-requisites

In order to run this framework you will need a mySQL server installed on your machine, the .NET 5.0 SDK and node.js (we use LTS version)

### Installation

First of all go to https://altv.mp/#/downloads and dowload server files, marking the following boxes:
- Data files
- JS module
- C# Module

After that clone or download the resources folder from our repository and put togheter with the alt:V server files
Then create a server.cfg file and put the following informations

```
name: 'server name'
host: 0.0.0.0
port: 7788
players: 128
#password: ultra-password
announce: false
#token: YOUR_TOKEN
gamemode: Freeroam
website: example.com
language: en
description: 'alt:V Sample Server'
modules: [  'csharp-module', 'js-module'  ]
debug: 'true'
resources: [
    'mysql2-wrapper',
    'entity-sync',
    # 'urp-logs',
    'urp-notify',
    'urp-chat',
    'urp-hud',
    'urp-core',
    'urp-character-creator',
    'time-weather-sync',
    # 'test-resource',
    'urp-inventory',
    'urp-consumables-example'
]
mysql_connection_string: 'mysql://user:password@localhost/database?charset=utf8mb4'
mysql_debug: 'false'
```
If you have any questions please meet us in <a href="https://discord.gg/aJmSz8v9w4">Discord</a>
