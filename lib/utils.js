// utilities for app
const connex2sql = require("../config/connex2sql");
const inquirer = require("inquirer");
// MySQL command call
function SqlCall(sqlCommand) {
  (this.sqlcommand = sqlcommand), (this.params = params);
  this.callSql = () => {
    return ({ error, results, fields } = connex2sql.query(
      this.query,
      this.params
    ));
  };
}

function AskQuery(questionList) {
  this.questionList = questionList;
  this.callInquirer = async () => {
    return ({ answer } = await inquirer.prompt(this.questionList));
  };
}

module.exports = new SqlCall(sqlQuery, sqlParams);
