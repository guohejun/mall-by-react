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
//查询难度
export const getGameOpenCardLevel = (params) => {
	return API.getData("gameOpenCard/getLevels", params)
}
//查询关卡列表和用户进度
export const getGameOpenCardBarriers = (params) => {
	return API.getData("gameOpenCard/getBarriers", params)
}
//查询关卡
export const getBarrierById = (params) => {
	return API.getData("gameOpenCard/getBarrierById", params)
}
//创建或更新进度
export const addOrUpdateCardProgress = (params) => {
	return API.postData("gameOpenCard/addOrUpdateCardProgress", params)
}
//用户登录
export const login = (params) => {
	return API.postData("user/login", params)
}
//用户注册
export const register = (params) => {
	return API.postData("user/register", params)
}