import React, { memo } from "react";
import s from "./Footer.module.scss";

export const Footer: React.FC = memo(() => {
	return (
		<div className={s.footer}>
			<div className={s.footer__left}>
				<div className={s.footer__logo}>
					<img src="images/logoFooter.png" alt="logo" />
					<img src="images/logoText.png" alt="logo" />
				</div>
				<p>YaBao Все права защищены © 2021</p>
			</div>
			<div className={s.footer__contacts}>
				Остались вопросы? А мы всегда на связи:
				<p>8 800 333-36-62</p>
				<div className={s.footer__cards}>
					<img src="images/card1.png" alt="logo" />
					<img src="images/card2.png" alt="logo" />
					<img src="images/card3.png" alt="logo" />
				</div>
			</div>
		</div>
	)
});