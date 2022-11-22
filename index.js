const inquirer = require("inquirer");
const cTable = require('console.table');
// import and require server
const express = require('express');
// import and require mysql2 (client?)
const mysql = require('mysql2');
// internal requires
// const viewDepartments = require ("./lib/view");
// const addDepartment = require ("./lib/add");
// const sqlCall = require ("./lib/utils");

// define the PORT
const PORT = process.env.PORT || 3001;
// set up middleware
const app = express();

// create the connection to database
const connex2sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQLPass123!',
  database: 'personnel_db'
});

const employeeTracker = async () => {
  console.log("inside employeeTracker");
  const query = [
    {
      type: "list",
      name: "action",
      message: "What do you want to do? (Select 'QUIT' when finished)",
      choices: ["VIEW", "ADD", "UPDATE", "DELETE", "QUIT"]
    },
  ];
  await inquirer
    .prompt(query)
    .then((answers) => {
      console.log("inside the employeeTracker .then");
      console.log(answers);
      switch (answers.action) {
        case "ADD":
          addPrompt();
          break;
        case "VIEW":
          viewPrompt();
          break;
        case "QUIT":
          console.log("QUIT Employee Tracker")
          return;
          // break;
        default:
          console.log("Default employeeTracker Task")
          break;
      }
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful employeeTracker`)
    );
};

// VIEW ##################################
const viewPrompt = async () => {
  console.log("inside viewPrompt");
  const query = [
  {
    type: "list",
    name: "action",
    message: "Select what you want to ADD. (Select 'DONE' to exit ADD function)",
    choices: [new inquirer.Separator(' = VIEW = '), "All Departments", "All Roles", "All Employees By ID", "All Employees By Department", "All Employees By Manager ID", "Personnel Budget by Department", "DONE"]
    // choices: ["All Department", "DONE"]
  },
  ];  
  await inquirer
    .prompt(query)
    .then((answers) => {
      console.log("inside viewPrompt .then");
      console.log(answers);
      switch (answers.action) {
        case "All Departments":
          viewDepartments();
          break;
        case "All Roles":
          viewRoles();
          break;
        case "All Employees By ID":
          viewEmployeesById();
          break;
        case "All Employees By Department":
          viewEmployeesByDept();
          break;
        case "All Employees By Manager ID":
          viewEmployeesByMgr();
          break;
        case "Personnel Budget by Department":
          viewBudgetByDept();
          break;
        case "DONE":
          console.log("Return to main query");
          employeeTracker();
          break;
        default:
          console.log("Default viewPrompt Task")
          break;
      }
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful viewPrompt`)
    );
};

const viewDepartments = () => {
  // console.log("inside viewDepartments");
  const cmdView = `SELECT 
  id, 
  name_long AS Department_Name, 
  name_short AS ABBR_Dept 
  FROM department;`;   
  const params = [];
  // console.table(sqlCall(cmdView, params));
  connex2sql.query(cmdView,
    (err,res) => {
      // console.log("inside query");
      // console.log(err);
      // console.log(res);
      err? res.status(500).json({error: err.message}):console.table(res);
    });
  viewPrompt();
};

const viewRoles = () => {
  // console.log("inside viewRoles");
  const cmdView = `SELECT 
  role.id AS id,
  role.title_long AS title,
  role.title_short AS ABBR_title,
  CONCAT ("$ ", FORMAT (role.salary, 2)) AS salary,
  dept.name_long AS department
FROM role 
JOIN department dept
 ON dept.id = role.department_id;`;   
  const params = [];
  // console.table(sqlCall(cmdView, params));
  connex2sql.query(cmdView,
    (err,res) => {
      // console.log("inside query");
      // console.log(err);
      // console.log(res);
      err? res.status(500).json({error: err.sqlMessage}):console.table(res);
    });
  viewPrompt();
};

const viewEmployeesById = () => {
  // console.log("inside viewEmployeesById");
  const cmdView = `SELECT 
  emp.id,
  CONCAT (emp.first_name, " ", emp.last_name) AS employee_name,
  role.title_long AS title,
  CONCAT ("$ ", FORMAT (role.salary, 2)) AS salary,
  dept.name_long AS department,
  CONCAT (mgr.first_name, " ", mgr.last_name) AS manager_name
FROM employee emp
JOIN role
  ON role.id = emp.role_id
JOIN department dept
  ON dept.id = role.department_id
LEFT JOIN employee mgr
  ON mgr.id = emp.manager_id
ORDER BY emp.id;`;   
  const params = [];
  // console.table(sqlCall(cmdView, params));
  connex2sql.query(cmdView,
    (err,res) => {
      // console.log("inside query");
      // console.log(err);
      // console.log(res);
      err? res.status(500).json({error: err}):console.table(res);
    });
  viewPrompt();
};

