SELECT *
FROM department;

SELECT 
  role.id,
  role.title_long,
  role.title_short,
  role.salary,
  dept.name_long,
FROM role 
JOIN department dept
 ON dept.id = role.department_id;

SELECT 
  emp.id ,
  emp.first_name,
  emp.last_name,
  role.name_long AS position,
  role.salary,
  dept.name_long AS department,
  mgr.first_name,
  mgr.last_name,
FROM employee emp
JOIN role
  ON role.id = emp.role_id
JOIN department dept
  ON dept.id = role.department_id
LEFT JOIN employee mgr
  ON mgr.id = emp.manager_id
ORDER BY emp.id  ;