# TestED

Web application for taking exams online. 

## About

Originally made in PHP in 2018 as a school project, now turned into a personal project where I learn to make a full stack MEAN application.

## Requirements

 - NPM
 - Node.js
 - Angular CLI
 - MongoDB instance (local or cloud)

## Setup guide

This app requires MongoDB database instance. Learn how to create/install one [here](https://docs.mongodb.com/manual/installation/)
Clone the app and run `npm i` to install all packages. 
Next, create a `.env` file where you need to declare some variables:

```
TOKEN_SECRET=[random string for token encription]
MONGO_DB=[mongodb database address eg. 'mongodb://{username}:{password}@localhost:27017/testED']
API_PORT=[port for the API]
NODE_ENV=[local or production]
CORS_ORIGIN=[angular server origin eg. 'http://localhost:4200']
```

Also, remember to modify Angular's enviroment file's api endpoint if you need to.

To run the app, first start the API server with `npm run start:server` and then start the Agular app with `ng serve`.

## Contributions

If you have found this reposetory and wish to contribute, first of all.. Thank you! 
Since this is a personal project, I'm mainly looking for people telling me my short falls and maybe some bad practises so I can improve as I develop.
You can look at the project roadmap and see some features I'm working on and provide feedback.