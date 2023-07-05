import request from '@/utils/request'

export const login = (data) => request.post('/index/login', data)

export const test1 = (id) => request.get(`/v/wx/config?id=${id}`, {
    baseURL: null, // 后端接口地址，适配接口多域名情况
    isToken: true, // 是否携带token
    repeatRequestCancel: false, // 是否开启取消重复请求
    loading: true, // 是否开启loading层效果
    reductDataFormat: true, // 是否开启简洁的数据结构响应
    errorMessageShow: true, // 是否开启接口错误信息展示
    codeMessageShow: true // 是否开启code不为0时的信息提示
})
