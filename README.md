

# Bare-Minimum   Travel with Friends

Travel App was created to support you and your friends to organize and share details of your next trip. The app allows you to plan and store all the details related:
 - where you are going
 - for how long
 - details of lodging
Once the basic details of the trip are created you can invite your friends to join. At that point everyone will have access to the trip dashboard that has all the relevant information and a map of the location where you are going. 
In addition to that everyone can add landmarks that they are interested in visiting and the trip members can vote, creating an interactive way to select what to do during the trip. Also users can share the expenses of the trip so everyone can keep track of budget. 

Future Features (User Stories) to Implement:
 - Trip creator can 'close' a trip which will move the trip from 'active trips' to 'old trips'
 - Upon closing the trip, expenses are divided evenly among trip members and trip members are notified of how much they owe (and to whom)
 - Notifications Log will be a new component in Dashboard which will have a log of all new activites (when user changes trip details, new user joins, new landmark added, new expense added etc)
 - Users can add landmarks into different categories (Tourist Attractions, Restaurants etc)
 - When Users create a new Landmark, a pin/flag with Landmark details is added to the Map on dashboard
 - When Trip is created, a house pin is added to the map dashboard
 - Users can view all trip members current locations on map (use current location browser info)
 - When Users log in, passwords/login information are secure-- implement authentication strategy (utilize encryption/hashing/salt)
 - Trip members can edit a calendar together to work out trip itinerary
 - Users can post photos to be shared among all trip members


## Team

  - Daniel Dai
  - Christie Villanueva
  - Justin Kwok
  - Lara Ismael

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Installing Dependencies](#installing-dependencies)
5. [Roadmap](#roadmap)
6. [Contributing](#contributing)

## Usage

Development environment setup:
 - create database: 'travelapp' in MYSQL
 - enter database information in '.env.development' file (username/password)
 - enter other server information into '.env.development' (local host address, port number)
 - start webpack with 'npm run react-dev'
 - start server with 'npm run server-dev'
 - server start up may have a few errors (foreign key errors) the first time when database being created. Kill the server and restart until errors are cleared.

Deployment directions:
*note, due to MAPBOX automatic deployment from github master does not work*

 - Set up HEROKU account and add JAWSDB MYSQL plugin
 - in Heroku "Settings", input 'Config Vars' as follows:
	- DB_HOST: JAWSDB Hostname
	- DB_NAME: JAWSDB database name (get from typing 'show database' in databite)
	- DB_PASS: JAWSDB password
	- DB_PORT: JAWSDB port
	- DB_USER: JAWSDB username
	- HOSTNAME: URL of Heroku host, eg. 'https://bm-travel-with-friends.herokuapp.com/'
	- NODE_ENV: 'staging' (for staging); 'production' (for production)
	- NPM_CONFIG_PRODUCTION: 'false'
 - remove webpack bundles from gitignore ('.bundle.js')
 - compile webpack with this command: 'NODE_ENV=staging webpack --config ./webpack.config.js --progress' (replace 'staging' with 'production' as needed)
 - git add/commit
 - git push to staging or production heroku remote

## Requirements

- body-parser ^1.18.2
- bootstrap ^3.3.7
- connect-session-sequelize ^4.1.0
- dotenv ^4.0.0 
- express ^4.15.5 
- express-session ^1.15.6
- install ^0.10.1
- jquery ^3.2.1
- mapbox-gl ^0.40.1
- mapbox-gl-geocoder ^2.0.1
- mysql ^2.14.1
- npm ^5.4.2
- passport ^0.4.0
- passport-loca ^1.0.0
- react ^16.0.0
- react-bootstrap ^0.31.3 
- react-dom ^16.0.0 
- react-popup ^0.8.0 
- react-redux ^5.0.6
- redux ^3.7.2 
- request ^2.83.0
- rimraf ^2.6.2
- sequelize ^3.24.5
- webpack ^3.6.0

## Development

- babel-core ^6.26.0
- babel-loader ^7.1.2
- babel-preset-es2015 ^6.24.1 
- babel-preset-react ^6.24.1 
- chai ^4.1.2 
- css-loader ^0.28.7
- file-loader ^1.1.5
- mocha ^3.5.3
- node-mocks-http ^1.6.5
- style-loader ^0.19.0 
- url-loader ^0.6.2 

## Installing Dependencies

From within the root directory:

npm install
npm run react-dev
npm run server-dev

### Roadmap

[https://docs.google.com/spreadsheets/d/1c627geyJ2ctmy1hk9XnM5NAXOaUEFloZMr5bHwCRjoU/edit?ts=59cc1a0f#gid=0](LINK_TO_DOC)


## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md)