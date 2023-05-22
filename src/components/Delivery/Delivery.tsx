import React, { memo } from "react";
import s from "./Delivery.module.scss";

export const Delivery: React.FC = memo(() => {
	return (
		<div className={s.delivery}>
			<div className={s.delivery__container}>
				<h2>Оплата и доставка</h2>
				<div className={s.delivery__items}>
					<div className={s.delivery__item}>
						<div className={s.delivery__img}>
							<img src="images/delivery/1.png" alt="delivery" />
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					</div>
					<div className={s.delivery__item}>
						<div className={s.delivery__img}>
							<img src="images/delivery/2.png" alt="delivery" />
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					</div>
					<div className={s.delivery__item}>
						<div className={s.delivery__img}>
							<img src="images/delivery/3.png" alt="delivery" />
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					</div>
					<div className={s.delivery__item}>
						<div className={s.delivery__img}>
							<img src="images/delivery/4.png" alt="delivery" />
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					</div>
				</div>
				<iframe className={s.delivery__map} src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9172.118738142844!2d82.97972170927356!3d54.91995121404217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1681114598208!5m2!1sru!2sru" loading="lazy"></iframe>
			</div>
		</div>
	)
});