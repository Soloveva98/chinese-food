import React, { useState } from 'react';
import s from './Order.module.scss';
import { OrderObj } from "..//..//redux/slices/types";

type OrderProps = {
	data: OrderObj;
};

export const Order: React.FC<OrderProps> = ({ data }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	return (
		<div className={s.account__order}>
			<div className={s.subtitle}>
				<h4>{data.date}</h4>
				<img
					width={15}
					src={`${isVisible ? 'images/arrowUp.svg' : 'images/arrowDown.svg'}`}
					onClick={() => setIsVisible(!isVisible)}
					alt="arrow"
				/>

			</div>

			<div className={`${s.order} ${isVisible ? s.visible : ''}`}>
				{
					data.order.items.map((item, i) => {
						return (
							<div key={i} className={s.order__items}>
								<img src={item.image} alt="img" />
								<p className={s.order__title}>{item.title}</p>
								<p className={s.order__price}>{item.price} ₽</p>
								<p className={s.order__count}>x {item.count}</p>
							</div>
						)
					})
				}
				<div className={s.order__total}>Сумма заказа: <span>{data.order.totalPrice} ₽</span></div>
			</div>
		</div>
	)
};