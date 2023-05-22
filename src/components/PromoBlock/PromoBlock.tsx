import React from "react";
import s from "./PromoBlock.module.scss";
import { Link } from "react-router-dom";


export const PromoBlock: React.FC = () => {
	return (
		<div className={s.promotions}>
			<h2>Наши <span>акции</span></h2>
			<div className={s.promotions__items}>
				<img src="images/promotions/1.png" alt="promotions" />
				<img src="images/promotions/2.png" alt="promotions" />
				<img src="images/promotions/3.png" alt="promotions" />
				<img src="images/promotions/4.png" alt="promotions" />
			</div>
			<Link to="/promotions"><button className="btn btn--circle">Все акции</button></Link>
		</div>
	)
};