-- Select all departments
SELECT *
FROM department;

-- Select all roles
--   lising id, title, salary and department
SELECT 
  role.id,
  role.title_long AS title,
  role.title_short,
  CONCAT ("$ ", FORMAT (role.salary, 2)) AS salary,
  dept.name_long AS department,
FROM role 
JOIN department dept
 ON dept.id = role.department_id;

-- Select all employees
--   lising id, name, title, salary, 
--        department and manager
SELECT 
  emp.id ,
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
ORDER BY emp.id  ;

-- Select all employees that are managers
--   lising id, name, title, salary, 
--        department and manager
SELECT 
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
ORDER BY mgr.manager_id;
-- null manager_id means they do not have a manager (should only be 1)
WHERE emp.manager_id != NULL



-- Personnel Budget by Department
SELECT 
  dept.name_long AS department,
  SUM(CONCAT ("$ ", FORMAT (role.salary, 2))) AS salary
FROM employee emp
JOIN role
  ON role.id = emp.role_id
JOIN department dept
  ON dept.id = role.department_id
GROUP BY dept.id;