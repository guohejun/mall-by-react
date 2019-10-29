##### 1.使用create-react-app脚手架创建项目，更改默认端口号
```
"scripts": {
  "start": "set PORT=8081 && react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
};
```

##### 2.create-react-app创建项目修改配置项的两种方法
1. 运行npm run eject，将配置文件暴露出来，然后修改。

2. 安装react-app-rewired
	```
	npm install react-app-rewired --save
	```
	
	修改package.json,原本的react-script 改为react-app-rewired　　
	
	```
	"scripts": {
	   "start": "react-app-rewired start",
	   "build": "react-app-rewired build",
	   "test": "react-app-rewired test",
	   "eject": "react-app-rewired eject"
	};
	```
	
	在根目录下新建config-overrides.js,在config-overrides.js里更改配置项，项目启动的时候会先在config-overrides.js里读数据，对webpack里的默认文件进行整合，最后才会启动。

  ```
  const {override, fixBabelImports, addWebpackAlias, addLessLoader} = require('customize-cra')
  const path = require('path')
  
  function resolve(dir) {
  	return path.join(__dirname, '.', dir)
  }
  
  module.exports = override(
  	// 配置路径别名
  	addWebpackAlias({
  		"@src": path.resolve(__dirname, 'src')
  	}),
  	// 按需加载
  	fixBabelImports('import', {
  		libraryName: 'antd-mobile',
  		libraryDirectory: 'es',
  		style: 'css'
  	}),
  	addLessLoader({
  		javascriptEnabled: true,
  		modifyVars: {
  			'@primary-color': '#1DA57A'
  		}
  	})
  )
  ```
  
  ##### 3.antd-mobile中tabbar组件，不支持合并外界className,但比如Carousel组件支持，看来具体还是看组件呀
  
  ##### 4.子组件中调用```this.props.history.push()```方法报错，提示```Cannot read property 'push' of undefined```
  1. ```react-router v3```中，路由跳转一般是从react-router导出```browserHistory```，然后使用```browserHistory.push()```等等方法操作路由跳转。
  2. ```react-router v4```中，子组件调用history.push方法，需要使用```withRouter```函数包裹组件，或者从父组件传递参数```history```到子组件使用。
  
  ##### 5.propTypes是干嘛的？
  >propTypes，是用于数据类型检测的，在react中，主要用于组件参数类型的检测。具体请参考官网文档介绍。
  
  >https://reactjs.org/docs/typechecking-with-proptypes.html
  
  ##### 6.菜单栏切换页面时，菜单栏也会跟着闪烁，该如何解决？
  
  ##### 7.ListView组件的使用，创建数据源的方式，至于每一个行row得到的数据是数组中某一项item的某个属性值，是因为错误的使用了cloneWithRowsAndSections方法，正确的应该是cloneWithRows
  >创建数据源，要通过```new ListView.DataSource()```的方式创建生成一个构造函数的实例。
  
  >更新数据源时，要使用方法```cloneWithRows```或```cloneWithRowsAndSections```方法更新。
  
  ``` 
  const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  this.state = {
    pageNum: 1,
    pageSize: 5,
    dataSource: dataSource.cloneWithRows(this.initData),
    refreshing: false,
    isLoading: true,
    down: true,
  }
  ```
  
  ##### 8.架构项目需要注意至少完备哪些功能点？
  1. 请求封装，请求拦截，响应拦截，拦截信息提示。
  2. 字体图标使用，具体采用哪种方案（配置svg-loader、封装icon组件等）。
  3. 移动端封装长列表无限加载、下拉刷新组件；
  4. 配置资源文件路径别名（alias）。
  5. 移动端页面尺寸处理（rem或vw控制）。
  6. 样式重置（区分PC和移动端）（reset.css或叫normal.css）。
  7. html页面meta属性设置（区分PC和移动端）。
  8. 公共API封装。
  9. 状态管理全局配置（Vue的Vuex或react的react-redux）。
  10. 每个项目根目录创建Study.md文件，总结问题，积累经验。
  11. 路由懒加载。
  
  ##### 9.开发界约定性别：1（男） 2（女） 0（未知）
  
  ##### 10.CSS3新增的关键字 ```currentColor```
  >用于表示使用当前元素的color色值。
  
  ##### 11.redux和react-redux模块化封装/使代码看起来整洁/逻辑清晰的正确姿势？