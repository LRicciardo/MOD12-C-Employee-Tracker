const inquirer = require("inquirer");
const { writeFile } = require("fs").promises;
const fs = require("fs");
// const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const renderHtml = require("./src/html");

// Team array will hold the team Members
let teamName = null;
let teamPurpose = null;
let team = [];

const startQuery = [
  {
    type: "input",
    name: "team",
    message: "What is the name of the Team?"
  },
  {
    type: "input",
    name: "teamPurpose",
    message: "What is the purpose of the Team?"
  }
];
const startBuild = async () => {
  return await inquirer
    .prompt(startQuery)
    .then((answers) => {
      teamName = answers.team;
      teamPurpose = answers.teamPurpose;
      buildTeam();
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful startBuild`)
    );
};
const choices = ["Manager", "Engineer", "Intern", "DONE"];
let teamRole = null;

const roleQuery = [
  {
    type: "list",
    name: "role",
    message:
      "What Team Member do you want to add? (Select 'DONE' when finished)",
    choices: choices
  }
];

const displayDone = () => {
  console.log("(**************************************)");
  console.log("(* Finished entering the team members *)");
  console.log("(*    Building the HTML page          *)");
  console.log("(**************************************)");
}

const buildTeam = async () => {
  return await inquirer
    .prompt(roleQuery)
    .then((answers) => {
      if (answers.role === "DONE") {
        displayDone();
        writeToFile(
          "./dist/index.html",
          `${renderHtml(team, teamName, teamPurpose)}`
        );
      } else {
        teamRole = answers.role;
        // takes "Manager" out of choices
        if (answers.role === "Manager") {
          choices.shift();
        }
        buildEmployee();
      }
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful buildTeam`)
    );
};

const employeeQuery = [
  {
    type: "input",
    name: "name",
    message: "Enter Employee Name:"
  },
  {
    type: "input",
    name: "id",
    message: "Enter Employee Id:",
    validate(value) {
      const pass = value.match(
        /^(\d{5})$/
      );
      if (pass) {
        return true;
      }
      return "Please enter a 5-digit employee id";
    }
  },
  {
    type: "input",
    name: "email",
    message: "Enter Employee Email:",
    validate(value) {
      const pass = value.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (pass) {
        return true;
      }
      return "Please enter a valid email";
    }
  },
  {
    type: "input",
    name: "phone",
    message: "Enter Team Manager Office Number:",
    when(answer) {
      return teamRole === "Manager";
    },
    validate(value) {
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return "Please enter a valid phone number";
    }
  },
  {
    type: "input",
    name: "github",
    message: "Enter Engineer GitHub user name:",
    when(answer) {
      return teamRole === "Engineer";
    }
  },
  {
    type: "input",
    name: "schoolName",
    message: "Enter Intern school name:",
    when(answer) {
      return teamRole === "Intern";
    }
  }
];

const buildEmployee = async () => {
  console.log("  ");
  console.log(` >>>>>  Enter ${teamRole} Team Member <<<<<`);
  return await inquirer
    .prompt(employeeQuery)
    .then((answer) => {
      if (teamRole === "Manager") {
        const { id, name, email, officeNumber } = answer;
        let manager = new Manager(id, name, email, officeNumber);
        team.push(manager);
      }
      if (teamRole === "Engineer") {
        const { id, name, email, github } = answer;
        let engineer = new Engineer(id, name, email, github);
        team.push(engineer);
      }
      if (teamRole === "Intern") {
        const { id, name, email, schoolName } = answer;
        let intern = new Intern(id, name, email, schoolName);
        team.push(intern);
      }
      buildTeam();
    })
    .catch((err) =>
      err ? console.log(err) : console.log(`Successful runQuery`)
    );
};

const writeToFile = async (fileName, data) => {
  return await writeFile(fileName, data, (err) =>
    err ? console.log(err) : console.log(`Successfully created ${fileName}`)
  );
};
const init = () => {
  startBuild();
};

// Function call to initialize app
init();
