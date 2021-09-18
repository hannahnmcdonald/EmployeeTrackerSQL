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
        if (err) {
            console.log(err)
        };
        printTable(res);
        init();
    })
};

function viewRoles() {
    // Expected Behavior: Show job title, role id, department + salary
    // console.log("Viewing all roles");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) {
            console.log(err)
        };
        printTable(res);
        init();
    })
};

function viewEmployees() {
    // Expected Behavior: Show employee id, first name, last name, job title, department, sallaries, + managers
    // console.log("Viewing employees");
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            console.log(err)
        };
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
    .then((userInput) => {
            let departmentName = userInput.departmentName;

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

function addRole() {
    // Expected Behavior: Enter role name, salary + department then add to db
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.log(err)}
            return inquirer.prompt([
                    {
                        type: "input",
                        name: "role",
                        message: "Enter a new role",
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "Enter the salary for this role",
                    },
                    {
                        type: "list",
                        name: "department",
                        message: "What department is this role in?",
                        choices: () => {
                            let departmentArray = [];
                            for (let i = 0; i < res.length; i++) {
                                departmentArray.push(res[i].department_name + " | " + res[i].id);
                    }
                    return departmentArray;
                },
            },
        ])
        .then(function (userInput) {
            let dept = userInput.department.split("|")[1];

            connection.query(
                `INSERT INTO employee (title, department_id, salary) VALUES ("${userInput.role}", ${dept}, "${userInput.salary}") `,
                (err) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(`"${userInput.role}" added successfully!`);
                    init();
                    }
                )
            })
        }
    )
};

function addEmployee() {
    // Expected Behavior: Enter employee id, first name, last name, salary, dept, + manager then add to db
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) {
            console.log(err)
        } else {
            return inquirer
            .prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Enter the employee's first name",
                // Validate to make sure answer is string
                    validate: (userInput) => {
                        if (userInput !== "") {
                            return true;
                        } else {
                    return "First name cannot be blank";
                        }
                    }
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Enter the employee's last name",
                // Validate to make sure answer is string
                    validate: (userInput) => {
                        if (userInput !== "") {
                            return true;
                        } else {
                        return "Last name cannot be blank";
                        }
                    }
                },
                {
                    type: "input",
                    name: "roleId",
                    message: "Enter the employee's role ID",
                // Validate to make sure answer is number
                    validate: (userInput) => {
                        if (userInput === isNaN) {
                            return "Employee role ID must be numerical";
                        } else {
                    return true; 
                        }
                    }
                },
                {
                    type: "input",
                    name: "managerId",
                    message: "Enter the employee's manager ID",
                // Validate to make sure answer is number
                    validate: (userInput) => {
                        if (userInput === isNaN) {
                            return "Manager ID must be numerical";
                        } else {
                    return true; 
                        }
                    }
                },
            ])
            .then(function (userInput) {
                connection.query(
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                    [userInput.firstName, userInput.lastName, userInput.roleId, userInput.managerId],
                    function (err, res) {
                        if (err) {
                            console.log (err)
                        } 
                        console.log(
                            `${userInput.firstName} ${userInput.lastName} has been added to the team!`
                        );
                    
                        console.log("Employee added successfully!");
                        // printTable(res);
                        init();
                    }
                )
            })
        }
    })
}

function updateEmployee() {
    // Expected Behavior: Enter new employee role, then add to db
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            console.log(err)
        } 
        return (
            inquirer
            .prompt([
                {
                    type: "list",
                    name: "employeeNames",
                    message: "Which employee do you want to update?",
                    choices: () => {
                        var employeeNames = [];
                            for (let i = 0; i < res.length; i++) {
                            employeeNames.push(res[i].first_name + " " + res[i].last_name);
                        }
                        return employeeNames;
                    },
                },
            ])
            .then((userInput) => {
                let fullName = userInput.employeeNames;
                let splitName = fullName.split(" ");

                connection.query("SELECT * FROM roles", (err, res) => {
                    inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "role",
                            message: "Which employee role would you like to update?",
                            choices: () => {
                                let roleArray = [];
                                for (let i = 0; i < res.length; i++) {
                                    roleArray.push(res[i].title + " | " + res[i].id);
                                }
                                return roleArray;
                            },
                        },
                    ])
                    .then((userInput) => {
                        let roleId = userInput.role.split("|")[1];
                        connection.query(`UPDATE employee SET role_id = "${roleId}" WHERE first_name = "${splitName[0]}" and last_name = "${splitName[1]}"`, (err, res) => {
                            if (err) {
                                console.log(err)
                            }
                            console.log(`${splitName} role updated successfully!`)
                            init();
                        })
                    })
                })
            })
        )
    })
};
