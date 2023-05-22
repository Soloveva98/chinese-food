import React from 'react';
import s from './Account.module.scss';
import { Order } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout, selectAuth } from '../../redux/slices/authSlice';
import { OrderObj } from '../../redux/slices/types';

const Account: React.FC = () => {
	const { data, status } = useSelector(selectAuth);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		window.localStorage.removeItem('token');
		window.localStorage.setItem("cart", "[]");
	};

	if (!window.localStorage.getItem("token")) return <Navigate to="/" />;

	if (data === null) return <></>;

	return (
		status === "loading" ? (
			<></>
		) : (
			<div className={s.account}>
				<h2>Личный кабинет</h2>
				<div className={s.account__info}>
					<p>{data.name}</p>
					<p>{data.number}</p>
				</div>

				<div className={s.account__orders}>
					<h3>Заказы</h3>
					{
						data.orders.length > 0 ? (
							data.orders.map((obj: OrderObj, i: number) => {
								return <Order key={i} data={obj} />
							})
						) : (
							<div className={s.orders__empty}>
								<img src="images/noOrders.svg" alt="noOrder" />
								<p>Вы еще ничего не заказывали :(</p>
							</div>
						)
					}
				</div>

				<button onClick={onLogout} className='btn'>Выйти</button>
			</div>
		)
	)
};

export default Account;