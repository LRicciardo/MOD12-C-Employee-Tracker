const inquirer = require("inquirer");
const cTable = require("console.table");
// import and require server
const express = require('express');

// internal requires
// const DB = require('./config/connex2sql');
const connex2db = require('./lib/utilSql');
// const viewDepartments = require ("./lib/view");
// const addDepartment = require ("./lib/add");
// const sqlCall = require ("./lib/utils");

// define the PORT
const PORT = process.env.PORT || 3001;
// set up middleware
const app = express();

const employeeTracker = async () => {
  // console.log("inside employeeTracker");
  const query = [
    {
      pageSize: 6,
      type: "list",
      name: "action",
      message: "What do you want to do? (Select 'QUIT' when finished)",
      choices: ["VIEW", "ADD", "UPDATE", "DELETE", "QUIT"]
    },
  ];
const {action} = await inquirer.prompt(query);
  switch (action) {
    case "VIEW":
      // console.log("inside switch view prompt");
      viewPrompt();
      break;
    case "ADD":
      addPrompt();
      break;
    case "UPDATE":
      updatePrompt();
      break;
    case "DELETE":
      deletePrompt();
      break;
    case "QUIT":
      console.log("QUIT Employee Tracker");
      process.exit(0);
      return;
      // break;
    default:
      console.log("Default employeeTracker Task");
      // break;
  };
};

// VIEW ##################################
const viewPrompt = async () => {
  // console.log("inside viewPrompt");
  const query = [
  {
    pageSize: 9,
    type: "list",
    name: "action",
    message: "Select what you want to VIEW.",
    choices: [new inquirer.Separator(' === VIEW Menu === '), "All Departments", "All Roles", "All Employees By ID", "All Employees By Department", "All Employees By Manager", "All Managers", "Personnel Budget by Department", "QUIT VIEW"]
    // choices: ["All Department", "DONE"]
  },
  ];  

  const {action} = await inquirer.prompt(query)
    switch (action) {
      case "All Departments":
        // console.log("inside switch view all departments");
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
      case "All Employees By Manager":
        viewEmployeesByMgr();
        break;
      case "All Managers":
        viewManagers();
        break;
      case "Personnel Budget by Department":
        viewBudgetByDept();
        break;
      case "QUIT VIEW":
        console.log("Return to main query");
        employeeTracker();
        break;
      default:
        console.log("Default viewPrompt Task");
        break;
  }
};

const viewDepartments = async () => {
  // console.log("inside viewDepartments");
  const [results] = await connex2db.sqlViewDept();
  console.table("\nDepartment Listing", results);
  viewPrompt();
};

const viewRoles = async () => {
  // console.log("inside viewRoles");
  const [results] = await connex2db.sqlViewRoles();
  console.table("\nRoles Listing", results);
  viewPrompt();
};

const viewEmployeesById = async () => {
  // console.log("inside viewEmployeesById");
  const [results] = await connex2db.sqlViewEmployeesById();
  console.table("\nEmployees By Id Listing", results);
  // viewPrompt();
  // const response = callSql(cmdView);
  // console.log(response);
  viewPrompt();
};

const viewEmployeesByDept = async () => {
  // console.log("inside viewEmployeesByDept");
  const [results] = await connex2db.sqlViewEmployeesByDept();
  console.table("\nEmployees By Department Listing", results);
  viewPrompt();
};

const viewEmployeesByMgr = async () => {
  // console.log("inside viewEmployeesByMgr");
  const [results] = await connex2db.sqlViewEmployeesByMgr();
  console.table("\nEmployees By Manager Listing", results);
  viewPrompt();
};

const viewManagers = async () => {
  // console.log("inside viewEmployeesByMgr");
  const [results] = await connex2db.sqlViewManagers();
  console.table("\nManagers Listing", results);
  viewPrompt();
};

const viewBudgetByDept = async () => {
  // console.log("inside viewBudgetByDept");
  const [results] = await connex2db.sqlViewBudgetByDept();
  console.table("\nPersonnel Budget By Department Listing", results);
  viewPrompt();
};

