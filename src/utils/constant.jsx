export const FormMap = {
    phone: {
        requireTip: '请输入手机号码',
        reg: '/^[1]/d{10}$/',
        regError: '请输入正确的手机号码',
    },
    password: {
        requireTip: '请输入密码',
        reg: '/^/d{6, 8}$/',
        regError: '请输入正确的密码'
    }
}