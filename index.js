require("dotenv").config();

const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')

const mongoose = require("mongoose");

const authRoutes = require('./routes/auth')
const shelterRoutes = require('./routes/shelterRoutes')
const petRoutes = require('./routes/pet')

app.use(cors())

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
  }),
	);
	app.use(shelterRoutes)
	app.use(authRoutes)
	app.use(petRoutes)

mongoose
	.connect(
		`mongodb+srv://${process.env.NODE_DB_USER_NAME}:${process.env.NODE_DB_USER_PASSWORD}@cluster0.sxyaust.mongodb.net/Auth`
	)
	.then(app.listen(8080))
	.catch((err) => console.log(err));
