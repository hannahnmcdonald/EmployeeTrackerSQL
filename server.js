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
    // Initializes main prompt fx to begin application
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
        }
    })
    
};


function viewDepts() {
    // Expected Behavior: Show dept names + Ids
    // TEST: console.log("Viewing all departments");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) {
            console.log(err)
        };
        // Using Print-Console-Table npm package to view results
        printTable(res);
        // Initializes main prompt function
        init();
    })
};

function viewRoles() {
    // Expected Behavior: Show job title, role id, department + salary
    // TEST: console.log("Viewing all roles");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) {
            console.log(err)
        };
        // Using Print-Console-Table npm package to view results
        printTable(res);
        // Initializes main prompt function
        init();
    })
};

function viewEmployees() {
    // Expected Behavior: Show employee id, first name, last name, job title, department, sallaries, + managers
    // TEST: console.log("Viewing employees");
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            console.log(err)
        };
        // Using Print-Console-Table npm package to view results
        printTable(res);
        // Initializes main prompt function
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

            connection.query(`INSERT INTO department (department_name) VALUES ("${departmentName}")`, (err, res) => {
                // Console logs if error occurs
                if (err) {
                    console.log(err);
                }
                console.log(`${departmentName} has been added to departments!`);
            }
        );
        // Returns to main prompt fx
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
                            // Creates an array from the department table data from the mysql query
                            for (let i = 0; i < res.length; i++) {
                            // Pushes department name & Id
                            departmentArray.push(res[i].department_name + " | " + res[i].id);
                    }
                    return departmentArray;
                },
            },
        ])
        .then(function (userInput) {
            // Splits dept
            let dept = userInput.department.split("|")[1];
            connection.query(`INSERT INTO role (title, department_id, salary) VALUES ("${userInput.role}", ${dept}, "${userInput.salary}") `, (err, res) => {
                // Console logs error
                    if (err) {
                        console.log(err)
                    }
                    console.log(`"${userInput.role}" role added successfully!`);
                    // Returns to main prompt fx
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
                    // Validate to make sure answer is not blank
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
                    // Validate to make sure answer is not blank
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
                // Inserts new userInput data into employee table
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [userInput.firstName, userInput.lastName, userInput.roleId, userInput.managerId],(err, res) => {
                        // Console Logs error if there is one
                        if (err) {
                            console.log (err)
                        } 
                        // Console Logs that task has been completed
                        console.log(`${userInput.firstName} ${userInput.lastName} has been added to the team!`);
                        // Return to main prompt function
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
        // Console Logs error if there is one
        if (err) {
            console.log(err)
        };
        return (
          inquirer
            //   Prompt asks who's role you would like to update
            .prompt([
              {
                type: "list",
                name: "name",
                message: "Whose role are you updating?",
                choices: () => {
                  let employeeArray = [];
                  //Creates array of employees from the result of the mysql query for the employee table
                  for (let i = 0; i < res.length; i++) {
                    //   Pushes the first name and last name from the array
                    employeeArray.push(res[i].first_name + " " + res[i].last_name);
                  }
                  return employeeArray;
                },
              },
            ])
            .then((userInput) => {
            // Combine first name + last name
              let fullName = userInput.name;
              console.log(fullName);
              connection.query("SELECT * FROM role", (err, res) => {
                inquirer
                // Prompt asks what role you would like to assign
                  .prompt([
                    {
                      type: "list",
                      name: "role",
                      message: `What role would you like to assign to ${fullName}?`,
                      choices: () => {
                        let roleArray = [];
                        // Role Array created from the result of the mysql query for the role table
                        for (let i = 0; i < res.length; i++) {
                            // Pushes the role title & ID from the array
                          roleArray.push(res[i].title + " | " + res[i].id);
                        }
                        console.log();
                        return roleArray;
                      },
                    },
                  ])
                  .then((userInput) => {
                    // This splits the employee and the role
                    let roleId = userInput.role.split("|")[1];
                    // Updates the DB with the role- uses the indexes of fullName for first/last name
                    connection.query(`UPDATE employee SET role_id = "${roleId}" WHERE first_name = "${fullName[0]}" and last_name = "${fullName[1]}"`, (err, res) => {
                        if (err) {
                            console.log(err)
                        };
                        console.log(`${fullName} role changed successfully`);
                        // Returns to main questions prompt
                        init();
                            }
                        );
                    });
                });
            })
        );
    });
};




