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

export const getCartData = (params) => {
	return API.getData("../../mock/cart.json", params)
}

export const getGameOpenCardLevel = (params) => {
	return API.getData("gameOpenCard/getLevels", params)
}

export const createGameOpenCardLevel = (params) => {
	return API.postData("gameOpenCard/createLevel", params)
}

export const getGameOpenCardBarriers = (params) => {
	return API.getData("gameOpenCard/getBarriers", params)
}

export const createGameOpenCardBarriers = (params) => {
	return API.postData("gameOpenCard/createBarriers", params)
}
//用户登录
export const login = (params) => {
	return API.postData("user/login", params)
}