import React from "react"
import ContentLoader from "react-content-loader";

export const SkeletonProduct = () => (
	<ContentLoader
		speed={25}
		width={250}
		height={350}
		viewBox="0 0 250 350"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		className="skeleton__product"
	>
		<circle cx="123" cy="72" r="72" />
		<rect x="25" y="160" rx="11" ry="11" width="200" height="15" />
		<rect x="0" y="200" rx="10" ry="10" width="250" height="71" />
		<rect x="113" y="290" rx="11" ry="11" width="137" height="43" />
		<rect x="20" y="298" rx="11" ry="11" width="70" height="28" />
	</ContentLoader>
);