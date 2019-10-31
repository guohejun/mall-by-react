import {getCartList} from "@src/service/api";
import {FETCH_LIST,
	LIST_REQUEST,
	LIST_SUCCESS,
	LIST_FAIL } from "@src/redux/constant/cart";
import {Toast} from "antd-mobile";

export const cartListRequest = (data) => {
	return {
		type: LIST_REQUEST,
		payload: data
	}
};
export const cartListSuccess = (data) => {
	return {
		type: LIST_SUCCESS,
		payload: data
	}
};
export const cartListFail = (data) => {
	return {
		type: LIST_FAIL,
		payload: data
	}
};
export const fetchCartList = (params = {}) => {
	Toast.loading("", 0);
	return (dispatch) => {
		dispatch(cartListRequest(true));
		return getCartList(params).then(res => {
			if (res.code === 200) {
				dispatch(cartListSuccess(res.data));
			} else {
				dispatch(cartListFail(false));
			}
		}).finally(() => {
			Toast.hide();
			dispatch(cartListFail(false));
		})
	}
};