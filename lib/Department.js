// All Depatment types will have these basic elements
class Department {
  constructor (id, name) {
      this.id = id,
      this.name = name
  };
  getName() {return this.name};
  getId() {return this.id};
  addDept() {return "Employee"};
};

module.exports = Employee