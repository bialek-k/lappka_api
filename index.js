require("dotenv").config();


const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')

const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('./configs/cloudinary');

const mongoose = require("mongoose");

const authRoutes = require('./routes/auth')
const petRoutes = require('./routes/pet')
const storageRoutes = require('./routes/storage')
const shelterRoutes = require('./routes/shelterRoutes');

app.use(cors())
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
  }),
	);
	
app.use(authRoutes)
app.use(petRoutes)
app.use(storageRoutes)
app.use(shelterRoutes)

cloudinary.config(cloudinaryConfig.config);

mongoose
	.connect(
		`mongodb+srv://${process.env.NODE_DB_USER_NAME}:${process.env.NODE_DB_USER_PASSWORD}@cluster0.sxyaust.mongodb.net/Auth`
	)
	.then(app.listen(8080))
	.catch((err) => console.log(err));
