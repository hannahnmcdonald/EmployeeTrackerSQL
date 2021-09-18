# EmployeeTrackerSQL

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

A simple employee tracker application run in the command line made from MySQL, npm Inquirer, and Node.js.

## User Story
 
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business


```

## Acceptance Criteria 

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

```

## Table of Contents
1. [Video](##Video)
2. [Technologies](##Technologies)
3. [Installation/Usage](##Installation/Usage)
4. [License](##License)
5. [Contributing](##Contributing)
6. [Questions](##Questions)


## Video




## Technologies

* Node.js
* express js
* npm Inquirer
* npm Console-Table-Printer
* MySQL

## Installation/Usage

If you run this application locally you will need to clone it from this repo then run the following commands/install dependencies

```
npm install
npm install express
npm install mysql2
npm install console-table-printer --save
npm install dotenv
npm start
```

The application will begin after npm start command and you will be presented with the home page via localhost:3306. You will need to put your MySQL log in info in a .env file to run this.

## License

This repository is under the MIT License.

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Contributing

1. Fork the repo from Github
2. Clone the repo locally
3. Commit your changes
4. Push to your branch
5. Open a Pull request for review

## Questions?

Contact me at hannahcodes@protonmail.com 📫

