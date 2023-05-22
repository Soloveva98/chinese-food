import { body } from 'express-validator';

export const registerValidation = [
	body('userName', 'Укажите имя').isLength({ min: 3 }),
	body('number').isLength({ min: 11, max: 11 }).isMobilePhone('ru-RU'),
	body('password', 'Пароль должен содержать минимум 6 символов').isLength({ min: 6 }),
];

export const loginValidation = [
	body('number').isLength({ min: 11, max: 11 }).isMobilePhone('ru-RU'),
	body('password', 'Пароль должен содержать минимум 6 символов').isLength({ min: 6 }),
];