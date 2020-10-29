const inquirer = require("inquirer");
const { connect } = require("./connections");
const { connection } = require("./db");
const db = require("./db");
require("console.table");

const initQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all employees by department",
      "View all employees by manager",
      "Add employee" /* ask series of questions inside of function  (bundle in object -- when call dbcreate pass in object as argument) */,
      "Remove employee",
      "Update employee by role",
      "Update employee by manager",
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

      case "View all employees by department":
        return viewAllByDepartment();

      case "View all employees by manager":
       return viewAllByManager();

      case "Add employee":
        return addEmployee();

      case "Remove employee":
        removeEmployee();
        break;

      case "Update employee by role":
        updateEmployeeByRole();
        break;

      case "Update employee by manager":
        updateEmployeeByManager();
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

async function viewAllByManager() {
  var employees = await db.seeAllManager();
  console.table(employees);
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

async function removeEmployee() {}

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

async function updateEmployeeByManager() {}

init();


//Look at books and authors