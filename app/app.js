const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const init = (data) => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    require('./routes')(app, data);

    return app;
};

module.exports = { init };
