import React, { useState } from 'react';
import s from "./Auth.module.scss";
import { Login, Register } from "..//..//components";
import { selectReq } from '../../utils/selectRequest';

type AuthProps = {
	isVisible: boolean;
	setIsVisible: (condition: boolean) => void;
};

export const Auth: React.FC<AuthProps> = ({ isVisible, setIsVisible }) => {
	const [openLogin, setOpenLogin] = useState<boolean>(true);
	const [openRegister, setOpenRegister] = useState<boolean>(false);
	const data = window.localStorage.getItem("cart");
	const cartLS = data && JSON.parse(data);

	const showLogin = () => {
		setOpenLogin(true);
		setOpenRegister(false);
	};

	const showRegister = () => {
		setOpenLogin(false);
		setOpenRegister(true);
	};

	console.log("auth")


	return (
		<div className={`${s.overlay} ${isVisible ? s.overlayVisible : ''}`}>
			<div className={s.auth}>
				<img onClick={() => setIsVisible(false)} className={s.close} width={40} src="images/close.png" alt="close" />

				<div className={s.auth__header}>
					<h3 onClick={showLogin} className={`${openLogin ? s.active : ''}`}> Вход на сайт</h3>
					<h3 onClick={showRegister} className={`${openRegister ? s.active : ''}`}>Регистрация</h3>
				</div>

				{
					openRegister ? (
						<Register setIsVisible={setIsVisible} cartLS={cartLS} selectReq={selectReq} />
					) : (
						<Login setIsVisible={setIsVisible} cartLS={cartLS} selectReq={selectReq} />
					)
				}
			</div>
		</div>
	)
};