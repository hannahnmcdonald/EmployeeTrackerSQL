// Requirements
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Initialize App
const app = express();

// Create Port
const PORT = process.env.PORT || 3001;

// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Imports db info from .env for password privacy
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})

// Port is listening
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);

function init() {

    // Prompt User
    inquirer.prompt()
    // TODO: Questions

    .then(userInput)
    // TODO: Functions per userInput
};

init();
