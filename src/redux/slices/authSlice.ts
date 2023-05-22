import { RootState } from '../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Status, UserDataType } from './types';


export type FetchRegisterArgs = {
	userName: string;
	number: string;
	password: string;
};

export type FetchLoginArgs = {
	number: string;
	password: string;
};

interface FetchRes {
	data: UserDataType;
	error: boolean;
	message: string;
};

interface AuthSliceState {
	data: UserDataType | null;
	status: Status;
	error: boolean;
	message: string;
};


export const fetchRegister = createAsyncThunk<FetchRes, FetchRegisterArgs>('fetchRegister', async (values) => {
	const { data } = await axios.post<FetchRes>('/register', values);
	return data;
});

export const fetchLogin = createAsyncThunk<FetchRes, FetchLoginArgs>('fetchLogin', async (values) => {
	const { data } = await axios.post<FetchRes>('/login', values);
	return data;
});

export const fetchAuthMe = createAsyncThunk<FetchRes>('fetchAuthMe', async () => {
	const { data } = await axios.get<FetchRes>('/me');
	return data;
});


const initialState: AuthSliceState = {
	data: null,
	status: Status.LOADING,
	error: false,
	message: ""
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
			state.error = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRegister.pending, (state) => {
			state.data = null;
			state.status = Status.LOADING;
			state.error = false;
			state.message = '';
		});
		builder.addCase(fetchRegister.fulfilled, (state, action) => {
			if (action.payload.error) {
				state.status = Status.ERROR;
				state.data = null;
			} else {
				state.status = Status.SUCCESS;
				state.data = action.payload.data;
			}
			state.error = action.payload.error;
			state.message = action.payload.message;
		});
		builder.addCase(fetchRegister.rejected, (state) => {
			state.data = null;
			state.status = Status.ERROR;
			state.error = true;
			state.message = "Ошибка при создании пользователя.";
		});

		builder.addCase(fetchLogin.pending, (state) => {
			state.data = null;
			state.status = Status.LOADING;
			state.error = false;
			state.message = '';
		});
		builder.addCase(fetchLogin.fulfilled, (state, action) => {
			if (action.payload.error) {
				state.status = Status.ERROR;
			} else {
				state.status = Status.SUCCESS;
			}
			state.data = action.payload.data;
			state.error = action.payload.error;
			state.message = action.payload.message;
		});
		builder.addCase(fetchLogin.rejected, (state) => {
			state.data = null;
			state.status = Status.ERROR;
			state.error = true;
			state.message = "Ошибка при авторизации.";
		});

		builder.addCase(fetchAuthMe.pending, (state) => {
			state.data = null;
			state.status = Status.LOADING;
			state.error = false;
			state.message = '';
		});
		builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
			if (action.payload.error) {
				state.status = Status.ERROR;
			} else {
				state.status = Status.SUCCESS;
			}
			state.data = action.payload.data;
			state.error = action.payload.error;
			state.message = action.payload.message;
		});
		builder.addCase(fetchAuthMe.rejected, (state) => {
			state.data = null;
			state.status = Status.ERROR;
			state.error = true;
			state.message = "Нет доступа.";
		});
	}
});

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export default authSlice.reducer;