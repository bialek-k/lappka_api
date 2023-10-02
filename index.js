require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser')

const mongoose = require("mongoose");

const authRoutes = require('./routes/auth')
const shelterRoutes = require('./routes/shelterRoutes')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(authRoutes)
// app.use(shelterRoutes)

mongoose
	.connect(
		`mongodb+srv://${process.env.NODE_DB_USER_NAME}:${process.env.NODE_DB_USER_PASSWORD}@cluster0.sxyaust.mongodb.net/Auth`
	)
	.then(app.listen(8080))
	.catch((err) => console.log(err));
