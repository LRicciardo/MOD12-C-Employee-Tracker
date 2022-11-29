// utilities for app
const connex2sql = require('../config/connex2sql');


class Connex2db {
  constructor(connex2db) {
    this.connex2db = connex2db;
  }

  sqlViewDept() {
    const cmdView = `SELECT 
    id, 
    name_long AS Department_Name, 
    name_short AS ABBR_Dept 
    FROM department;`;   

    return this.connex2db.promise().query(cmdView).then(data => {
      // console.log(data);
      return data;
    }).catch(err => {
      console.log(err)
    });
   };

   sqlViewRoles() {
    const cmdView = `SELECT 
    role.id AS id,
    role.title_long AS title,
    role.title_short AS ABBR_title,
    CONCAT ("$ ", FORMAT (role.salary, 2)) AS salary,
    dept.name_long AS department
  FROM role 
  JOIN department dept
   ON dept.id = role.department_id;`;
   
   return this.connex2db.promise().query(cmdView).then(data => {
    // console.log(data);
    return data;
  }).catch(err => {
    console.log(err)
  });
   };

   sqlViewEmployeesById() {
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
   
  return this.connex2db.promise().query(cmdView).then(data => {
    // console.log(data);
    return data;
  }).catch(err => {
    console.log(err)
  });
   };

   sqlViewEmployeesByDept() {
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
       
  return this.connex2db.promise().query(cmdView).then(data => {
    // console.log(data);
    return data;
  }).catch(err => {
    console.log(err)
  });
   };

   sqlViewEmployeesByMgr() {
    const cmdView = `SELECT 
    CONCAT (mgr.first_name, " ", mgr.last_name) AS manager_name,
    emp.id AS emp_id,
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
       
  return this.connex2db.promise().query(cmdView).then(data => {
    // console.log(data);
    return data;
  }).catch(err => {
    console.log(err)
  });
   };

   sqlViewManagers() {
    const cmdView = `SELECT 
    mgr.id,
    CONCAT (mgr.first_name, " ", mgr.last_name) AS manager,
    role.title_long AS title,
    CONCAT ("$ ", FORMAT (role.salary, 2)) AS salary,
    dept.name_long AS department,
    CONCAT (mgr2.first_name, " ", mgr2.last_name) AS higher_exec
  FROM employee emp
  JOIN employee mgr
    ON mgr.id = emp.manager_id
  JOIN role
    ON role.id = mgr.role_id
  JOIN department dept
    ON dept.id = role.department_id
  LEFT JOIN employee mgr2
    ON mgr2.id = mgr.manager_id
  GROUP BY mgr.id
  ORDER BY mgr.manager_id;`;   
       
  return this.connex2db.promise().query(cmdView).then(data => {
    // console.log(data);
    return data;
  }).catch(err => {
    console.log(err)
  });
   };

   sqlViewBudgetByDept() {
    const cmdView = `SELECT 
    dept.name_long AS department,
    CONCAT ("$ ", FORMAT (SUM(role.salary), 2)) AS salary
  FROM employee emp
  JOIN role
    ON role.id = emp.role_id
  JOIN department dept
    ON dept.id = role.department_id
  GROUP BY dept.id;`;  
       
  return this.connex2db.promise().query(cmdView).then(data => {
    // console.log(data);
    return data;
  }).catch(err => {
    console.log(err)
  });
   };

  sqlAddDept({longName, shortName}) {
    const cmdInsert = `INSERT INTO department ( name_long, name_short ) VALUES ( ?, ? )`; 

    return this.connex2db.promise().query(cmdInsert,[longName, shortName]).then(data => {
      // console.log(data);
      return data;
    }).catch(err => {
      console.log(err)
    })
   };

   sqlAddRole({longTitle, shortTitle, salary, deptId}) {
    const cmdInsert = `INSERT INTO role ( title_long, title_short, salary, department_id ) VALUES ( ?, ?, ?, ? )`; 

    return this.connex2db.promise().query(cmdInsert,[longTitle, shortTitle, salary, deptId]).then(data => {
      // console.log(data);
      return data;
    }).catch(err => {
      console.log(err)
    })
   };

  sqlDeptChoices = async () => {
    const cmdSelect = `SELECT 
    id AS value, 
    name_long AS name
    FROM department;`; 

    const choices = this.connex2db.promise().query(cmdSelect).then(data => {
      // console.log(data);
      return data;
    }).catch(err => {
      console.log(err)
    })
    return choices;
   }

}
  
module.exports = new Connex2db(connex2sql);