import jwt from 'jsonwebtoken';
import UserModel from './../models/User.js';

//получить корзину
export const getCart = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res.json({
				error: true,
				message: 'Ошибка при получении корзины. Пользователь не найден.',
				data: null
			})
		}

		const cart = user.cart;

		res.status(200).json(cart);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось получить корзину.'
		});
	}
};

//добавление продукта в корзину
export const addProduct = async (req, res) => {
	try {
		const { token, item } = req.body;
		const { _id: id } = jwt.decode(token);
		const user = await UserModel.findById(id);


		if (!user) {
			return res.status(403).json({
				error: true,
				message: 'Ошибка при добавлении в корзину. Пользователь не найден.',
			})
		}

		const cart = user.cart;
		const findItem = cart.find(obj => obj.id === item.id);
		const property = 'cart.' + cart.findIndex(obj => obj == findItem) + '.count';

		if (findItem) {
			await UserModel.updateOne(
				{ _id: id },
				{ $inc: { [property]: 1 } }
			);
		} else {
			await UserModel.updateOne(
				{ _id: id },
				{ $addToSet: { cart: item } }
			);
		}

		res.status(200).json({
			message: 'Продукт добавлен.',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось добавить продукт в корзину.'
		});
	}
};

export const minusProduct = async (req, res) => {
	try {
		const { token, item } = req.body;
		const { _id: id } = jwt.decode(token);

		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(403).json({
				error: true,
				message: 'Ошибка при удалении из корзины. Пользователь не найден.',
			})
		}

		const cart = user.cart;
		const findItem = cart.find(obj => obj.id === item.id);
		const property = 'cart.' + cart.findIndex(obj => obj == findItem) + '.count';

		if (findItem) {
			if (findItem.count === 1) {
				await UserModel.updateOne(
					{ _id: id },
					{ $pull: { cart: findItem } }
				);
			} else if (findItem.count > 1) {
				await UserModel.updateOne(
					{ _id: id },
					{ $inc: { [property]: -1 } }
				);
			}
		}

		res.status(200).json({
			message: 'Продукт удален.',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось удалить продукт из корзину.'
		});
	}
};

export const removeProduct = async (req, res) => {
	try {
		const { token, item } = req.body;
		const { _id: id } = jwt.decode(token);

		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(403).json({
				error: true,
				message: 'Ошибка при удалении из корзину. Пользователь не найден.',
			})
		}

		const cart = user.cart;
		const findItem = cart.find(obj => obj.id === item.id);

		if (findItem) {
			await UserModel.updateOne(
				{ _id: id },
				{ $pull: { cart: findItem } }
			);
		}

		res.status(200).json({
			message: 'Продукт удален.',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось удалить продукт из корзину.'
		});
	}
};

export const createOrder = async (req, res) => {
	try {
		const { order, token } = req.body;

		const { _id: id } = jwt.decode(token);
		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(403).json({
				error: true,
				message: 'Ошибка при оформлении заказа. Пользователь не найден.',
			})
		}

		const date = new Date().toISOString().slice(0, 10).split('-').reverse().join('.');

		await UserModel.updateOne(
			{ _id: id },
			{ $push: { orders: { order, date } } }
		);

		res.status(200).json({
			message: 'Заказ оформлен.',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось оформить заказ.'
		});
	}
};

export const clearCart = async (req, res) => {
	try {
		const { token } = req.body;
		console.log(token)
		const { _id: id } = jwt.decode(token);
		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(403).json({
				error: true,
				message: 'Пользователь не найден.',
			})
		}

		await UserModel.updateOne(
			{ _id: id },
			{ $set: { cart: [] } }
		);

		res.status(200).json({
			message: 'Удалено',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось отчистить корзину.'
		});
	}
};

