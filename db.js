const connection = require("./connections");
const inquirer = require("inquirer");
const { inherits } = require("util");

class DB {
  constructor (connection){
    this.connection = connection;
  }

    seeAllEmployees(){
      return this.connection.query("SELECT * FROM employee"); 
    }

    seeAllDepartment(){
      return this.connection.query("SELECT * FROM department");
    }

    createEmployee(data){
      return this.connection.query("INSERT INTO employee SET ?" , data); 
    }

    seeAllManager(){
      return this.connection.query("SELECT manager_id FROM employee");
    }

    seeAllRoles(){
      return this.connection.query("SELECT * FROM role");
    }

    updateEmployeeRole(employeeId, roleId){
      return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }
};

module.exports = new DB(connection);