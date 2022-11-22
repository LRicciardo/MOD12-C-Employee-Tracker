INSERT INTO department
      (name_long, 
       name_short)
VALUES ("Board of Directors", "Board"),
       ("Management", "Mngmt"),
       ("Human Resources", "HR"),
       ("Information Technology", "IT"),
       ("Service", "Serv"),
       ("Marketing and Advertising", "Mrktg"),
       ("Engineering", "Engrg"),
       ("Legal", "Legal"),
       ("Finance and Accounting", "F&A"),
       ("Sales", "Sales");


-- All Chiefs not enough indians
INSERT INTO role 
     (title_long, 
      title_short, 
      salary, 
      department_id)
VALUES ("Chief Executive Officer", "CEO", 300000, 1),
       ("Chief Financial Officer", "CFO", 250000, 1),
       ("Chief Operating Officer", "COO", 250000, 1),
       ("Chief Information Officer", "CIO", 250000, 1),
       ("Chief Marketing Officer", "CMO", 250000, 1),
       ("Manager", "Mgr", 175000, 3),
       ("Manager", "Mgr", 175000, 4),
       ("Manager", "Mgr", 175000, 5),
       ("Manager", "Mgr", 175000, 6),
       ("Lead Engineer", "Lead Eng", 150000, 7),
       ("Legal Team Lead", "Legal Mgr", 250000, 8),
       ("Account Manager", "Acct Mgr", 160000, 9),
       ("Accountant", "Acct", 125000, 9),
       ("Manager", "Mgr", 175000, 10),
       ("Bookkeeper", "Emp", 65000, 9),
       ("Software Engineer", "Soft Eng", 120000, 7),
       ("Customer Service", "CustServ", 50000, 5),
       ("Software Engineer", "Emp", 150000, 4),
       ("Sales Representative", "Emp", 150000, 9),
       ("Administrative Assistant", "AA", 80000, 2),
       ("Administrative Assistant", "AA", 80000, 3),
       ("Administrative Assistant", "AA", 80000, 4),
       ("Administrative Assistant", "AA", 80000, 5),
       ("Administrative Assistant", "AA", 80000, 6),
       ("Administrative Assistant", "AA", 80000, 7),
       ("Administrative Assistant", "AA", 80000, 8),
       ("Lawyer", "Lawyer", 190000, 8),
       ("Administrative Assistant", "AA", 80000, 9);


-- all the indians ---
INSERT INTO employee 
      (first_name, 
       last_name, 
       role_id, 
       manager_id)
VALUES ("Sally", "Sutton", 1, DEFAULT),       
       ("Ned", "Telly", 2, 1),       
       ("Georgia", "Southern", 3, 1),       
       ("Ashley", "Rodriguez", 3, 13),       
       ("Kevin", "Tupik", 16, 4),       
       ("John", "Doe", 14, 12),       
       ("Micheal", "Chan", 19, 6),       
       ("Kunal", "Singh", 12, 2),       
       ("Malia", "Brown", 13, 8),       
       ("Sarah", "Lourd", 11, 1),       
       ("Tom", "Allen", 27, 10),       
       ("Gavyn", "Thick", 5, 1),       
       ("Umberto", "Rotoni", 4, 1);    