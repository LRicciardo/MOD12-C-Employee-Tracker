// utilities for app
const connex2sql = require('../config/connex2sql');
const inquirer = require("inquirer");
// MySQL command call
function SqlCall( sqlCommand ) {
  this.sqlcommand = sqlcommand,
  this.params = params
  this.callSql = () => {
    return {error, results, fields} = connex2sql.query(this.query,this.params) 
  };
};

function AskQuery( questionList ) {
  this.questionList = questionList;
  this.callInquirer = async () => { 
    return { answer } = await inquirer.prompt(this.questionList);
  };
};

module.exports = new SqlCall(sqlQuery, sqlParams);

// const sqlCall = {
//       createSqlCall (query,params) {
//         if (params) {
//           return this.sqlQuery.promise().query(query,params, function(error,results,fields){if(error) throw error; return (results,fields)});
//         };
//         return this.sqlQuery.promise().query(query, function(error,results,fields){if(error) throw error; return (results,fields)});
//       };
// }
// class SqlCall {
//   constructor (sqlQuery) {
//     this.sqlQuery = sqlQuery;
//   }
//   //  this following ar the sql query connection calls
//   createSqlCall(query,params) {
//     if (params) {
//       return this.sqlQuery.promise().query(query,params, function(error,results,fields){if(error) throw error; return (results,fields)});
//     };
//     return this.sqlQuery.promise().query(query, function(error,results,fields){if(error) throw error; return (results,fields)});
//   };


// const sqlCall = (sql, params) => {
//   console.log("inside sqlCall");
//   console.log(sql);
//   console.log(params);
//   connex2sql.query(sql, params,
//     (err,res) => {
//       console.log("inside sqlCall.query");
//       console.log(err);
//       console.log(res);
//       if (err){
//         res.status(500).json({error: err.message});
//         return;
//       }
//       res.json({
//         message: "success",
//         data: res
//       });
//     });
//  };

 
module.exports = sqlCall