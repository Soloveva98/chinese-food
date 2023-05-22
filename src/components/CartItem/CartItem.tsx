import React from "react";
import s from "./CartItem.module.scss";
import { CartItemType } from "..//..//redux/slices/types";

type CartItemProps = {
	obj: CartItemType;
	onPlus: (obj: CartItemType) => void;
	onMinus: (obj: CartItemType) => void;
	onRemove: (obj: CartItemType) => void;
};


export const CartItem: React.FC<CartItemProps> = ({ obj, onPlus, onMinus, onRemove }) => {
	return (
		<div key={obj.id} className={s.cart__item}>
			<div className={s.cart__left}>
				<img src={obj.image} width={80} alt="cart" />

				<div className={s.cart__info}>
					<h4>{obj.title}</h4>
					<p>{obj.description}</p>
				</div>
			</div>

			<div className={s.cart__right}>
				<p className={s.cart__price}>{obj.price * obj.count!} ₽</p>

				<div className={s.cart__count}>
					<span onClick={() => onMinus(obj)}>-</span>
					<span>{obj.count}</span>
					<span onClick={() => onPlus(obj)}>+</span>
				</div>

				<img onClick={() => onRemove(obj)} src="images/remove.png" className={s.remove} width={17} alt="remove" />
			</div>
		</div>
	)
};