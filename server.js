// Requirements
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Initialize App w/Express
const app = express();

// Create Port
const PORT = process.env.PORT || 3001;

// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Connects to database + .env for password privacy
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: PORT
    }
);

connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to Employee Tracker")
    }
    // Calls Starting Fx
    init();
})

// Init fx
function init() {
    // Prompt User w/Inquirer package
    inquirer.prompt([{
    // Options to begin program
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices : [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add employee',
            'Update employee role',
            'Exit' 
        ]}
    ]).then((userInput) => {
        switch(userInput.options) {
            // Calls viewDept function
            case 'View all departments': viewDepts();
            // console.log('View departments')
            break;
            // Calls viewRoles function
            case 'View all roles': viewRoles();
            // console.log('View roles')
            break;
            // Calls viewEmployees function
            case 'View all employees': viewEmployees();
            // console.log('View employees')
            break;
            // Calls addDept function
            case 'Add a department': addDept();
            // console.log('Add department')
            break;
            // Calls addRole function
            case 'Add a role': addRole();
            // console.log('Add role')
            break;
            // Calls addEmployee function
            case 'Add employee': addEmployee();
            // console.log('Add employee')
            break;
            // Calls updateEmployee function
            case 'Update employee role': updateEmployee();
            // console.log('Update employee role')
            break;
            // Calls exitProgram function
            case 'Exit': exitProgram();
            // console.log('You have exited the program')
            break;

        }
    })
    
};

function viewDepts() {
    // Show dept names + Ids
    db.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.log(err)
        }
        // console.log("Viewing all departments");
        console.table(res);
        init();
    })
};

function viewRoles() {
    // Show job title, role id, department + salary
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) {
            console.log(err)
        }
        // console.log("Viewing all roles");
        console.table(res);
        init();
    })
};

function viewEmployees() {
    // Show employee id, first name, last name, job title, department, sallaries, + managers
    db.query('SELECT * FROM employees', (err, res) => {
        if (err) {
            console.log(err)
        }
        // console.log("Viewing all employees");
        console.table(res);
        init();
    })
};

function addDept() {
    // Enter department name + adds to db
};

function addRole() {
    // Enter role name, salary + department then adds to db
};

function addEmployee() {
    // Enter employee id, first name, last name, salary, dept, + manager then add to db
}

function updateEmployee() {
    // Enter new employee role, then add to db
}

function exitProgram() {
    // Exit program
};
