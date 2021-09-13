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
const db = mysql.createConnection
    db.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
});

// const db = mysql.createConnection (
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: '',
//     },
//     console.info('Connected to Employee Tracker Database')
// );

// Port is listening
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);

function init() {

    // Prompt User
    inquirer.prompt(options)
    // TODO: Options
    
        // 'View all departments', 
        // 'View all roles', 
        // 'View all employees', 
        // 'Add a department', 
        // 'Add a role', 
        // 'Update employee role'
        // 'Quit'
    
    .then(userInput)
    // TODO: Functions per userInput

    // viewDepts();
    // viewRoles();
    // viewEmployees();
    // addDept();
    // addRole();
    // updateEmployee();
    // quitProgram();

};

init();
