import { CartItemType } from "../redux/slices/types";
import { selectReq } from "./selectRequest";


export const removeFromCart = async (isAuth: boolean, obj: CartItemType, url: string, token: string, dispatch: any, func: (item: CartItemType) => void) => {
	if (isAuth) {
		selectReq(obj, `/cart/${url}`, token, "Продукт удален.", dispatch, func);
	} else if (!isAuth) {
		const newItem = obj;
		const data = window.localStorage.getItem('cart');
		const cartLS = data && JSON.parse(data);

		const findItem = cartLS.find((item: CartItemType) => item.id === newItem.id);
		const findItemIndex = cartLS.findIndex((item: CartItemType) => item === findItem);

		if (url === "minusProduct") {
			if (findItem) {
				if (findItem.count > 1) {
					cartLS[findItemIndex].count -= 1;
					window.localStorage.setItem("cart", JSON.stringify(cartLS));
				} else if (findItem.count === 1) {
					cartLS.splice(findItemIndex, 1);
					window.localStorage.setItem("cart", JSON.stringify(cartLS));
				}
				dispatch(func(newItem));
			}
		} else if (url === "removeProduct") {
			if (findItem) {
				cartLS.splice(findItemIndex, 1);
				window.localStorage.setItem("cart", JSON.stringify(cartLS));
				dispatch(func(newItem));
			}
		}
	}
};