import React, { useState, useRef, useEffect, lazy, Suspense, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './scss/app.scss';
import { AppContext } from './AppContext';
import { useWhyDidYouUpdate } from 'ahooks';


import { Header, Footer, Nav, Auth, Preloader } from "./components";
import Home from './pages/Home';

import { useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/authSlice';
import { fetchCart, getItems } from './redux/slices/cartSlice';
import { useAppDispatch } from './redux/store';

const Contacts = lazy(() => import(/* webpackChunkName: "Contacts" */'./pages/Contacts'));
const Promotions = lazy(() => import(/* webpackChunkName: "Promotions" */'./pages/Promotions'));
const Account = lazy(() => import(/* webpackChunkName: "Account" */'./pages/Account/Account'));
const Cart = lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart/Cart'));


function App() {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useAppDispatch();
	const [isVisibleAuth, setIsVisibleAuth] = useState<boolean>(false);

	const sushiRef = useRef<HTMLDivElement>(null);
	const soupsRef = useRef<HTMLDivElement>(null);
	const saladsRef = useRef<HTMLDivElement>(null);
	const wokRef = useRef<HTMLDivElement>(null);
	const dessertRef = useRef<HTMLDivElement>(null);
	const drinkRef = useRef<HTMLDivElement>(null);
	const additivesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!window.localStorage.getItem("cart")) {
			window.localStorage.setItem("cart", "[]");
		}
	}, []);

	useEffect(() => {
		const authMe = async () => {
			await dispatch(fetchAuthMe());
		};

		authMe();
	}, []);

	useEffect(() => {
		const getCart = async () => {
			if (isAuth) {
				await dispatch(fetchCart());
			} else {
				const data = window.localStorage.getItem("cart");
				const items = data ? JSON.parse(data) : [];
				dispatch(getItems(items));
			}
		};

		getCart();
	}, [isAuth])

	const onClickAuth = useCallback(() => {
		setIsVisibleAuth(true);
	}, []);

	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);


	return (
		<AppContext.Provider value={{ sushiRef, soupsRef, saladsRef, wokRef, dessertRef, drinkRef, additivesRef }}>

			<div className="wrapper">
				<div className="wrapper__container">
					<div className="wrapper__header">
						<Header />
						<Nav onClickAuth={onClickAuth} />
					</div>

					<div className="wrapper__main">
						{isVisibleAuth && <Auth isVisible={isVisibleAuth} setIsVisible={setIsVisibleAuth} />}

						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/contacts' element={
								<Suspense fallback={<Preloader />}>
									<Contacts />
								</Suspense>} />
							<Route path='/promotions' element={
								<Suspense fallback={<Preloader />}>
									<Promotions />
								</Suspense>} />
							<Route path='/cart' element={
								<Suspense fallback={<Preloader />}>
									<Cart />
								</Suspense>} />
							<Route path='/account' element={
								<Suspense fallback={<Preloader />}>
									<Account />
								</Suspense>} />
						</Routes>
					</div>

					<div className="wrapper__footer">
						<Footer />
					</div>
				</div>
			</div>
		</AppContext.Provider>
	);
};

export default App;