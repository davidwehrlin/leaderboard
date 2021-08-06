# Leaderboard

Leaderboard is a basic full-stack CRUD (Create Read Update Delete) application, which holds leaderboard entries in a MongoDB instance. The main inspiration behind this project was to learn javascript and basic frontend development. So I decided to use React as the main frontend library and Express as the main backend library. The majority of my time was spent [here](https://reactjs.org/docs/getting-started.html) combing through the basics of React development. 

## Prerequisites

* [Node.js](https://nodejs.org/en/)

* npm
  ```sh
  npm install npm@latest -g
  ```
* MongoDB instance *Optional: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) 

## Installation

Create .env files in the client and server folders.
In the client .env add the server url(example below)
```bash
REACT_APP_SERVER_URL=http://localhost:9000/api/leaderboard
```
In the server .env add the MongoDB URI and the port (example below)
```bash
DB_URI=mongodb+srv://username:password@cluster0.4n5wx.mongodb.net/databasename?retryWrites=true&w=majority
PORT=9000
```

Use npm to install the node modules for Leaderboard. Then start the frontend and back end using npm start.

```bash
cd client
npm install
npm start
```
Open separate bash instance.
```bash
cd server
npm install
npm start
```

## License
[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
