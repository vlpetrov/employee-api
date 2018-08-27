const port = Number(process.env.PORT || 3000);
const user = 'admin';
const password = 'admin';
const connectionString = `mongodb://${user}:${password}@ds215759.mlab.com:15759/employees`;

module.exports = { port, connectionString};
