const mysql = require('mysql2');
const cTable = require('console.table');

const sqlCall = require ("./utils");
// All View commands

const viewDepartments = () => {
  console.log("inside viewDepartments");
  const cmdView = `SELECT * FROM department`;   
  // sqlCall(cmdInsert, sqlInsert.params);
  connex2sql.query(cmdView,
    (err,res) => {
      console.log("inside query");
      console.log(err);
      console.log(res);
      if (err){
        res.status(500).json({error: err.message});
        return;
      }
      console.table(res);
    });
  viewPrompt();
};




module.exports = viewDepartments