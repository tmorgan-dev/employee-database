INSERT INTO department (id, name)
VALUES (001, "Sales"),
       (002, "Marketing"),
       (003, "Management"),
       (004, "Customer Service"),
       (005, "Engineering");
       
INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Inbound Sales Representative", 1000, 001),
       (002, "Outbound Sales Representative", 1000, 001),
       (003, "Marketing Research", 1000, 002),
       (004, "Marketing Branding", 1000, 002),
       (005, "Team Manager", 1000, 003),
       (006, "Executive Manager", 1000, 003),
       (007, "Customer Care Representative", 1000, 004),
       (008, "Customer Care Team Lead", 1000, 004),
       (009, "Developer", 1000, 005),
       (010, "Lead Developer", 1000, 005);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "John", "Smith", 003, 001),
       (002, "Joseph", "Smith", 003, 001),
       (003, "George", "Smith", 002, 001),
       (004, "Sally", "Smith", 002, 001),
       (005, "Gina", "Smith", 003, 001),
       (006, "Linda", "Smith", 003, 001),
       (007, "Tim", "Smith", 004, 001),
       (008, "Bob", "Smith", 004, 001),
       (009, "Steve", "Smith", 005, 001),
       (010, "Stephanie", "Smith", 005, 001),
       (011, "Nichole", "Smith", 001, 001),
       (012, "Sharon", "Smith", 001, 001),
       (013, "Kirk", "Smith", 001, 001),
       (014, "Bill", "Smith", 001, 001),
       (015, "Rob", "Smith", 001, 001),
       (016, "Flint", "Smith", 001, 001),
       (017, "Angela", "Smith", 001, 001),
       (018, "Joann", "Smith", 001, 001),
       (019, "Tonya", "Smith", 001, 001),
       (020, "Aubrey", "Smith", 001, 001);