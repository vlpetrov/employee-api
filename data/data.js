const EmployeesData = require('./employees.data');

const init = (db) => {
    return Promise.resolve({
        employees: new EmployeesData(db)
    });
};

module.exports = { init };
