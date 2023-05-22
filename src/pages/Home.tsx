import React, { memo } from 'react';
import { Intro, Products, PromoBlock, Delivery } from '../components';

const Home: React.FC = memo(() => {
	return (
		<>
			<Intro />
			<Products />
			<PromoBlock />
			<Delivery />
		</>
	)
});

export default Home;