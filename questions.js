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
        viewAllEmployees();
        break;

      case "View all employees by department":
        viewAllByDepartment();
        break;

      case "View all employees by manager":
        viewAllByManager();
        break;

      case "Add employee":
        addEmployee();
        break;

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

init();
