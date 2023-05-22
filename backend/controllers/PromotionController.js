import PromotionModel from "../models/Promotion.js";

//получение всех продуктов
export const getAllPromotions = async (req, res) => {
	try {
		const promotions = await PromotionModel.find();
		res.json(promotions);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось получить карточки текущих акций'
		});
	}
}