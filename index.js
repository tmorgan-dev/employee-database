// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, 
// add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for 
// that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, 
// last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the 
// database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is 
// added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated 
// in the database

const inquirer = require("inquirer")
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_db',
    password: 'Ba7$$aij8fdE5bH',
})

const mainMenu = [
    {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: ["view_all_departments", "view_all_roles", "view_all_employees", "add_a_department", "add_a_role", "add_an_employee", "update_an_employee_role"],
    },
];

const addADepartment = [
    {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department?",
    },
];

// const addRole = [
//     {
//         type: "input",
//         name: "newRole",
//         message: "What is the name of the new role?",
//     },
//     {
//         type: "input",
//         name: "newSalary",
//         message: "What is the salary of the role?",
//     },
//     {
//         type: "list",
//         name: "selectDepartment",
//         message: "Which department does the role belong to?",
//         choices: [],
//     },
// ];

// const addEmployee = [
//     {
//         type: "input",
//         name: "newFirstName",
//         message: "What is the employee's first name?",
//     },
//     {
//         type: "input",
//         name: "newLastName",
//         message: "What is the employee's last name?",
//     },
//     {
//         type: "list",
//         name: "selectRole",
//         message: "What is the employee's role?",
//         choices: [],
//     },
//     {
//         type: "list",
//         name: "selectManager",
//         message: "Who is the employee's manager?",
//         choices: [],
//     },
// ];

const updateRole = [
    {
        type: "list",
        name: "select employee",
        message: "Which employee's role do you want to update?",
        choices: [],
    },
    {
        type: "list",
        name: "select role",
        message: "Which role do you want to assign to the selected employee?",
        choices: [],
    },
];

init();
function init() {
    console.log("Employee Database")
    inquirer
        .prompt(mainMenu)
        .then((answers) => {
            let options = answers.mainMenu
            switch (options) {
                case "view_all_departments":
                    viewDepartments()
                    break;
                case "view_all_roles":
                    viewRoles()
                    break;
                case "view_all_employees":
                    viewEmployees()
                    break;
                case "add_a_department":
                    addDepartment()
                    break;
                case "add_a_role":
                    addRole()
                    break;
                case "add_an_employee":
                    addEmployee()
                    break;
                case "update_an_employee_role":
                    updateRole()
                    break;
            }
        })

        .catch((error) => {
            if (error.isTtyError) {
            } else {
            }
        });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        err ? console.log(err) : console.table(res), init()
    })
}

function viewRoles() {
    connection.query("SELECT * FROM role", (err, res) => {
        err ? console.log(err) : console.table(res), init()
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, res) => {
        err ? console.log(err) : console.table(res), init()
    })
}

function addDepartment() {
    inquirer.prompt(addADepartment).then((answers) => {
        let departmentName = answers.newDepartment
        connection.query(`INSERT INTO department (name) VALUES ("${departmentName}")`, (err, res) => {
            err ? console.log(err) : viewDepartments(), init()
        })
    })
}

function addRole() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.log(err)
            init()
        }
        const departments = res.map((department) => ({
            value: department.id,
            name: department.name,
        }))
        inquirer.prompt([
            {
                type: "input",
                name: "newRole",
                message: "What is the name of the new role?",
            },
            {
                type: "input",
                name: "newSalary",
                message: "What is the salary of the role?",
            },
            {
                type: "list",
                name: "selectDepartment",
                message: "Which department does the role belong to?",
                choices: departments,
            },
        ])
            .then((answers) => {
                let chosenDepartment = answers.selectDepartment;
                let chosenRole = answers.newRole;
                let choseSalary = answers.newSalary;

                connection.query(`INSERT INTO role 
                (title, salary, department_id)
                VALUES 
                ("${chosenRole}", "${choseSalary}", "${chosenDepartment}")
            `, (err, res) => {
                    err ? console.log(err) : viewRoles(), init()
                })
            })
    })
}

function addEmployee() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) {
            console.log(err); init()
        }
        const roleList = res.map((role) => ({
            value: role.id,
            name: role.title,

        }))
        inquirer.prompt([
            {
                type: "input",
                name: "newFirstName",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "newLastName",
                message: "What is the employee's last name?",
            },
            {
                type: "list",
                name: "selectRole",
                message: "What is the employee's role?",
                choices: roleList,
            },
        ])
            .then((answers) => {
                let chosenRole = answers.selectRole;
                let employeeFirst = answers.newFirstName;
                let employeeLast = answers.newLastName;

                connection.query(`INSERT INTO employee
                (first_name, last_name, role_id)
                values
                ("${employeeFirst}", "${employeeLast}", "${chosenRole}")
            `, (err, res) => {
                    err ? console.log(err) : viewEmployees(), init()
                })
            })

    })
}