import { RootState } from '../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { PromotionType, Status } from './types';


interface PromotionsSliceState {
	promotions: PromotionType[];
	status: Status;
};

export const fetchPromotions = createAsyncThunk<PromotionType[]>('promotions/fetchPromotions', async () => {
	const { data } = await axios.get<PromotionType[]>('/promotions');
	return data;
});

const initialState: PromotionsSliceState = {
	promotions: [],
	status: Status.LOADING,
};

export const promotionsSlice = createSlice({
	name: 'promotions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPromotions.pending, (state) => {
			state.promotions = [];
			state.status = Status.LOADING;
		});
		builder.addCase(fetchPromotions.fulfilled, (state, action) => {
			state.promotions = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPromotions.rejected, (state) => {
			state.promotions = [];
			state.status = Status.ERROR;
		});
	}
})

export const selectPromotions = (state: RootState) => state.promotions;
export const { } = promotionsSlice.actions;

export default promotionsSlice.reducer;