import React from 'react';
import Loadable from 'react-loadable';
import Loading from "@src/component/Loading/index.jsx";

//通用的过场组件
const loadingComponent =()=>{
	return <Loading />
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = Loading)=>{
	return Loadable({
		loader,
		loading
	});
}