import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsSlice from "./slices/productsSlice";
import promotionsSlice from './slices/promotionsSlice';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';


export const store = configureStore({
	reducer: {
		products: productsSlice,
		promotions: promotionsSlice,
		auth: authSlice,
		cart: cartSlice,
	},
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;