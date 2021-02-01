require('rootpath')();

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: '*'}));

// api routes
app.use('/prosecutions', require('./prosecution/prosecution.controller'));
app.use('/towns', require('./town/town.controller'));
app.use('/departments', require('./department/department.controller'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 42900;
app.listen(port, () => console.log('Server listening on port ' + port));
