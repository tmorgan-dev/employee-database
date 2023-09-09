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
VALUES (001, "John", "Smith", 006, 001),
       (002, "Joseph", "Smith", 006, 001),
       (003, "George", "Smith", 003, 002),
       (004, "Sally", "Smith", 003, 002),
       (005, "Gina", "Smith", 001, 003),
       (006, "Linda", "Smith", 001, 003),
       (007, "Tim", "Smith", 002, 003),
       (008, "Bob", "Smith", 002, 003),
       (009, "Steve", "Smith", 009, 003),
       (010, "Stephanie", "Smith", 009, 003),
       (011, "Nichole", "Smith", 004, 003),
       (012, "Sharon", "Smith", 004, 003),
       (013, "Kirk", "Smith", 005, 004),
       (014, "Bill", "Smith", 005, 004),
       (015, "Rob", "Smith", 010, 004),
       (016, "Flint", "Smith", 010, 004),
       (017, "Angela", "Smith", 007, 004),
       (018, "Joann", "Smith", 007, 004),
       (019, "Tonya", "Smith", 008, 004),
       (020, "Aubrey", "Smith", 008, 004);