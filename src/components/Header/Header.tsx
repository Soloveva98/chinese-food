import React, { memo } from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.scss";

export const Header: React.FC = memo(() => {

	const onChangeMenu = () => {
		window.localStorage.setItem("nav", "false");
	};

	return (
		<header className={s.header}>
			<div className={s.header__left}>
				<Link onClick={onChangeMenu} to="/">
					<img src="images/logo.png" alt="logo" />
				</Link>
				<div className={s.delivery}>
					<p>Доставка еды <span>Москва</span></p>
					<p className={s.time}>Время доставки от 31 мин</p>
				</div>
			</div>
			<div className={s.header__right}>
				8 800 333-36-62
			</div>
		</header>
	)
});