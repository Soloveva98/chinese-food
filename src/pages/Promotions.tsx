import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { fetchPromotions, selectPromotions } from '../redux/slices/promotionsSlice';
import { PromotionType } from '../redux/slices/types';
import { SkeletonPromotion } from '../components';

const Promotions: React.FC = memo(() => {

	const { promotions, status } = useSelector(selectPromotions);
	const dispatch = useAppDispatch();

	const getPromotions = async () => {
		dispatch(fetchPromotions());
	};

	useEffect(() => {
		getPromotions();
	}, []);

	const skeletons = [...Array(8)].map((_, index) => <div key={index} className="skeletons__block"><SkeletonPromotion /></div>);

	return (
		<div className="promotions">
			<h2>Акции</h2>
			<div className="promotions__items">
				{
					(status === "loading" || status === "error")
						? skeletons
						: promotions.map((obj: PromotionType) => {
							return (
								<div key={obj._id} className="promotions__block">
									<div className="promotions__item">
										<img src={obj.image} alt="promo" />
										<div className="promotions__info">
											<h3>{obj.title}</h3>
											<p>{obj.description}</p>
										</div>
									</div>
								</div>

							)
						})
				}
			</div>
		</div>
	)
});

export default Promotions;