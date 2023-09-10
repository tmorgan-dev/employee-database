// Sets up Inquirer and MySQL2
const inquirer = require("inquirer")
const mysql = require('mysql2')

// Uses MySQL2 to connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_db',
    password: 'Ba7$$aij8fdE5bH',
})

// Inquirer questions for the main menu and sub tasks
const mainMenu = [
    {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"],
    },
];

const addADepartment = [
    {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department?",
    },
];

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

// Initial function for main menu
init();
function init() {
    console.log("Employee Database")
    inquirer
        .prompt(mainMenu)
        .then((answers) => {
            let options = answers.mainMenu
            switch (options) {
                case "View all departments":
                    viewDepartments()
                    break;
                case "View All Roles":
                    viewRoles()
                    break;
                case "View All Employees":
                    viewEmployees()
                    break;
                case "Add Department":
                    addDepartment()
                    break;
                case "Add Role":
                    addRole()
                    break;
                case "Add Employee":
                    addEmployee()
                    break;
                case "Update Employee Role":
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

// Function to view Departments
function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        err ? console.log(err) : console.table(res), init()
    })
}

// Function to view roles
function viewRoles() {
    connection.query("SELECT * FROM role", (err, res) => {
        err ? console.log(err) : console.table(res), init()
    })
}

// Function to view employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, res) => {
        err ? console.log(err) : console.table(res), init()
    })
}

// Function to add department
function addDepartment() {
    inquirer.prompt(addADepartment).then((answers) => {
        let departmentName = answers.newDepartment
        connection.query(`INSERT INTO department (name) VALUES ("${departmentName}")`, (err, res) => {
            err ? console.log(err) : viewDepartments(), init()
        })
    })
}

// Function to add a role to the database
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
                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${chosenRole}", "${choseSalary}", "${chosenDepartment}")`, (err, res) => {
                    err ? console.log(err) : viewRoles(), init()
                })
            })
    })
}

// Function to add employees to the database
function addEmployee() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) {
            console.log(err); init()
        }
        const roleList = res.map((role) => ({
            value: role.id,
            name: role.title,
        }))
        connection.query("SELECT * FROM employee", (err, res) => {
            if (err) {
                console.log(err); init()
            }
            const employeeList = res.map((employee) => ({
                value: employee.id,
                name: employee.first_name,
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
                {
                    type: "list",
                    name: "selectManager",
                    message: "Who is the employee's manager?",
                    choices: employeeList,
                },
            ])
                .then((answers) => {
                    let chosenRole = answers.selectRole;
                    let employeeFirst = answers.newFirstName;
                    let employeeLast = answers.newLastName;
                    let chosenEmployee = answers.selectManager;
                    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employeeFirst}", "${employeeLast}", "${chosenRole}", "${chosenEmployee}")`, (err, res) => {
                        err ? console.log(err) : viewEmployees(), init()
                    })
                })
        })
    })
}