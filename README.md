# TestED

Web application for taking exams online. 

## About

Originally made in PHP in 2018 as a school project, now turned into a personal project where I learn to make a full stack MEAN application.

## Setup guide

This app requires MongoDB database instance. Learn how to create/install one [here](https://docs.mongodb.com/manual/installation/)
Clone the app and run `npm i` to install all packages. 
Next, create a `.env` file where you need to declare some variables:

```
TOKEN_SECRET=[random string for token encription]
MONGO_DB=[mongodb database address] eg. mongodb://localhost:27017/testED
API_PORT=[port for the API]
NODE_ENV=[local or production]
```

Also, remember to modify Angular's enviroment file's api endpoint if you need to.

To run the app, first start the API server with `npm start:server` and then start the Agular app with `ng serve`.