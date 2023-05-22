import mongoose from "mongoose";

const PromotionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	image: {
		type: String,
		required: true,
	}
});

export default mongoose.model('Promotion', PromotionSchema);