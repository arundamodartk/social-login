# Social Login (Passportjs strategies) #
This is an application to demonstrate the social login using [**Passportjs**](http://www.passportjs.org/) strategies. This application is build using ExpressJS framework on NodeJs runtime environment using create-express-app.

## Requirements
For development, you will only need Node.js and a node global package, npm,
installed in your environment.

## Project Setup / Installation
Clone the project code.  
Run `cd social-login` to move to project folder in terminal.  
Run `npm install` to install all dependencies.  
Set up a mongoDB database and keep the connection url in the env file on your home directory.  

## Running the project
Run `npm start` to run the project and access it via browser on localhost:3000

## Change Log
All notable changes to this project will be documented here.

#### [1.0.0] 09-05-2020
##### Added
- Done initial express server setup and mongoDB connection setup.
- Developed client side views using EJS
- Implemented passportJs local strategy for signup and login
- Used session and cookies
- Refactored the code for incorporating other PassportJs strategies.
