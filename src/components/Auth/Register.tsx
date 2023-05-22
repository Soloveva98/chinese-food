import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { withHookFormMask } from 'use-mask-input';
import s from "./Auth.module.scss";
import { FetchRegisterArgs, fetchRegister } from '../../redux/slices/authSlice';
import { addItem } from '../../redux/slices/cartSlice';
import { CartItemType } from '../../redux/slices/types';
import { useAppDispatch } from '../../redux/store';


type RegisterProps = {
	setIsVisible: (condition: boolean) => void;
	cartLS: CartItemType[];
	selectReq: (obj: CartItemType, route: string, token: string, message: string, dispatch: any, func: (item: CartItemType) => void) => void;
};

export const Register: React.FC<RegisterProps> = ({ setIsVisible, cartLS, selectReq }) => {
	const [error, setError] = useState<string>('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit, formState: { errors } } = useForm<FetchRegisterArgs>({
		defaultValues: {
			userName: '',
			number: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FetchRegisterArgs> = async (values) => {
		const fields = {
			userName: values.userName,
			number: values.number.replace(/\(|\)|\s/g, ''),
			password: values.password
		};

		const user = await dispatch(fetchRegister(fields)).unwrap();

		if (!user) {
			setError('* Ошибка при создании пользователя.');
			return;
		}

		if (user && user.error) {
			setError('* ' + user.message);
			return;
		}

		if ('token' in user.data) {
			if (cartLS.length > 0) {
				cartLS.map(obj => {
					selectReq(obj, "/cart/addProduct", user.data.token, "Продукт добавлен.", dispatch, addItem);
				});
				window.localStorage.setItem('cart', '[]');
			}
			window.localStorage.setItem('token', user.data.token);
			setIsVisible(false);
			navigate("/");
		}
	};

	console.log("register")

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.auth__input}>
					<span>Имя</span>

					<input
						type="text"
						style={{ borderColor: errors.userName && 'red' }}
						{...register("userName", {
							required: '*Введите свое имя',
							minLength: 3,
						})}
					/>
					<p className={s.error}>{errors.userName?.message}</p>
				</div>

				<div className={s.auth__input}>
					<span>Номер телефона</span>

					<input
						type="tel"
						placeholder="8 (999) 999-99-99"
						style={{ borderColor: errors.number && 'red' }}
						{...withHookFormMask({
							...register("number", {
								required: '*Введите номер телефона',
								minLength: 16,
								maxLength: 16,
							})
						}, ['8 (999) 999 9999'])}
					/>
					<p className={s.error}>{errors.number?.message}</p>
				</div>

				<div className={s.auth__input}>
					<span>Пароль</span>
					<input
						type="password"
						style={{ borderColor: errors.password && 'red' }}
						{...register("password", {
							required: '*Введите пароль',
							minLength: {
								value: 6,
								message: '*Пароль должен содержать минимум 6 символов',
							}
						})}
					/>
					<p className={s.error}>{errors.password?.message}</p>
				</div>

				<p className="error">{error}</p>

				<div className={s.auth__footer}>
					<button type="submit" className="btn btn--big">Зарегистрироваться</button>
					<p>Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским соглашением</p>
				</div>
			</form>
		</>
	)
};