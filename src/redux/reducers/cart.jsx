import {FETCH_LIST,
	LIST_REQUEST,
	LIST_SUCCESS,
	LIST_FAIL } from "@src/redux/constant/cart";

const initialState = {
	isLoading: false,
	data: {
		total: 0,
		list: []
	}
}

const cart = (state = initialState, action) => {
	switch (action.type) {
		case LIST_SUCCESS:
			return Object.assign({}, state,{data: action.payload});
		case LIST_REQUEST:
		case LIST_FAIL:
			return Object.assign({}, state, {isLoading: action.payload})
		default:
			return state
	}
}

export default cart;