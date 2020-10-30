const inquirer = require("inquirer");
const { connect } = require("./connections");
const { connection } = require("./db");
const db = require("./db");
require("console.table");

const figlet = require('figlet');
figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log("\n============================")
    console.log(data)
    console.log("\n============================\n\n\n\n\n\n")
    init();
});

const initQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "Add department",
      "Add employee",
      "Add new role",
      "Remove employee",
      "Update employee by role",
      "I am done", // connection.end
    ],
    name: "choices",
  },
];

function init() {
  inquirer.prompt(initQuestions).then((answers) => {
    switch (answers.choices) {
      case "View all employees":
        return viewAllEmployees();

      case "View all departments":
        return viewAllByDepartment();

      case "View all roles":
        return viewAllRoles();

      case "Add department":
        return addDepartment();

      case "Add employee":
        return addEmployee();

      case "Add new role":
        return addRole();  

      case "Remove employee":
        removeEmployee();
        break;

      case "Update employee by role":
        updateEmployeeByRole();
        break;
 
      default:
        iAmDone();
        console.log("Done");
      // connection.done();
      //come back and finish switch/case
    }
  });
}

async function viewAllEmployees() {
  var employees = await db.seeAllEmployees();
  console.table(employees);
  init();
}

async function viewAllByDepartment() {
  var employees = await db.seeAllDepartment();
  console.table(employees);
  init();
}

async function viewAllRoles() {
  const view = await db.seeAllRoles();
  console.table(view);
  init();
}



function addEmployee() {
  inquirer.prompt([
   {
     type: "input",
     message: "What is the first name of the employee?",
     name: "firstName",
   },
   {
     type: "input",
     message: "What is the last name of the employee?",
     name: "lastName",
   },
   {
     type: "input",
     message: "What is your role id?",
     name: "roleId"
   },
 ]).then(answers => {
  const employees = {
   first_name : answers.firstName,
   last_name : answers.lastName,
   role_id : answers.roleId
  } 
   db.createEmployee(employees) 
   init();
 })
}

function addRole() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter a role title",
        name: "title",
      },
      {
        type: "input",
        message: "Please enter a salary for this role",
        name: "salary",
      },
      {
        type: "input",
        message: "Enter a department ID?",
        name: "department",
      },
    ])
    .then((answers) => {
      const data = {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.department,
      };
      db.createRole(data);
      console.log("Employee added");
      console.log(data);
      init();
    });
}

async function updateEmployeeByRole() {
  const employees = await db.seeAllEmployees();
  var employeeChoices = employees.map(({id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }))
  var {employeeId} = await inquirer.prompt({
    type: "list",
    message: "Which employee do you want to update?",
    choices: employeeChoices,
    name: "employeeId"
  })
  var roles = await db.seeAllRoles();
  var roleChoices = roles.map(({id, title}) => ({
    name: title,
    value: id
  }))
  var {roleId} = await inquirer.prompt({
    type: "list",
    message: "Which role would you like to assign to this employee?",
    choices: roleChoices,
    name: "roleId"
  })
  await db.updateEmployeeRole(employeeId, roleId)
  init();
}

async function removeEmployee(){
  const employees = await db.seeAllEmployees();
  const employeeChoices = employees.map(({id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  const {first} = await inquirer
    .prompt([
      {
        type: "list",
        name: "first",
        message: "What employee would you like to delete?",
        choices: employeeChoices
      }
    ])
    await db.deleteEmployee(first);
    init();
}
