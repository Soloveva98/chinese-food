import React from 'react';

export const Preloader: React.FC = () => {
	return (
		<div className="preloader">
			<div className="preloader__dot"></div>
			<div className="preloader__dot"></div>
			<div className="preloader__dot"></div>
			<div className="preloader__dot"></div>
			<div className="preloader__dot"></div>
			<div className="preloader__dot"></div>
		</div>
	)
};