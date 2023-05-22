import axios from "../axios";
import { CartItemType } from "../redux/slices/types";

export const selectReq = async (obj: CartItemType, route: string, token: string, message: string, dispatch: any, func: (item: CartItemType) => void) => {

	try {
		const item = {
			id: obj.id,
			title: obj.title,
			image: obj.image,
			description: obj.description,
			price: obj.price,
			count: 1,
		};

		const { data } = await axios.post(route, { token, item });

		if (data.message === message) {
			dispatch(func(item));
		}
	} catch (err) {
		console.log(err);
	}
};