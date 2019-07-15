class Tool {
    /**
     * 设置缓存
     * @param {*} key 
     * @param {*} value 
     * @param {*} expire 过期时间,单位ms,默认为0,无过期期限
     */
    setStorage(key, value, expire = 0) {
        let data = {
            timeStamp: null,
            value
        }
        if (expire) {
            data.timeStamp = new Date().getTime() + expire
        }
        window.localStorage.setItem(key, JSON.stringify(value))
    }
    // 取出本地存储内容
    getStorage(key, defaultValue) {
        let data = JSON.parse(window.sessionStorage.getItem(key) || '{}');
        if (data.value && data.timeStamp && data.timeStamp <= new Date().getTime()) {
            return data.value
        } else {
            return defaultValue
        }
    }
}
export default Tool;