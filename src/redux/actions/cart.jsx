import {getCartList} from "@src/service/api";
import {FETCH_LIST,
	LIST_REQUEST,
	LIST_SUCCESS,
	LIST_FAIL } from "@src/redux/constant/cart";
import {Toast} from "antd-mobile";

export const cartList = (data) => {
	return {
		type: FETCH_LIST,
		payload: data
	}
};
export const fetchCartList = (params = {}) => {
	Toast.loading("", 0);
	return (dispatch) => getCartList(params).then(res => {
		if (res.code === 200) {
			dispatch(cartList(res.data));
		} else {
			// dispatch();
		}
	}).finally(() => {
		Toast.hide();
	})
};