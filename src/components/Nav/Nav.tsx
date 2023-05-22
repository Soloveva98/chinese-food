import React, { useContext, useEffect, useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./Nav.module.scss";
import { AppContext } from "../../AppContext";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { selectCartItems } from "../../redux/slices/cartSlice";
import { CartItemType } from "../../redux/slices/types";

type NavProps = {
	onClickAuth: () => void;
};

export const Nav: React.FC<NavProps> = memo(({ onClickAuth }) => {

	const isAuth = useSelector(selectIsAuth);
	const cartItems = useSelector(selectCartItems);
	const totalCount = cartItems && cartItems.reduce((sum: number, item: CartItemType) => sum + item.count, 0);

	const { sushiRef, soupsRef, saladsRef, wokRef, dessertRef, drinkRef, additivesRef } = useContext(AppContext);
	const [scroll, setScroll] = useState<boolean>(false);
	const [newMenu, setNewMenu] = useState<boolean>(false);

	const onClickScroll = useCallback((nameRef: React.RefObject<HTMLDivElement>) => nameRef.current?.scrollIntoView(), []);

	useEffect(() => {
		setNewMenu(Boolean(window.localStorage.getItem("nav")));

		window.addEventListener("scroll", () => {
			if (window.pageYOffset >= 59) setScroll(true)
			else setScroll(false);
		});
	});

	useEffect(() => {
		if (window.location.pathname === "/promotions" || window.location.pathname === "/contacts" || window.location.pathname === "/account" || window.location.pathname === "/cart") {
			setNewMenu(true);
			window.localStorage.setItem('nav', "true");
		} else if (window.location.pathname === "/") {
			setNewMenu(false);
			window.localStorage.setItem("nav", String(newMenu));
		}
	}, [window.location.pathname, newMenu]);

	return (
		<div className={`${s.nav} ${scroll ? s.fixed : ''}`}>
			{
				newMenu ? (
					<ul className={s.nav__menu}>
						<li>
							<Link onClick={() => setNewMenu(false)} to="/">Меню</Link>
						</li>
						<li>
							<Link to="/promotions">Акции</Link>
						</li>
						<li>
							<Link to="/contacts">Контакты</Link>
						</li>
					</ul>
				) : (
					<ul className={s.nav__menu}>
						<li onClick={() => onClickScroll(sushiRef)}>Суши</li>
						<li onClick={() => onClickScroll(soupsRef)}>Супы</li>
						<li onClick={() => onClickScroll(saladsRef)}>Поке&Салаты</li>
						<li onClick={() => onClickScroll(wokRef)}>WOK</li>
						<li onClick={() => onClickScroll(dessertRef)}>Десерты</li>
						<li onClick={() => onClickScroll(drinkRef)}>Напитки</li>
						<li onClick={() => onClickScroll(additivesRef)}>Добавки</li>
						<li>
							<Link to="/promotions">Акции</Link>
						</li>
						<li>
							<Link to="/contacts">Контакты</Link>
						</li>
					</ul>
				)
			}

			<div className={s.nav__cart}>
				{
					isAuth ? (
						<Link className={s.login__account} to="/account" >
							<img width={25} src="images/user.svg" alt="user" />
						</Link>
					) : (
						<button onClick={onClickAuth} className={s.login__btn}>Войти</button>
					)
				}

				<Link to="/cart">
					<button className="btn">
						Корзина
						<span>
							{totalCount}
						</span>
					</button>
				</Link>
			</div>
		</div>
	)
});