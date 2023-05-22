export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
};

export type ProductType = {
	_id: string;
	title: string;
	image: string;
	description: string;
	price: number;
	type: string;
};

//повтор в слайсах ProductItem d authSlice такой же
export type CartItemType = {
	id: string;
	image: string;
	price: number;
	title: string;
	description: string;
	count: number;
};

export type PromotionType = {
	_id: string;
	title: string;
	description: string;
	image: string;
};

export type OrderItem = {
	items: CartItemType[];
	totalPrice: number;
};

export type OrderObj = {
	order: OrderItem;
	date: string;
};

export type UserDataType = {
	_id: string;
	name: string;
	number: string;
	orders: OrderObj[];
	token: string;
};