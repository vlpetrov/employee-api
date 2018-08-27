const moment = require('moment');

module.exports = (app, data) => {
    app.get('/api/employees', (req, res) => {
        const offset = +req.query.offset;
        const limit = +req.query.limit;
        const filter = req.query.filter;

        return data.employees.get(offset, limit, filter)
            .then((employees) => res.json({
                collection: employees[0],
                count: employees[1]
            }));
    });
    app.post('/api/employees', (req, res) => {
        const employee = req.body;
        const isDateValid = moment(req.body.dateOfBirth).isValid();
        if (!isDateValid) {
            return res.status(400).json("Invalid date.")
        }
        employee.age = moment().diff(moment(req.body.dateOfBirth), 'years');

        return data.employees.create(employee)
            .then(() => res.status(200).json('Successfully added.'))
            .catch((err) => res.status(400).json(err));
    });
    app.put('/api/employees/:id', (req, res) => {
        const employee = req.body;
        const isDateValid = moment(req.body.dateOfBirth).isValid();
        if (!isDateValid) {
            return res.status(400).json("Invalid date.")
        }
        employee.age = moment().diff(moment(req.body.dateOfBirth), 'years');
        const id = req.params.id;
        return data.employees.update(id, employee)
            .then(() => res.status(200).json('Successfully updated.'))
            .catch((err) => res.status(400).json(err));
    });
    app.delete('/api/employees/:id', (req, res) => {
        const id = req.params.id;
        return data.employees.delete(id)
            .then(() => res.status(200).json('Successfully deleted.'))
            .catch((err) => res.status(400).json(err));
    })
};
