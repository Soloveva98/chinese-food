import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	cart: {
		type: Array,
	},
	orders: {
		type: Array,
	}
},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', UserSchema);