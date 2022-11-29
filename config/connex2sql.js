// import and require mysql2 (client?)
const mysql = require('mysql2');

// create the connection to database
const connex2sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQLPass123!',
  database: 'personnel_db'
});

connex2sql.connect((err)=> {
  if (err) {
   console.error(`error connecting: ${err.stack}`);
   return;
  } 
  console.log(`connected as id: ${connex2sql.threadId}`);
});

module.exports = connex2sql;