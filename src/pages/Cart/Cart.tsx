import React, { useState } from "react";
import s from "./Cart.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, minusItem, removeItem, selectCart } from "../../redux/slices/cartSlice";
import { CartItemType, OrderItem } from "../../redux/slices/types";
import { selectIsAuth } from "../../redux/slices/authSlice";
import axios from "../../axios";

import { CartItem, SliderCart, SuccessOrder } from "../../components";

import { addProductToCart } from "../../utils/addProductToCart";
import { removeFromCart } from "../../utils/removeFromCart";


const Cart: React.FC = () => {
	const isAuth = useSelector(selectIsAuth);
	const { items, totalPrice } = useSelector(selectCart);
	const [orderProcessed, setOrderProcessed] = useState<boolean>(false);
	const dispatch = useDispatch();

	const token = window.localStorage.getItem("token") || "";

	const onPlus = async (obj: CartItemType) => {
		addProductToCart(isAuth, obj, token, dispatch, addItem);
	};

	const onMinus = async (obj: CartItemType) => {
		removeFromCart(isAuth, obj, "minusProduct", token, dispatch, minusItem);
	};

	const onRemove = async (obj: CartItemType) => {
		removeFromCart(isAuth, obj, "removeProduct", token, dispatch, removeItem);
	};

	const removeCart = async () => {
		try {
			const { data } = await axios.post<string>('/cart/clearCart', { token });
			if (data) {
				dispatch(clearCart());
			}
		} catch (err) {
			console.log(err);
		}
	};

	const onCreateOrder = async (order: OrderItem) => {
		try {
			const { data } = await axios.post<string>('/cart/createOrder', { order, token });
			if (data) {
				setOrderProcessed(true);
				removeCart();
			}
		} catch (err) {
			console.log(err);
		}
	};

	const onClose = () => {
		setOrderProcessed(false);
	};

	return (
		<div className={s.cart}>
			<h2>Корзина</h2>
			<SuccessOrder isVisible={orderProcessed} onClose={onClose} />

			{
				items.length === 0 ? (
					<div className={s.cart__empty}>
						<img src="images/emptyCart.svg" alt="empty" />
						<p>Пусто</p>
						<Link to="/" className={s.link}>
							<img src="images/back.png" alt="back" />
							Вернуться в магазин
						</Link>
					</div>
				) : (
					<>
						<div className={s.cart__items}>
							{
								items.length > 0 && (
									items.map((obj: CartItemType) => {
										return <CartItem key={obj.id} obj={obj} onPlus={onPlus} onMinus={onMinus} onRemove={onRemove} />
									})
								)
							}
						</div>

						<h3>Добавить к заказу?</h3>
						<SliderCart onPlus={onPlus} />

						<div className={s.cart__sum}>
							Сумма заказа: <span>{totalPrice} ₽</span>
						</div>

						<div className={s.cart__footer}>
							<Link to="/" className={s.link}>
								<img src="images/back.png" alt="back" />
								Вернуться в магазин
							</Link>

							{
								isAuth ? (
									<button onClick={() => onCreateOrder({ items, totalPrice })} className="btn btn--big">
										Оформить заказ
										<img src="images/next.png" alt="next" />
									</button>
								) : (
									<>
										{!isAuth && <p className={s.cart__register}>Пройдите авторизацию для оформления заказа.</p>}
									</>
								)
							}

						</div>
					</>
				)
			}
		</div>
	)
};

export default Cart;