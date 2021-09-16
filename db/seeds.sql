USE employees;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', 1, 1),
        ('Jim', 'Halpert', 3, 1),
        ('Dwight', 'Schrute', 2, 1),
        ('Andy', 'Bernard', 3, 1),
        ('Pam', 'Beasley', 4, 1),
        ('Kevin', 'Malone', 5, 1);
    
INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 100000, 1),
        ('Assistant Manager', 85000, 2),
        ('Sales Representative', 65000, 3),
        ('Secretary', 45000, 4),
        ('Accounting', 65000, 5);

INSERT INTO department (department_name) 
VALUES  ("Manager"),
        ("Assistant Manager"),
        ("Sales Representative"),
        ("Secretary");