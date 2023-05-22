import React from "react";
import ContentLoader from "react-content-loader";

export const SkeletonPromotion = () => (
	<ContentLoader
		speed={25}
		width={350}
		height={240}
		viewBox="0 0 350 240"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		className="skeleton__promotion"
	>
		<rect x="0" y="0" rx="12" ry="12" width="350" height="138" />
		<rect x="0" y="157" rx="9" ry="9" width="259" height="23" />
		<rect x="-1" y="195" rx="11" ry="11" width="315" height="43" />
	</ContentLoader>
);