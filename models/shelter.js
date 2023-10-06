const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shelterData = new Schema({
	organizationName: String,
	longitude: Number,
	latitude: Number,
	city: String,
	street: String,
	zipCode:String,
	krs:String,
	phoneNumber:String,
	pets:[
		{
			petId: { type: Schema.Types.ObjectId, ref:"Pet"}
		}
	]
});


const shelter = new Schema({
	shelter:{
	organizationName: String,
	longitude: Number,
	latitude: Number,
	city: String,
	street: String,
	zipCode:String,
	krs:String,
	phoneNumber:String,
	},
	user:{
		type: Schema.Types.ObjectId,
    ref:'User'
	},
	pets:{
		type: Schema.Types.ObjectId,
    ref:'Pet'
	}
})




module.exports = mongoose.model("Shelter", shelterData);
