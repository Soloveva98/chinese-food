import React from "react";
import s from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { addProductToCart } from "../../utils/addProductToCart";

type ProductProps = {
	id: string;
	title: string;
	image: string;
	description: string;
	price: number;
};

export const Product: React.FC<ProductProps> = ({ id, title, image, description, price }) => {
	const isAuth = useSelector(selectIsAuth);
	const token = window.localStorage.getItem("token") || "";
	const dispatch = useDispatch();

	const onClickAdd = async () => {
		const obj = {
			id: id,
			title: title,
			image: image,
			description: description,
			price: price,
			count: 1
		};

		addProductToCart(isAuth, obj, token, dispatch, addItem);
	};

	return (
		<div className={s.product__block}>
			<div className={s.product}>
				<img src={image} alt="product" />
				<h3>{title}</h3>
				<p className={s.description}>{description}</p>
				<div className={s.product__footer}>
					<p>{price} ₽</p>
					<button onClick={onClickAdd} className="btn">В корзину</button>
				</div>
			</div>
		</div>
	)
};