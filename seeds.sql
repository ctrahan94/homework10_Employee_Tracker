USE trackerDB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1), ("Mike", "Chan", 2,1), ("Ashley", "Rodriguez", 3, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1), ("Salesperson", 80000, 2), ("Lead Engineer", 150000, 3);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");