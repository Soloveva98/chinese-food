import ProductModel from "../models/Product.js";

//получение всех продуктов
export const getAllProducts = async (req, res) => {
	try {
		const products = await ProductModel.find();
		res.json(products);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось получить карточки продуктов'
		});
	}
};

//получение только добавок
export const getAdditives = async (req, res) => {
	try {
		const additives = await ProductModel.find({ type: "Добавки" });
		
		if (!additives) {
			res.status(500).json({
				message: 'Не удалось получить карточки добавок'
			});
		}

		res.json(additives);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось получить карточки добавок'
		});
	}
}