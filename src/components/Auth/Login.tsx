import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { withHookFormMask } from 'use-mask-input';
import s from "./Auth.module.scss";
import { FetchLoginArgs, fetchLogin } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import { addItem } from '../../redux/slices/cartSlice';
import { CartItemType } from '../../redux/slices/types';
import { useAppDispatch } from '../../redux/store';


type LoginProps = {
	setIsVisible: (condition: boolean) => void;
	cartLS: CartItemType[];
	selectReq: (obj: CartItemType, route: string, token: string, message: string, dispatch: any, func: (item: CartItemType) => void) => void;
};

export const Login: React.FC<LoginProps> = ({ setIsVisible, cartLS, selectReq }) => {
	const [error, setError] = useState<string>('');
	const dispatch = useAppDispatch();

	const { register, handleSubmit, formState: { errors } } = useForm<FetchLoginArgs>({
		defaultValues: {
			number: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FetchLoginArgs> = async (values) => {
		const fields = {
			number: values.number.replace(/\(|\)|\s/g, ''),
			password: values.password
		};

		const user = await dispatch(fetchLogin(fields)).unwrap();

		if (!user) {
			setError('* Ошибка при авторизации.');
			return;
		}

		if (user && user.error) {
			return setError('* ' + user.message);
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
			<Navigate to="/" />
		}
	};

	console.log("login")


	return (
		<div className={s.login}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.auth__input}>
					<span>Номер телефона</span>

					<input
						type="text"
						style={{ borderColor: errors.number && 'red' }}
						{...withHookFormMask({
							...register("number", {
								required: '*Введите номер телефона',
								maxLength: 16,
								minLength: 16,
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
								message: 'Пароль должен содержать минимум 6 символов',
							}
						})}
					/>
					<p className={s.error}>{errors.password?.message}</p>
				</div>

				<p className="error">{error}</p>

				<div className={s.auth__footer}>
					<button type="submit" className="btn btn--big">Войти</button>
					<p>Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским соглашением</p>
				</div>

			</form>
		</div>
	)
};