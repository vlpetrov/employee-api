const employeesRoutes = require('./employees.routes');

module.exports = (app, data) => {
    employeesRoutes(app, data)
};
