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
  
  ##### 12.docker常用命令
  1. docker build -t yourImageName . 生成一个镜像
  2. docker images 查看镜像列表
  3. docker rmi image 删除镜像
  4. docker rmi -f image 删除镜像
  5. docker run -d -p 80:8000 node_app_2019_10_30 npm start 根据镜像创建一个容器
  6. docker ps 查看正在运行的容器列表
  7. docker ps -all 查看所有容器列表
  8. docker start containerId 开始运行一个容器
  9. docker restart containerId 重启一个容器
  10. docker stop containerId 停止运行一个容器
  11. docker rm containerId 删除容器
  12. docker rm -f containerId 强制删除容器
  
  ##### 13.docker构建镜像工作原理和构建命令解析
  ###### ```docker build -t tagName -f DockerfilePath -q .```
  1. 【-t】: ```--tag```，镜像的名字及标签。
  2. 【-f】: 指定要使用的Dockerfile路径。
  3. 【-q】: 安静模式，成功后只输出镜像 ID。
  4. 【.】: build context（镜像构建上下文）的目录，而不是dockerfile文件的目录。
  5. 当不使用【-f】指定Dockerfile文件路径时，
  >Docker工作原理：Docker 在运行时分为 Docker 引擎（也就是服务端守护进程）和客户端工具。Docker 的引擎提供了一组 REST API，
  被称为 Docker Remote API，而如 docker 命令这样的客户端工具，则是通过这组 API 与 Docker 引擎交互，
  从而完成各种功能。因此，虽然表面上我们好像是在本机执行各种 docker 功能，
  但实际上，一切都是使用的远程调用形式在服务端（Docker 引擎）完成。
  也因为这种 C/S 设计，让我们操作远程服务器的 Docker 引擎变得轻而易举。
  docker build 命令构建镜像，其实并非在本地构建，而是在服务端，也就是 Docker 引擎中构建的。
  当构建的时候，用户会指定构建镜像上下文的路径，docker build 命令得知这个路径后，
  会将路径下的所有内容打包，然后上传给 Docker 引擎。这样 Docker引擎收到这个上下文包后，
  展开就会获得构建镜像所需的一切文件。
  
  ##### 13.linux常用命令
  1. cd / 回到根目录
  2. cd .. | cd ~ 回到上级目录
  3. ls | ll(ls -la) 查看当前目录下所有文件和文件夹
  4. mkdir dirName 创建文件夹
  5. rmdir dirName | rmdir -f dirName 删除或强制删除文件夹
  6. rm -r dirName 递归删除文件夹下所有文件
  7. whereis xxx 查看xxx安装在哪里
  8. who 查看当前登录者信息 | w 查看详细信息
  9. last 查看最近登录者列表
  10. yum install -y git 安装git
  11. rz 上传文件 如果没有安装rz，执行yum -y install lrzsz安装
  12. mv file1 file2 修改文件或文件夹名称
  
  
  ##### 13.react打包后，出现build文件夹，将其放到服务器上后，出现资源路径错误的问题
  >解决办法：在package.json文件中添加如下代码：
  ```"homepage": "."```
  
  ##### 14.Steps
  1. ```将服务端项目的文件夹和dockfile文件，放到一个父级文件夹doDocker中，打包压缩```
  2. 上传：```rz```
  2. ```unzip doDocker```
  3. ```docker build -t yourImageName .```
  4. ```docker run -d -p 80:8000 node_app_2019_10_30 npm start```
  >解释下：-p 用来指定本机端口号和容器端口号之间的映射关系，这样外网通过访问本机的80端口，
  >就能访问到容器的8000端口了,容器对外暴露的端口号在dockerfile中查看。
  5. ```curl -i localhost:80``` 
  curl 是常用的命令行工具，用来请求 Web 服务器。它的名字就是客户端（client）的 URL 工具的意思。
  它的功能非常强大，命令行参数多达几十种。如果熟练的话，完全可以取代 Postman 这一类的图形界面工具。
  （ CRUD:增查改删,即,create/read/update/delate）
 