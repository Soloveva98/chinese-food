import React from 'react';
import s from "./SuccessOrder.module.scss";

type SuccessOrderProps = {
	isVisible: boolean;
	onClose: () => void;
};

export const SuccessOrder: React.FC<SuccessOrderProps> = ({ isVisible, onClose }) => {
	return (
		<div className={`${s.success} ${isVisible ? s.visible : ''}`}>
			<img src="images/check.svg" width={27} alt="success" />
			<p>Заказ успешно оформлен</p>
			<img onClick={onClose} className={s.success__close} src="images/close.svg" width={17} alt="success" />
		</div>
	)
};