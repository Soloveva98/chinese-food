import React, { memo } from "react";
import s from "./Intro.module.scss";

export const Intro: React.FC = memo(() => {
	return (
		<div className={s.intro}>
			<img src="images/intro.png" alt="intro" />
		</div>
	)
});