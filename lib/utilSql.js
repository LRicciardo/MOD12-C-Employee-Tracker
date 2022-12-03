// utilities for app
const connex2sql = require("../config/connex2sql");

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

    return this.connex2db
      .promise()
      .query(cmdView)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

    return this.connex2db
      .promise()
      .query(cmdView)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

    return this.connex2db
      .promise()
      .query(cmdView)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlViewEmployeesByDept() {
    const cmdView = `SELECT 
    dept.name_long AS department,
    emp.id AS emp_id,
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

    return this.connex2db
      .promise()
      .query(cmdView)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

    return this.connex2db
      .promise()
      .query(cmdView)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlViewManagers() {
    const cmdView = `SELECT 
    mgr.id AS mgr_id,
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

    return this.connex2db
      .promise()
      .query(cmdView)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

    return this.connex2db
      .promise()
      .query(cmdView)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlViewDeptWithNoRoles() {
    const cmdView = `SELECT 
    role.id AS id,
    role.title_long AS title,
    role.title_short AS ABBR_title,
    CONCAT ("$ ", FORMAT (role.salary, 2)) AS salary,
    dept.name_long AS department
  FROM role 
  JOIN department dept
   ON dept.id = role.department_id
   WHERE ;`;

    const cmdVw = `SELECT 
    dept.name_long AS department,
    CONCAT ("$ ", FORMAT (SUM(role.salary), 2)) AS salary
  FROM employee emp
  JOIN role
    ON role.id = emp.role_id
  JOIN department dept
    ON dept.id = role.department_id
  GROUP BY dept.id;`;

    return this.connex2db
      .promise()
      .query(cmdView)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlAddDept({ longName, shortName }) {
    const cmdInsert = `INSERT INTO department ( name_long, name_short ) VALUES ( ?, ? );`;

    return this.connex2db
      .promise()
      .query(cmdInsert, [longName, shortName])
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlAddRole({ longTitle, shortTitle, salary, deptId }) {
    const cmdInsert = `INSERT INTO role ( title_long, title_short, salary, department_id ) VALUES ( ?, ?, ?, ? );`;

    return this.connex2db
      .promise()
      .query(cmdInsert, [longTitle, shortTitle, salary, deptId])
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlAddEmployee({ firstName, lastName, roleId, mgrId }) {
    const cmdInsert = `INSERT INTO employee ( first_name, last_name, role_id, manager_id ) VALUES ( ?, ?, ?, ? );`;

    return this.connex2db
      .promise()
      .query(cmdInsert, [firstName, lastName, roleId, mgrId])
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlDeptChoices() {
    const cmdSelect = `SELECT 
    id AS value, 
    name_long AS name
    FROM department;`;

    const choices = this.connex2db
      .promise()
      .query(cmdSelect)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return choices;
  }

  sqlCountsForOneDept({ deptId }) {
    const cmdSelect = `SELECT
    COUNT(*)
  FROM role 
  JOIN department dept
   ON dept.id = role.department_id
  WHERE role.department_id = ?;`;
    const params = [deptId];

    const choices = this.connex2db
      .promise()
      .query(cmdSelect, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return choices;
  }

  sqlCountsForOneRole({ roleId }) {
    // count number of employees in this role
    const cmdSelect = `SELECT
    COUNT(*)
  FROM employee
  WHERE role_id = ?;`;
    const params = [roleId];

    const choices = this.connex2db
      .promise()
      .query(cmdSelect, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return choices;
  }

  sqlRoleChoices() {
    // console.log("inside sqlRoleChoices");
    const cmdSelect = `SELECT 
    role.id AS value,
    CONCAT (role.title_long, " in ", dept.name_long) AS name
  FROM role 
  JOIN department dept
   ON dept.id = role.department_id;`;

    const choices = this.connex2db
      .promise()
      .query(cmdSelect)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return choices;
  }

  sqlEmpChoices() {
    // console.log("inside sqlMgrChoices");
    const cmdSelect = `SELECT 
    emp.id as value,
    CONCAT (emp.first_name, " ", emp.last_name, " (",   role.title_long, ") in ", dept.name_long) AS name
  FROM employee emp
  JOIN role
    ON role.id = emp.role_id
  JOIN department dept
    ON dept.id = role.department_id
  LEFT JOIN employee mgr
    ON mgr.id = emp.manager_id
  ORDER BY emp.id;`;

    const choices = this.connex2db
      .promise()
      .query(cmdSelect)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return choices;
  }

  sqlMgrChoices() {
    // console.log("inside sqlMgrChoices");
    const cmdSelect = `SELECT 
    mgr.id as value,
    CONCAT (mgr.first_name, " ", mgr.last_name, " in ", dept.name_long) AS name
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
    const choices = this.connex2db
      .promise()
      .query(cmdSelect)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return choices;
  }

  sqlOneDept({ deptId }) {
    const cmdSelId = `SELECT 
    *
    FROM department
    WHERE id = ? ;`;
    const params = [deptId];

    return this.connex2db
      .promise()
      .query(cmdSelId, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlOneRole({ roleId }) {
    const cmdSelId = `SELECT 
    *
    FROM role
    WHERE id = ? ;`;
    const params = [roleId];

    return this.connex2db
      .promise()
      .query(cmdSelId, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlOneEmp({ empId }) {
    const cmdSelId = `SELECT 
    *
    FROM employee
    WHERE id = ? ;`;
    const params = [empId];

    return this.connex2db
      .promise()
      .query(cmdSelId, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlUpdOneDept({ deptId, longName, shortName }) {
    const cmdUpdate = `UPDATE department
    SET 
    name_long = ?, 
    name_short = ? 
    WHERE id = ? ;`;
    const params = [longName, shortName, deptId];

    return this.connex2db
      .promise()
      .query(cmdUpdate, params)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlUpdOneRole({ roleId, longTitle, shortTitle, salary, deptId }) {
    const cmdUpdate = `UPDATE role
    SET
    title_long = ?, 
    title_short = ?,
    salary = ?,
    department_id = ? 
    WHERE id = ? ;`;
    const params = [longTitle, shortTitle, salary, deptId, roleId];

    return this.connex2db
      .promise()
      .query(cmdUpdate, params)
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlUpdOneEmp({ empId, firstName, lastName, roleId, mgrId }) {
    const cmdUpdate = `UPDATE employee
    SET 
    first_name = ?, 
    last_name = ?,
    role_id = ?, 
    manager_id = ? 
    WHERE id = ? ;`;
    const params = [firstName, lastName, roleId, mgrId, empId];

    return this.connex2db
      .promise()
      .query(cmdUpdate, params)
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlDelOneDept({ deptId }) {
    const cmdDelete = `DELETE FROM department
    WHERE id = ?;`;
    const params = [deptId];

    return this.connex2db
      .promise()
      .query(cmdDelete, params)
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlDelOneRole({ roleId }) {
    const cmdDelete = `DELETE FROM role
    WHERE id = ?;`;
    const params = [roleId];

    return this.connex2db
      .promise()
      .query(cmdDelete, params)
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sqlDelOneEmp({ empId }) {
    const cmdDelete = `DELETE FROM employee
   WHERE id = ?;`;
    const params = [empId];

    return this.connex2db
      .promise()
      .query(cmdDelete, params)
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new Connex2db(connex2sql);
