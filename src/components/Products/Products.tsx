import React, { useContext, useEffect } from "react";
import s from "./Products.module.scss";
import { useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "../../redux/slices/productsSlice";
import { ProductType } from "../../redux/slices/types";
import { useAppDispatch } from "../../redux/store";
import { AppContext } from "../../AppContext";
import { Product } from "../Product/Product";
import { SkeletonProduct } from "../SkeletonProduct";


const categories: string[] = [
	"Суши",
	"Супы",
	"Поке&Салаты",
	"WOK",
	"Десерты",
	"Напитки",
	"Добавки"
];

export const Products: React.FC = () => {
	const dispatch = useAppDispatch();
	const { sushiRef, soupsRef, saladsRef, wokRef, dessertRef, drinkRef, additivesRef } = useContext(AppContext);
	const { products, status } = useSelector(selectProducts);

	useEffect(() => {
		const getProducts = async () => {
			dispatch(fetchProducts());
		};

		getProducts();
	}, []);

	const skeletons = [...Array(4)].map((_, index) => <div key={index} className={s.skeleton__block}><SkeletonProduct /></div>);

	const showProducts = (category: string) => {
		const productsBlock = products.filter((obj: ProductType) => obj.type === category);
		return productsBlock.map((obj: ProductType) => <Product key={obj._id} id={obj._id} {...obj} />);
	};

	const addRefs = (category: string) => {
		switch (category) {
			case "Суши": return sushiRef;
			case "Супы": return soupsRef;
			case "Поке&Салаты": return saladsRef;
			case "WOK": return wokRef;
			case "Десерты": return dessertRef;
			case "Напитки": return drinkRef;
			case "Добавки": return additivesRef;
		};
	};

	return (
		<div className={s.products}>
			{
				categories.map((category, i) => {
					return (
						<div ref={addRefs(category)} key={i} className={s.products__block}>
							<h2>{category}</h2>
							<div className={s.products__items}>
								{(status === "loading" || status === "error") ? skeletons : showProducts(category)}
							</div>
						</div>
					)
				})
			}
		</div>
	)
};