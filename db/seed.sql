USE employee-mangementdb;

use employee-mangementdb;

INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('IT'),
    ('Manufacturing'),
    ('Asset Care');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Data Engineer', 85000, 1),
    ('Data Analyst', 75000, 1),
    ('Data Scientist', 100000, 1),
    ('App Engineer', 75000, 1),
    ('Solutions Manager', 130000, 2),
    ('Application Manager', 130000, 2),
    ('Solutions SrManager', 150000, 3),
    ('App Engineering SrManager', 150000, 3),
    ('IT Director', 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ross', 'Geller', 1, 1),
    ('Rachek', 'Green', 2, NULL),
    ('Phoebe', 'Buffay', 3, 2),
    ('Joey', 'Tribbiani', 4, NULL),
    ('Monica', 'Geller', 5, 2),
    ('Chandler', 'Bing', 6, NULL),
    ('Janice', 'Hosenstein', 7, 5),
    ('Mike', 'Hannigan', 8, NULL),
    ('Jacm', 'Geller', 8, NULL);
