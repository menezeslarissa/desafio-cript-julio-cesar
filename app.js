const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const router = express.Router();

//Rotas
const index = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use('/', index);

module.exports = app;