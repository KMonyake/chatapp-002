# Chat app
This is a simple chat app that will allow users to send messages to each for free.

## System Architecture
#### Tech stack:  MERN
* Mongodb
* Express
* React JS
* Node JS

I will be using a distrubted architecture as I will be building the back-end based off the feedback I receive from the front-end and vice versa.
This will ensure that the app is built consistently and no adjustments will be required. 

#### Deployment
The app will be deployed on heroku as it is free and very reliable.\
Heroku also supports SPAs that come with their own server code. 

## System requirements specification

#### Development
* I will be using create react app as it can easily create all the boilerplate code and configuration needed to build a react application.

* As for styling,I will use regular, vanilla css as I feel I have gained enough skills to personlize the look and feel of the app.

#### Functionality
* Users should be able to sign up and create an account.
* Users should be able to read and write data, in this case messages.
* Messages must be exchanaged in real-time.

#### Comparisons
The app is a chat application similar to whatsapp, but it does not make use of many of whatsapp's features, which makes it much simpler to develop.

The app does not need alot of functionality as this is not meant to compete with the likes of Whatsapp.\
The only requiremnts are:
* Users can sign up for an account.
* Users can see who else has an account on the platform.
* Users can see who else is online at the same time.
* Users can send each other messages.

## How to use the app:
* login or register for an account
* select a user to message
* send a message
* users may occasionally need to reload the app as mongodb is not a real-time database.

## How to install locally 
* users will need to get the got from github via a git clone or zip dowload
* users will need to get a mongodb account and hook up their own database
* add your mongodb database api key in the index.js file and you're good to go.

## Security
* The app uses jsonwebtokens (jwt) to authenticate any requests sent to the server, this enforces maximum security.
* The app also makes use of a dotenv file to keep api keys secure.

## Deployment
The app will be deplyed on netlify and heroku, heroku supports express servers, and netlify will handle our front-end.
Link: https://chatapp-002.netlify.app/