// ADD ##################################
const addPrompt = async () => {
  // console.log("inside addPrompt");
  const query = [
  {
    pageSize: 5,
    type: "list",
    name: "action",
    message: "Select what you want to ADD. (Select 'DONE' to exit ADD function)",
    choices: [new inquirer.Separator(' === ADD Menu === '), "Department", "Role", "Employee", "QUIT ADD"]
    // choices: ["Department", "DONE"]
  },
  ]; 
  const { action } = await inquirer.prompt(query)
  // await inquirer
  //   .prompt(query)
    // .then((answers) => {
      console.log("inside addPrompt .then");
      console.log(action);
      switch (action) {
        case "Department":
          addDepartment();
          break;
        case "Role":
          addRole();
          break;
        case "Employee":
          addEmployee();
          break;
        case "QUIT ADD":
          console.log("Return to main query");
          employeeTracker();
          break;
        default:
          console.log("Default addPrompt Task")
          break;
      }
    // })
    // .catch((err) =>
    //   err ? console.log(err) : console.log(`Successful addPrompt`)
    // );
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
  const answers = await inquirer.prompt(query);
    const sqlResults = await connex2db.sqlAddDept(answers);
     console.log(sqlResults);
     console.table("Department Added",answers);
    addPrompt();
};

const addRole = async () => {
  // console.log("inside addRole");

  const cleanSalary = (inputSalary) => {
    return Math.floor(inputSalary).replace(/\D/g,'')
  };
  
  const [choicesDept] = await connex2db.sqlDeptChoices();
  
  
  const query = [
  {
    type: "input",
    name: "longTitle",
    message: "Enter title (up to 30 characters)=>",
    validate: (longTitle) => {
      const pass = longTitle.match(/[a-zA-Z0-9:-\s]{1,30}/g);
      if (pass) {
        return true;
      }
      return "The official title should be 1 to 30 characters long.";
    },
  },
  {
    type: "input",
    name: "shortTitle",
    message: "Enter abbreviated title (up to 10 characters)=>",
    validate: (shortTitle) => {
      const pass = shortTitle.match(/[a-zA-Z0-9:-\s]{1,10}/g);
      if (pass) {
        return true;
      }
      return "The abbreviated title should be 1 to 10 characters long.";
    },
  },
  {
    type: "number",
    name: "salary",
    message: "Enter salary=>",
    validate: (salary) => {
      const pass = salary.match(/^\d{1,6}$/g);
      if (pass) {
        return true;
      }
      return "The a valid whole dollar amount without punctuation.";
    },
  },
  {
    type: "list",
    name: "deptId",
    message: "Select Department=>",
    choices: choicesDept,
  },
  ];
  const answers = await inquirer.prompt(query);
  const sqlResults = await connex2db.sqlAddRole(answers);
   console.log(sqlResults);
   addPrompt();
  // await inquirer
  //   .prompt(query)
  //   .then((answers) => {
  //     const sqlInsert = {
  //       // table: "role",
  //       // fields: ["title_long", "title_short", "salary", "department_id"],
  //       params: [answers.longTitle, answers.shortTitle, cleanSalary(answers.salary), answers.deptId]
  //     };
  //   const cmdInsert = `INSERT INTO role ( "title_long", "title_short", "salary", "department_id" ) VALUES ( ?, ?, ?, ? )`;  
  //   // we havent async call to our DB 
  //   sqlCall(cmdInsert, sqlInsert.params)
  //     .then(data => {
  //       console.log(data)
  //       addPrompt();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //     // connex2sql.query(cmdInsert, sqlInsert.params,
  //     //   (err,res) => {
  //     //     console.log("inside sql query");
  //     //     console.log(err);
  //     //     console.log(res);
  //     //     if (err){
  //     //       res.status(500).json({error: err.message});
  //     //       // return;
  //     //     }
  //     //     // return res;
  //     //     return `Role ${answers.longTitle} has been added`;
  //     //   });
  //   })
  //   .catch((err) =>
  //     err ? console.log(err) : console.log(`Successful addRole`)
  //   );
};