const viewEmployeesByDept = () => {
  // console.log("inside viewEmployeesByDept");
  const cmdView = `SELECT 
  dept.name_long AS department,
  emp.id,
  CONCAT (emp.first_name, " ", emp.last_name) AS employee_name,
  role.title_long AS title,
  CONCAT ("$ ", FORMAT (role.salary, 2)) AS salary,
  CONCAT (mgr.first_name, " ", mgr.last_name) AS manager_name
FROM employee emp
JOIN role
  ON role.id = emp.role_id
JOIN department dept
  ON dept.id = role.department_id
LEFT JOIN employee mgr
  ON mgr.id = emp.manager_id
ORDER BY dept.id, emp.id;`;   
  const params = [];
  // console.table(sqlCall(cmdView, params));
  connex2sql.query(cmdView,
    (err,res) => {
      // console.log("inside query");
      // console.log(err);
      // console.log(res);
      err? res.status(500).json({error: err}):console.table(res);
    });
  viewPrompt();
};

const viewEmployeesByMgr = () => {
  // console.log("inside viewEmployeesByMgr");
  const cmdView = `SELECT 
  CONCAT (mgr.first_name, " ", mgr.last_name) AS manager_name,
  emp.id,
  CONCAT (emp.first_name, " ", emp.last_name) AS employee_name,
  role.title_long AS title,
  CONCAT ("$ ", FORMAT (role.salary, 2)) AS salary,
  dept.name_long AS department
FROM employee emp
JOIN role
  ON role.id = emp.role_id
JOIN department dept
  ON dept.id = role.department_id
LEFT JOIN employee mgr
  ON mgr.id = emp.manager_id
ORDER BY emp.manager_id;`;   
  const params = [];
  // console.table(sqlCall(cmdView, params));
  connex2sql.query(cmdView,
    (err,res) => {
      // console.log("inside query");
      // console.log(err);
      // console.log(res);
      err? res.status(500).json({error: err}):console.table(res);
    });
  viewPrompt();
};

const viewBudgetByDept = () => {
  // console.log("inside viewBudgetByDept");
  const cmdView = `SELECT 
  dept.name_long AS department,
  CONCAT ("$ ", FORMAT (SUM(role.salary), 2)) AS salary
FROM employee emp
JOIN role
  ON role.id = emp.role_id
JOIN department dept
  ON dept.id = role.department_id
GROUP BY dept.id;`;   
  const params = [];
  // console.table(sqlCall(cmdView, params));
  connex2sql.query(cmdView,
    (err,res) => {
      // console.log("inside query");
      // console.log(err);
      // console.log(res);
      err? res.status(500).json({error: err}):console.table(res);
    });
  viewPrompt();
};

// ADD ##################################
const addPrompt = async () => {
  console.log("inside addPrompt");
  const query = [
  {
    type: "list",
    name: "action",
    message: "Select what you want to ADD. (Select 'DONE' to exit ADD function)",
    choices: [new inquirer.Separator(' = ADD = '), "Department", "Role", "Employee", "DONE"]
    // choices: ["Department", "DONE"]
  },
  ];  
  await inquirer
    .prompt(query)
    .then((answers) => {
      console.log("inside addPrompt .then");
      console.log(answers);
      switch (answers.action) {
        case "Department":
          addDepartment();
          break;
        case "DONE":
          console.log("Return to main query");
          employeeTracker();
          break;
        default:
          console.log("Default addPrompt Task")
          break;
      }
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful addPrompt`)
    );
};

const addDepartment = async () => {
  console.log("inside addDepartment");
  const query = [
  {
    type: "input",
    name: "longName",
    message: "Enter Department name (up to 30 characters)=>",
    validate: (longName) => {
      const pass = longName.match(/[a-zA-Z0-9:-\s]{1,30}/g);
      if (pass) {
        return true;
      }
      return "The official Department name should be 1 to 30 characters long.";
    },
  },
  {
    type: "input",
    name: "shortName",
    message: "Enter Department abbreviated name (up to 10 characters)=>",
    validate: (shortName) => {
      const pass = shortName.match(/[a-zA-Z0-9:-\s]{1,10}/g);
      if (pass) {
        return true;
      }
      return "The abbreviated Department name should be 1 to 10 characters long.";
    },
  },
  ];  
  await inquirer
    .prompt(query)
    .then((answers) => {
      const sqlInsert = {
        table: "department",
        fields: ["name_long", "name_short"],
        params: [answers.longName, answers.shortName]
      };
    const cmdInsert = `INSERT INTO ${sqlInsert.table} ( ${sqlInsert.fields} ) VALUES ( ?, ? )`;   
      sqlCall(cmdInsert, sqlInsert.params);
      addPrompt();
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful addDepartment`)
    );
};


 const sqlCall = (sql, params) => {
  console.log("inside sqlCall");
  console.log(sql);
  console.log(params);
  connex2sql.query(sql, params,
    (err,res) => {
      console.log("inside sqlCall.query");
      console.log(err);
      console.log(res);
      if (err){
        res.status(500).json({error: err.message});
        return;
      }
      res.json({
        message: "successful sql",
        data: res
      });
    });
 };

// Function call to initialize app
employeeTracker();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
