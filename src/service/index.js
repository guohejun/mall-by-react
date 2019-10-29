import qs from "qs";
const files = require.context('../mock', false, /.json$/);


const baseUrl = window.location.protocol + "://" + window.location.host;

const getData = (url, data = {}) => {
	let query = qs.stringify(data);
	return fetch(`${baseUrl + url}${query ? '?' + query : query}`, {
		headers: {
			'content-type': 'application/json'
		},
		method: 'get',
	})
		.then(response => {
			// return response.json().then(json => {
			// 	if (!response.ok) {
			// 		return Promise.reject(json)
			// 	}
			// 	return json;
			// });
			// throw new Error(`【"${url}"】---接口未定义`);



			const keys = files.keys();
			for(let index = 0, len = keys.length; index < len; index++) {
				let fileName = keys[index].replace(/(.*\/)*([^.]+).*/ig,"$2");
				if (url.indexOf(fileName) > -1) {
					console.log("Result: ", files(keys[index]));
					return files(keys[index])
				}
			}
			throw new Error(`【"${url}"】---接口未定义`);
		})
}

const postData = (url, data = {}) => {
	return fetch(baseUrl + url, {
		body: JSON.stringify(data),
		headers: {
			'content-type': 'application/json'
		},
		method: 'POST',
	})
		.then(response => response.json())
}

export default {getData, postData};