const addEmployee = async () => {
  console.log("inside addEmployee");

  const roleChoices = () => { 
    
    const cmdView = `SELECT 
    role.id AS value,
    role.title_long AS name,
  FROM role;`;     
    const roleArr = connex2sql.query(cmdView,
      (err,res) => {
        if (err) {
          res.status(500).json({error: err});
          return null;
        };
        console.log(res);
        return res;
      });
      return roleArr[0];
  };

  const mgrChoices = () => { 
    
    const cmdView = `SELECT 
    mgr.id as value,
    CONCAT (mgr.first_name, " ", mgr.last_name) AS name,
  FROM employee emp
  JOIN employee mgr
    ON mgr.id = emp.manager_id
  LEFT JOIN employee mgr2
    ON mgr2.id = mgr.manager_id
  GROUP BY mgr.id
  ORDER BY mgr.manager_id;`;     
    const roleArr = connex2sql.query(cmdView,
      (err,res) => {
        if (err) {
          res.status(500).json({error: err});
          return null;
        };
        console.log(res);
        return res;
      });
      return roleArr[0];
  };

  const query = [
  {
    type: "input",
    name: "firstName",
    message: "Enter Employee first name (up to 30 characters)=>",
    validate: (firstName) => {
      const pass = firstName.match(/[a-zA-Z\s]{1,30}/g);
      if (pass) {
        return true;
      }
      return "The Employee first name should be 1 to 30 characters long.";
    },
  },
  {
    type: "input",
    name: "lastName",
    message: "Enter Employee last name (up to 30 characters))=>",
    validate: (lastName) => {
      const pass = lastName.match(/[a-zA-Z.-\s]{1,30}/g);
      if (pass) {
        return true;
      }
      return "The Employee last name should be 1 to 30 characters long.";
    },
  },
  {
    type: "list",
    name: "roleId",
    message: "Select Role=>",
    choices: roleChoices(),
  },
  {
    type: "list",
    name: "mgrId",
    message: "Select Manager=>",
    choices: mgrChoices(),
  },
  ];  
  await inquirer
    .prompt(query)
    .then((answers) => {
      const sqlInsert = {
        table: "role",
        fields: ["first_name", "last_name","role_id", "manager_id"],
        params: [answers.firstName, answers.lastName, roleId, answers.mgrId]
      };
    const cmdInsert = `INSERT INTO ${sqlInsert.table} ( ${sqlInsert.fields} ) VALUES ( ?, ?, ?, ? )`;   
      sqlCall(cmdInsert, sqlInsert.params);
      // connex2sql.query(cmdInsert, sqlInsert.params,
      //   (err,res) => {
      //     console.log("inside sql query");
      //     console.log(err);
      //     console.log(res);
      //     if (err){
      //       res.status(500).json({error: err.message});
      //       // return;
      //     }
      //     // return res;
      //     return `Role ${answers.longTitle} has been added`;
      //   });
      addPrompt();
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful addDepartment`)
    );
};

// UPDATE ##################################
const updatePrompt = async () => {
  // console.log("inside updatePrompt");
  const query = [
  {
    pageSize: 5,
    type: "list",
    name: "action",
    message: "Select what you want to UPDATE. (Select 'DONE' to exit UPDATE function)",
    choices: [new inquirer.Separator(' === UPDATE Menu === '), "Department", "Role", "Employee", "QUIT UPDATE"]
    // choices: ["Department", "DONE"]
  },
  ]; 
  const { action } = await inquirer.prompt(query)

      switch (action) {
        case "Department":
          updateDepartment();
          break;
        case "Role":
          updateRole();
          break;
        case "Employee":
          updateEmployee();
          break;
        case "QUIT UPDATE":
          console.log("Return to main query");
          employeeTracker();
          break;
        default:
          console.log("Default updatePrompt Task")
          break;
      }
};
 
updateDepartment = () => {
console.log("inside updateDepartment")
};
 
deleteRole = () => {
console.log("inside updateRole")
};
 
deleteEmployee = () => {
console.log("inside updateEmployee")
};
 
// DELETE ##################################
const deletePrompt = async () => {
  console.log("inside deletePrompt");
  const query = [
  {
    pageSize: 5,
    type: "list",
    name: "action",
    message: "Select what you want to DELETE. (Select 'DONE' to exit DELETE function)",
    choices: [new inquirer.Separator(' === DELETE Menu === '), "Department", "Role", "Employee", "QUIT DELETE"]
    // choices: ["Department", "DONE"]
  },
  ]; 
  const { action } = await inquirer.prompt(query)
  // await inquirer
  //   .prompt(query)
    // .then((answers) => {
      console.log("inside deletePrompt .then");
      console.log(action);
      switch (action) {
        case "Department":
          deleteDepartment();
          break;
        case "Role":
          deleteRole();
          break;
        case "Employee":
          deleteEmployee();
          break;
        case "QUIT DELETE":
          console.log("Return to main query");
          employeeTracker();
          break;
        default:
          console.log("Default deletePrompt Task")
          break;
      }
    // })
    // .catch((err) =>
    //   err ? console.log(err) : console.log(`Successful deletePrompt`)
    // );
};
 
deleteDepartment = () => {
console.log("inside deleteDepartment")
};
 
deleteRole = () => {
console.log("inside deleteRole")
};
 
deleteEmployee = () => {
console.log("inside deleteEmployee")
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
