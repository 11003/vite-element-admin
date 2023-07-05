import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { config } from '@/config'
import store from '@/store'
import router from '@/router'
import tools from "@/utils/tool";


// export interface RequestOptions {
//     baseURL?: string;// 后端接口地址，适配接口多域名情况
//     isToken?: boolean;// 是否携带token
//     repeatRequestCancel?: boolean;// 是否开启取消重复请求
//     loading?: boolean;// 是否开启loading层效果
//     reductDataFormat?: boolean;// 是否开启简洁的数据结构响应
//     errorMessageShow?: boolean;// 是否开启接口错误信息展示
//     codeMessageShow?: boolean;// 是否开启code不为0时的信息提示
// }

const pendingMap = new Map()

const loadingInstance = {
    _target: null,
    _count: 0
}

const isDev = import.meta.env.DEV;

function setBaseURL(name, prefix) {
    return config(prefix)[name]
}

function request(
    axiosConfig,
    customOptions = {},
    loadingOptions = {}
) {
    const service = axios.create({
        // baseURL: globalBaseURL().PS_REFERRAL_BASE_URL, // 设置统一的请求前缀
        timeout: 30000 // 设置统一的超时时长
    })
    // 自定义配置
    const custom_options = Object.assign({
        baseURL: null, // 后端接口地址，适配接口多域名情况
        isToken: true, // 是否携带token
        Connection: "close",
        repeatRequestCancel: false, // 是否开启取消重复请求
        loading: false, // 是否开启loading层效果
        reductDataFormat: true, // 是否开启简洁的数据结构响应
        errorMessageShow: true, // 是否开启接口错误信息展示
        codeMessageShow: true // 是否开启code不为0时的信息提示
    }, customOptions)

    // 请求拦截
    service.interceptors.request.use(
        config => {
            // /devApi 必须跟vite.config里面的proxy一样，代理才会有效
            config.baseURL = isDev ? '/devApi' : setBaseURL(custom_options.baseURL || 'BASE_URL', customOptions.prefix)

            removePending(config)
            custom_options.repeatRequestCancel && addPending(config)
            // 创建loading实例
            if (custom_options.loading) {
                loadingInstance._count++
                if (loadingInstance._count === 1) {
                    if (loadingOptions?.text) {
                        loadingInstance._target = ElLoading.service(loadingOptions)
                    } else {
                        loadingInstance._target = ElLoading.service({
                            lock: true,
                            text: 'Loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                    }
                    // loadingInstance._target = loadingOptions?.text ? ElLoading.service(loadingOptions) : ElLoading.service({})
                }
            }
            // 自动携带token
            if (custom_options.isToken) {
                config.headers['Authorization'] = `${store.getters?.token || tools.getStorage('token') || ''}`; // 请求携带自定义token 请根据实际情况自行修改
            }

            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    // 响应拦截
    service.interceptors.response.use(
        response => {
            response.config && removePending(response.config)
            custom_options.loading && closeLoading(custom_options) // 关闭loading
            const { status, msg } = response.data.meta
            // 关于code码的判断自行修改
            if (status === '1008') {
                console.log('token失效')
                return Promise.reject(response.data)
            } else if (custom_options.codeMessageShow && response.data && +status !== 200) {
                switch (status) {
                    case '401':
                        router.push('/login')
                        break
                    default:
                        ElMessage({
                            message: msg,
                            type: 'error',
                            duration: 5 * 1000
                        })
                        break
                }
                return Promise.reject(response.data)
            } else {
                return custom_options.reductDataFormat ? response.data : response
            }
        },
        error => {
            error.config && removePending(error.config)
            custom_options.loading && closeLoading(custom_options) // 关闭loading
            custom_options.errorMessageShow && httpErrorStatusHandle(error) // 处理错误状态码
            return Promise.reject(error) // 错误继续返回给到具体页面
        }
    )

    return service(axiosConfig)
}


export default {
    request: request,
    get: (url,
        customOptions = {},
        loadingOptions = {}) => request({
            url,
            method: 'get',
        }, customOptions, loadingOptions),
    post: (url,
        data,
        customOptions = {},
        loadingOptions = {}) => request({
            url,
            method: 'post',
            data
        }, customOptions, loadingOptions)
}
/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
    // 处理被取消的请求
    if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message)
    let message = ''
    if (error && error.response) {
        switch (error.response.status) {
            case 302:
                message = '接口重定向了！';
                break
            case 422:
            case 400:
                message = '参数不正确！';
                break
            case 401:
                message = '您未登录，或者登录已经超时，请先登录！';
                break
            case 403:
                message = '您没有权限操作！';
                break
            case 404:
                message = `请求地址出错: ${error.response.config.url}`;
                break // 在正确域名下
            case 408:
                message = '请求超时！';
                break
            case 409:
                message = '系统已存在相同数据！';
                break
            case 500:
                message = '服务器内部错误！';
                break
            case 501:
                message = '服务未实现！';
                break
            case 502:
                message = '网关错误！';
                break
            case 503:
                message = '服务不可用！';
                break
            case 504:
                message = '服务暂时无法访问，请稍后再试！';
                break
            case 505:
                message = 'HTTP版本不受支持！';
                break
            default:
                message = '异常问题，请联系管理员！';
                break
        }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！'
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
    ElMessage({
        message: message,
        type: 'error',
        duration: 5 * 1000
    })
}

/**
 * 关闭Loading层实例
 * @param {*} options
 */
function closeLoading(options) {
    if (options.loading && loadingInstance._count > 0) loadingInstance._count--
    if (loadingInstance._count === 0) {
        loadingInstance._target.close()
        loadingInstance._target = null
    }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
    const pendingKey = getPendingKey(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel)
        }
    })
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
    const pendingKey = getPendingKey(config)
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey)
        // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
        cancelToken(pendingKey)
        pendingMap.delete(pendingKey)
    }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
    console.log('getPendingKey', config)
    let { data } = config
    const { url, method, params } = config
    if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
