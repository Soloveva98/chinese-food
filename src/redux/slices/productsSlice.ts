import { RootState } from '../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ProductType, Status } from './types';

interface ProductsSliceState {
	products: ProductType[];
	status: Status;
};

const initialState: ProductsSliceState = {
	products: [],
	status: Status.LOADING, // loading | success | error
};

export const fetchProducts = createAsyncThunk<ProductType[]>('products/fetchProducts', async () => {
	const { data } = await axios.get<ProductType[]>('/products');
	return data;
});


export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.products = [];
			state.status = Status.LOADING;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchProducts.rejected, (state) => {
			state.products = [];
			state.status = Status.ERROR;
		});
	},
});

export const selectProducts = (state: RootState) => state.products;

export const { } = productsSlice.actions;

export default productsSlice.reducer;