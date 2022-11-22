
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

module.exports = addDepartment