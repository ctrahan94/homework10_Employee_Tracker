const connection = require("./connections");
const inquirer = require("inquirer");
const { inherits } = require("util");

class DB {
  constructor (connection){
    this.connection = connection;
  }

  seeAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first, manager.last_name AS manager_last, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id"
    );
  }

    seeAllRoles() {
      return this.connection.query(
        "SELECT role.id, department.name AS department, role.title FROM role LEFT JOIN department ON role.department_id = department.id"
      );
    }

    seeAllDepartment() {
      return this.connection.query(
        "SELECT department.name AS department FROM department"
      );
    }

    createEmployee(data){
      return this.connection.query("INSERT INTO employee SET ?" , data); 
    }

    createRole(data){
      return this.connection.query("INSERT INTO role SET ?", data);
    }

    seeAllRoles(){
      return this.connection.query("SELECT * FROM role");
    }

    updateEmployeeRole(employeeId, roleId){
      return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }

    deleteEmployee(id){
      return this.connection.query("DELETE FROM employee WHERE id = ?", id)
    }

};

module.exports = new DB(connection);