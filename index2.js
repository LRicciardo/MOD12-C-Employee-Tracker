const inquirer = require("inquirer");
// const { writeFile } = require("fs").promises;
// const fs = require("fs");
const cTable = require('console.table');
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'MySQLPass123!',
  database: 'personnel_db'
});

// (async () => {
//   let answer;

//   answer = await select({
//     message: 'Select a package manager',
//     choices: [
//       {
//         name: 'npm',
//         value: 'npm',
//         description: 'npm is the most popular package manager',
//       },
//       { name: 'yarn', value: 'yarn', description: 'yarn is an awesome package manager' },
//       { name: 'jspm', value: 'jspm', disabled: true },
//     ],
//   });

const employeeTracker = async () => {
  console.log("inside employeeTracker");
  const query = [
    {
      type: "list",
      name: "action",
      message: "What do you want to do? (Select 'QUIT' when finished)",
      // choices: ["View", "Add", "Update", "Delete", "QUIT"]
      choices: ["ADD", "QUIT"]
    },
  ];
  await inquirer
    .prompt(query)
    .then((answers) => {
      console.log("inside the employeeTracker .then");
      console.log(answers);
      switch (answers.action) {
        // case "View":
        //   viewPrompt();
        //   break;
        case "ADD":
          addPrompt();
          employeeTracker();
          break;
        // case "Update":
        //   updatePrompt();
        //   break;
        // case "Delete":
        //   DeletePrompt();
        //   break;
        case "QUIT":
          console.log("QUIT Employee Tracker")
          break;
        default:
          console.log("Default employeeTracker Task")
          break;
      }
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful employeeTracker`)
    );
};

const addPrompt = async () => {
  console.log("inside addPrompt");
  const query = [
  {
    type: "list",
    name: "action",
    message: "Select what you want to ADD. (Select 'DONE' to exit ADD function)",
    // choices: [new inquirer.Separator(' = ADD = '), "Department", "Role", "Employee", "DONE"]
    choices: [new inquirer.Separator(' = ADD = '), "Department", "DONE"]
  },
  ];  
  await inquirer
    .prompt(query)
    .then((answers) => {
      switch (answers.action) {
        case "Department":
          addDepartment();
          addPrompt();
          break;
        // case "Role":
        //   addRole();
        //   addPrompt();
        //   break;
        // case "Employee":
        //   addEmployee();
        //   addPrompt();
        //   break;
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


// const viewPrompt = async () => {
//   const query = [
//   {
//     type: "list",
//     name: "action",
//     message: "Select what you want to View. (Select 'DONE' when finished)",
//     choices: [new inquirer.Separator(' = View = '), "Departments", "Roles", "Managers", "Employees", "Employees by Department", "Employees by Manager", "DONE"]
//   },
//   ];  
//   return await inquirer
//     .prompt(query)
//     .then((answers) => {
//       switch (answers.action) {
//         case "Departments":
//           viewDepartments();
//           viewPrompt();
//           break;
//         case "Roles":
//           viewRoles();
//           viewPrompt();
//           break;
//         case "Managers":
//           viewManagers();
//           viewPrompt();
//           break;
//         case "Employees":
//           viewEmployees();
//           viewPrompt();
//           break;
//         case "Employees by Department":
//           viewEmpByDept();
//           viewPrompt();
//           break;
//         case "Employees by Manager":
//           viewEmpByManager();
//           viewPrompt();
//           break;
//         case "DONE":
//           employeeManager();
//           console.log("Return to Start")
//           break;
//         default:
//           break;
//       }
//     })
//     .catch((err) =>
//       err ? console.log(err) : console.log(`Successful viewPrompt`)
//     );
// };


const addDepartment = async () => {
  console.log("inside addDepartment");
  const query = [
  {
    type: "input",
    name: "longName",
    message: "Enter Department name (up to 30 characters)=>",
    validate: (longName) => {
      if (longName.length < 1 || longName > 30) {
        return "The official Department name should be 1 to 30 characters long.";
      }
    }
  },
  {
    type: "input",
    name: "shortName",
    message: "Enter Department abbreviated name (up to 10 characters)=>",
    validate: (shortName) => {
      if (shortName.length < 1 || shortName > 10) {
        return "The abbreviated Department name should be 1 to 10 characters long.";
      }
    }
  },
  ];  
  await inquirer
    .prompt(query)
    .then((answers) => {
      insertDept(answers);
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful addDepartment`)
    );
};
 const insertDept = (answers) => {
  console.log("inside insertDept");
  console.log(answers);
 };

// Function call to initialize app
employeeTracker();
