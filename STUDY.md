## 知识记述
+ 1.react-router 和 react-router-dom 的区别
+ 2.引用 antd-mobile 插件，使用 babel-plugin-import 插件，在 package.json 文件中设置全局引用 antd-mobile 的样式文件
+ 3.preact 和 react 的区别
+ 4.react 组件中绑定 this 的四种方式

   - 第四种：
     事件定义：采用箭头函数定义；事件调用：采用箭头函数包裹

   ```
   onLinkTo = (e, item) => {
    this.props.history.push({
      pathname: item.appUrl
    })
   }
   ```

   ```
   <Flex>
    {this.state.noticeList.map((item, index) => (
        <Flex.Item key={index} className="cardItem" onClick={(e) => this.onLinkTo(e, item)}>
        <img src="{item.imgUrl}" alt="" className="cardItem__img"/>
        <div className="cardItem__right">
            <p className="title">{item.title}</p>
        </div>
        </Flex.Item>
    ))}
    </Flex>
   ```

---

## vsCode 插件列表

- [vsCode 插件列表](https://blog.csdn.net/weixin_39876634/article/details/88562183)

---

## antd-mobile 官方文档

- [antd-mobile 官方文档](https://mobile.ant.design/docs/react/introduce-cn)

---

## React中文官方文档

- [react 中文官方文档](https://react.docschina.org/docs/components-and-props.html)

---

## VsCode设置：

#### 在 Settings->Workbench->Appearance->Edit in settings.json 文件根级，添加代码：

```
// 使用Tab键完成标签自动补全
"emmet.triggerExpansionOnTab":true,

// 自动补全的语言设置：包括html和jsx
"emmet.includeLanguages": {
  "vue-html": "html",
  "javascript": "javascriptreact"
}
// 控制是否在搜索中跟踪符号链接(降低vsCode对CPU的高额消耗)
"search.followSymlinks": false
```

---