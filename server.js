// Requirements
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printTable } = require('console-table-printer');
require('dotenv').config();

// Initialize App w/Express
const app = express();

// Create Port
const PORT = process.env.PORT || 3306;

// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Connects to database + .env for password privacy
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASS,
        port: PORT,
        database: "employees",
        // Added connectTimeout due to frequent ._handleTimeoutError
        connectTimeout: 300000
    },
    console.log("Connected to Employee Tracker")
);


// Check for connection errors
connection.connect(function (err) {
    if (err) {
        console.log("unable to connect")
    };
    console.log('Connected to Employee Database');
    init();
});

// Init fx
function init(connection) {
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
            case ('View all departments'): viewDepts();
            // console.log('View departments')
            break;
            // Calls viewRoles function
            case ('View all roles'): viewRoles();
            // console.log('View roles')
            break;
            // Calls viewEmployees function
            case ('View all employees'): viewEmployees();
            // console.log('View employees')
            break;
            // Calls addDept function
            case ('Add a department'): addDept();
            // console.log('Add department')
            break;
            // Calls addRole function
            case ('Add a role'): addRole();
            // console.log('Add role')
            break;
            // Calls addEmployee function
            case ("Add employee"): addEmployee();
            // console.log('Add employee')
            break;
            // Calls updateEmployee function
            case ('Update employee role'): updateEmployee();
            // console.log('Update employee role')
            break;
            // Calls exitProgram function
            case ('Exit'): 
            console.log('You have exited the program')
            connection.end();

        }
    })
    
};


function viewDepts() {
    // Expected Behavior: Show dept names + Ids
    // console.log("Viewing all departments");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        printTable(res);
        init();
    })
};

function viewRoles() {
    // Expected Behavior: Show job title, role id, department + salary
    // console.log("Viewing all roles");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        printTable(res);
        init();
    })
};

function viewEmployees() {
    // Expected Behavior: Show employee id, first name, last name, job title, department, sallaries, + managers
    // console.log("Viewing employees");
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        // console.log("Viewing all employees");
        printTable(res);
        init();
    })
};

function addDept() {
    // Expected Behavior: Enter department name + add to db
    inquirer.prompt({
        type: "input",
        name: "departmentName",
        message: "What is the new department name?",
    })
    .then((answer) => {
            let departmentName = answer.departmentName;

            connection.query(
            `INSERT INTO department (department_name) VALUES ("${departmentName}")`,
            (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.log(`${departmentName} has been added to departments!`);
            }
        );

        init();
    })
};

// function addRole() {
//     // Expected Behavior: Enter role name, salary + department then add to db
//     connection.query("SELECT * FROM department", (err, res) => {
//         if (err) {
//             console.log(err)
//         } else {
//             return inquirer.prompt([
//                 {
//                     type: "input",
//                     name: "role",
//                     message: "Enter a new role",
//                 },
//                 {
//                     type: "input",
//                     name: "salary",
//                     message: "Enter the salary for this role",
//                 },
//                 {
//                     type: "list",
//                     name: "department",
//                     message: "What department is this role in?",
//                     choices: () => {
//                         let departmentArray = [];
//                         for (let i = 0; i < res.length; i++) {
//                             departmentArray.push(res[i].dept_name + " | " + res[i].id);
//                         }
//                         return departmentArray;
//                     },
//                 },
//             ])
//             .then(function (choice) {
//                 let dept = choice.department.split("|")[i];

//                 connection.query(
//                     `INSERT INTO employee (title, department_id, salary) VALUES ("${choice.role}", ${dept}, "${choice.salary}") `,

//                     (err) => {
//                         if (err) {
//                             console.log(err)
//                         }
//                     console.log(`"${choice.role}" added successfully!`);
//                     init();
//                     }
//                 )
//             })
//         }
//     })
// };

// function addEmployee() {
//     // Expected Behavior: Enter employee id, first name, last name, salary, dept, + manager then add to db
//     connection.query('SELECT FROM roles', (err, res) => {
//         if (err) {
//             console.log(err)
//         } else {
//             return inquirer.prompt([
//                 {
//                     type: "input",
//                     name: "firstName",
//                     message: "Enter the employee's first name",
//                     validate: (answer) => {
//                         if (answer !== "") {
//                             return true;
//                         } else {
//                     return "First name cannot be blank";
//                         }
//                     }
//                 },
//                 {
//                     type: "input",
//                     name: "lastName",
//                     message: "Enter the employee's last name",
//                     validate: (answer) => {
//                         if (answer === "") {
//                             return true;
//                         } else {
//                     return "Last name cannot be blank";
//                         }
//                     }
//                 },
//                 {
//                     type: "input",
//                     name: "roleId",
//                     message: "Enter the employee's role ID",
//                     validate: (answer) => {
//                         if (answer === isNaN) {
//                             return "Employee role ID must be numerical";
//                         } else {
//                     return true; 
//                         }
//                     }
//                 },
//                 {
//                     type: "input",
//                     name: "managerId",
//                     message: "Enter the employee's manager ID",
//                     validate: (answer) => {
//                         if (answer === isNaN) {
//                             return "Manager ID must be numerical";
//                         } else {
//                     return true; 
//                         }
//                     }
//                 },
//             ])
//             .then(function (answer) {
//                 connection.query(
//                     "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
//                     [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
//                     function (err, res) {
//                         if (err) {
//                             console.log (err)
//                         } 
//                         console.log(
//                             `${answer.firstName} ${answer.lastName} has been added to the team!`
//                         );
                    
//                         console.log("Employee added successfully!");
//                         init();
//                     }
//                 )
//             })
//         }
//     })
// }

// function updateEmployee() {
//     // Expected Behavior: Enter new employee role, then add to db

// }
