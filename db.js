const connection = require("./connections");

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
      return this.connection.query("INSERT INTO employee SET ?" , data);  /* ? = dynamic value followed by "," and info */
    }
};

module.exports = new DB(connection);