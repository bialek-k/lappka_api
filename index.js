require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const authRoutes = require('./routes/auth')
app.use(authRoutes)


mongoose
	.connect(
		`mongodb+srv://${process.env.NODE_DB_USER_NAME}:${process.env.NODE_DB_USER_PASSWORD}@cluster0.sxyaust.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(app.listen(8080))
	.catch((err) => console.log(err));
