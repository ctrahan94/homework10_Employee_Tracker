const inquirer = require("inquirer");

const initQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all employees by department",
      "View all employees by manager",
      "Add employee",
      "Remove employee",
      "Update employee by role",
      "Update employee by manager",
    ],
    name: "choices",
  },
];

function init(){
  inquirer.prompt(initQuestions)
  };

  init();