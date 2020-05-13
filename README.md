# Social Login (Passportjs strategies) #
This is an application to demonstrate the social login using [**Passportjs**](http://www.passportjs.org/) strategies. This application is build using ExpressJS framework on NodeJs runtime environment using create-express-app.

## Screenshots

![Login page screenshot](/images/Screenshot1.png?raw=true "Login screen")


## Requirements
- For development, you will need Node.js and a node global package, npm, installed in your environment.
- A mongoDB database.
- For google strategy, 
- - Go to https://console.developers.google.com/
- - Create a project
- - After project has been created, Select library in left menu of Google APIs, Search Google+ API and enable it
- - Select OAuth consent screen in left menu of Google APIs
- - Configure Oauth credentials by specifying application type, name, origin url from which the API call will be initiated, and redirect url.
- - You'll get the client ID and client secret and update it in env file to continue.

### Passport Google strategy (Understanding the implementation flow)
- Keep the clientId and client secret in env file
- Install `passport-google-oauth20` package and create a new Strategy object.
- using that, specify the clientID, clientSecret, callbackURL to be redirected after google consent screen.
- create a route to handle google signin which should be called from sign in with google button. In that route, call `passport.authenticate('google', {scope: ['profile']})` along with the required scopes in options.
- create another route which is specified as the callbackURL in google strategy and redirectURL specified in google consent screen configuration. In that again call `passport.authenticate('google')` to execute the callback function in the Passport Google strategy. (Passportjs will fetch the authorization code from the url and exchange with google to get the authentication token and return the profile). In the callback function of Google strategy, you'll get the profile.
- Once you call the done callback there, it will serialize the user and save it in session and reach next callback function written in the callback url definition, there by you can redirect to '/user/dashboard'
- On logout, req.logout will execute the deserialize function and remove the data from session.

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
