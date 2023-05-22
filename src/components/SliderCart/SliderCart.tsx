import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s from "./SliderCart.module.scss";
import axios from "../../axios";
import { CartItemType } from '../../redux/slices/types';
import { ProductType } from '../../redux/slices/types';

type SliderProps = {
	onPlus: (obj: CartItemType) => void;
};

function SampleNextArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<img
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
			src="images/arrowRight.png"
			alt="arrow"
		/>
	);
};

function SamplePrevArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<img
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
			src="images/arrowLeft.png"
			alt="arrow"
		/>
	);
};


export const SliderCart: React.FC<SliderProps> = ({ onPlus }) => {
	const [additives, setAdditives] = useState<ProductType[]>([]);
	const settings = {
		slidesToShow: 4,
		slidesToScroll: 1,
		swipeToSlide: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 855,
				settings: {
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 738,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 514,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 410,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 307,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	};

	const getAdditives = async () => {
		const { data } = await axios.get<ProductType[]>('/products/additives');
		setAdditives(data);
	};

	useEffect(() => {
		getAdditives();
	}, []);

	const addAdditive = (obj: ProductType) => {
		const additive = {
			id: obj._id,
			title: obj.title,
			image: obj.image,
			description: obj.description,
			price: obj.price,
			type: obj.type,
			count: 1,
		};

		onPlus(additive);
	};

	return (
		<div className={s.slider}>
			<Slider {...settings}>
				{
					additives.length > 0 && additives.map((obj) => {
						return (
							<div key={obj._id}>
								<div className={s.slider__item}>
									<img src={obj.image} alt="additive" />
									<div>
										<p className={s.slider__title}>{obj.title}</p>
										<div>
											<span className={s.slider__price}>{obj.price} ₽</span>
											<button onClick={() => addAdditive(obj)} className="btn btn--small">
												<img src="images/plus.svg" alt="add" />
											</button>
										</div>

									</div>
								</div>
							</div>
						)
					})
				}
			</Slider>
		</div>
	)
};