import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserModel from './../models/User.js';

//регистрация
export const register = async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const { userName, number, password } = req.body;


		const isUsed = await UserModel.findOne({ number });

		if (isUsed) {
			return res.json({
				error: true,
				message: 'Номер телефона уже зарегистрирован в системе, пройдите авторизацию.',
				data: null
			})
		}

		const salt = await bcrypt.genSalt(10);
		const hashPass = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			name: userName,
			number: number,
			passwordHash: hashPass
		});

		const newUser = await doc.save();

		const token = jwt.sign({
			_id: newUser._id,
		}, 'secret123', {
			expiresIn: '30d',
		});

		const { passwordHash, cart, ...userData } = newUser._doc;


		res.json({
			error: false,
			message: 'Регистрация прошла успешно.',
			data: {
				...userData,
				token,
			},
		});

	} catch (error) {
		console.log(error);
		res.json({
			error: true,
			message: "Ошибка при создании пользователя.",
			data: null
		})
	}
};

//авторизация
export const login = async (req, res) => {
	try {
		const { number, password } = req.body;

		const user = await UserModel.findOne({ number });

		if (!user) {
			return res.json({
				error: true,
				message: 'Пользователь не найден',
				data: null
			});
		}

		const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
		if (!isValidPass) {
			return res.json({
				error: true,
				message: 'Неверный логин или пароль.',
				data: null
			});
		}

		const token = jwt.sign({
			_id: user._id,
		},
			'secret123',
			{
				expiresIn: '30d',//срок жизни токена
			}
		);

		const { passwordHash, cart, ...userData } = user._doc;

		res.json({
			error: false,
			message: 'Авторизация прошла успешно.',
			data: {
				...userData,
				token,
			}
		});

	} catch (error) {
		res.json({
			error: true,
			message: "Ошибка при авторизации."
		})
	}
};

//информация обо мне
export const authMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res.json({
				error: true,
				message: 'Пользователь не найден',
				data: null
			});
		}

		const { passwordHash, cart, ...userData } = user._doc;

		res.json({
			error: false,
			message: 'Пользователь найден',
			data: { ...userData }
		});

	} catch (error) {
		res.json({
			erorr: true,
			message: 'Нет доступа',
			data: null
		});
	}
};