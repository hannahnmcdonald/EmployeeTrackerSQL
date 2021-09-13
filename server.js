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
    }, 
    console.log(`Connected to Employee Tracker Database.`)
);

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
            'Exit' ]
    }])
    .then(userInput)
    // TODO: Functions per userInput

    // viewDepts();
    // viewRoles();
    // viewEmployees();
    // addDept();
    // addRole();
    // addEmployee();
    // updateEmployee();
    // exitProgram();

};

viewDepts() {
    // Show dept names + Ids
};

viewRoles() {
    // Show job title, role id, department + salary
};

viewEmployees() {
    // Show employee id, first name, last name, job title, department, sallaries, + managers
};

addDept() {
    // Enter department name + adds to db
};

addRole() {
    // Enter role name, salary + department then adds to db
};

addEmployee() {
    // Enter employee id, first name, last name, salary, dept, + manager then add to db
}

updateEmployee() {
    // Enter new employee role, then add to db
}

exitProgram() {
    // Exit program
};
// Function to initialize application
init();


