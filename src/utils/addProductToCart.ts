import { CartItemType } from "../redux/slices/types";
import { selectReq } from "./selectRequest";

export const addProductToCart = async (isAuth: boolean, obj: CartItemType, token: string, dispatch: any, addItem: (item: CartItemType) => void) => {
	if (isAuth) {
		selectReq(obj, "/cart/addProduct", token, "Продукт добавлен.", dispatch, addItem);
	} else if (!isAuth) {
		const newItem = obj;
		const data = window.localStorage.getItem('cart');
		const cartLS = data && JSON.parse(data);

		const findItem = cartLS.find((obj: CartItemType) => obj.id === newItem.id);
		const findItemIndex = cartLS.findIndex((obj: CartItemType) => obj === findItem);

		if (findItem) {
			cartLS[findItemIndex].count += 1;
			window.localStorage.setItem("cart", JSON.stringify(cartLS));
		} else {
			cartLS.push(newItem);
			window.localStorage.setItem("cart", JSON.stringify(cartLS));
		}

		dispatch(addItem(newItem));
	}
};