USE trackerDB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1), ("Mike", "Chan", 2,1), ("Ashley", "Rodriguez", 3, 3), ("Kevin", "Tupik", 4, 3), ("Kalia", "Brown", 5, 5), ("Sarah", "Lourd", 6, 6), ("Tom", "Allen", 7, 6), ("Christian", "Eckenrode", 4, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 75000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");
