import {FETCH_LIST,
	LIST_REQUEST,
	LIST_SUCCESS,
	LIST_FAIL } from "@src/redux/constant/cart";

const initialState = {
	data: {
		total: 0,
		list: []
	}
}

const cart = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_LIST:
			return Object.assign({}, state,{data: action.payload});
		default:
			return state
	}
}

export default cart;