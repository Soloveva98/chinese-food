import { RootState } from '../store';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { findItemCart } from '../../utils/findItemCart';
import { Status, CartItemType } from './types';

interface CartSliceState {
	items: CartItemType[];
	totalPrice: number;
	status: Status;
};

export const fetchCart = createAsyncThunk<CartItemType[]>('fetchCart', async () => {
	const { data } = await axios.get<CartItemType[]>('/cart');
	return data;
});

const initialState: CartSliceState = {
	items: [],
	totalPrice: 0,
	status: Status.LOADING,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		getItems: (state, action: PayloadAction<CartItemType[]>) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;

			state.totalPrice = calcTotalPrice(action.payload);
		},
		addItem: (state, action: PayloadAction<CartItemType>) => {
			const findItem = findItemCart(state.items, action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = calcTotalPrice(state.items);
		},
		minusItem: (state, action: PayloadAction<CartItemType>) => {
			const findItem = findItemCart(state.items, action.payload.id);

			if (findItem) {
				findItem.count--;
				state.totalPrice -= findItem.price;
				if (findItem.count === 0) {
					state.items = state.items.filter(obj => obj !== findItem);
				}
			}
		},
		removeItem: (state, action: PayloadAction<CartItemType>) => {
			const findItem = findItemCart(state.items, action.payload.id);

			if (findItem) {
				state.items = state.items.filter(obj => obj !== findItem);
				state.totalPrice -= findItem.price * findItem.count;
			}
		},
		clearCart: (state) => {
			state.items = [];
			state.totalPrice = 0;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCart.pending, (state) => {
			state.items = [];
			state.status = Status.LOADING;
			state.totalPrice = 0;
		});
		builder.addCase(fetchCart.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
			state.totalPrice = calcTotalPrice(state.items);
		});
		builder.addCase(fetchCart.rejected, (state) => {
			state.items = [];
			state.status = Status.ERROR;
			state.totalPrice = 0;
		});
	},
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const { getItems, addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;