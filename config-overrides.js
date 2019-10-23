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