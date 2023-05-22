import { CartItemType } from "../redux/slices/types";

export const findItemCart = (arr: CartItemType[], id: string) => {
	return arr.find(obj => obj.id === id);
};