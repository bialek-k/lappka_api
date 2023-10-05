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




module.exports = mongoose.model("Shelter", shelterData);
