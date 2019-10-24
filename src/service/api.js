import API from "./index";

export const getRecommendList = (params) => {
	return API.getData("../../mock/recommend.json", params)
}

export const getCollectionList = (params) => {
	return API.getData("../../mock/collection.json", params)
}

export const getCartList = (params) => {
	return API.getData("../../mock/cart.json", params)
}

export const getUserInfo = (params) => {
	return API.getData("../../mock/user.json", params)
}

export const getProductById = (params) => {
	return API.getData("../../mock/productDetail.json", params)
}