const BaseData = require('./base/base.data');
const Employee = require('../models/employee.model');

class EmployeesData extends BaseData {
    constructor(db) {
        super(db, Employee)
    }
}

module.exports = EmployeesData;
