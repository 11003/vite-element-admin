import axios from 'axios';
import { config } from "@/config"
const tools = {}

tools.getQueryString = function getQueryString(name) {
    name = name.replace(/[]/, "\[").replace(/[]/, "\[").replace(/[]/, "\\\]");
    let regexS = "[\\?&]" + name + "=([^&#]*)";
    let regex = new RegExp(regexS);
    let results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else {
        return results[1];
    }
}
tools.queryURLParams = function queryURLParams(url) {
    let pattern = /(\w+)=(\w+)/ig; //定义正则表达式
    let parames = {}; // 定义参数对象
    url.replace(pattern, ($, $1, $2) => {
        parames[$1] = $2;
    });
    return parames;
}

tools.upload = async function upload(file, success, fail) {
    const formData = new FormData()
    formData.append('file', file)
    let url = `${config().BASE_URL}/api/oss/upload`
    axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((res) => {
        console.log(res)
        if (res && res.data && res.data.errno && res.data.errno == '0') {
            if (success) { success(res.data.data.url) }
        } else {
            if (fail) { fail() }
        }
    }).catch(function (error) {
        if (fail) { fail() }
    })
}


//获取当前时间  年月日  时分秒
tools.getDate = (time, format = "yyyy-MM-dd") => {
    let date = tools.getFormatTime(time),
        dateItem = {
            yyyy: date.getFullYear(),
            MM: tools.getTimeText(date.getMonth() + 1),
            dd: tools.getTimeText(date.getDate()),
            hh: tools.getTimeText(date.getHours()),
            mm: tools.getTimeText(date.getMinutes()),
            ss: tools.getTimeText(date.getSeconds())
        };
    let text = format;
    for (let key in dateItem) {
        text = text.replace(key, dateItem[key])
    }
    return text;
}
tools.getTimeText = (time) => {
    time = String(time)
    return time[1] ? time : `0${time}`
}
// 获取时间戳
tools.getFormatTime = (time = "") => {
    if (typeof time == "object" && time != null) return time;
    if (typeof time == "string") time = time.replace(/-/g, "/");
    return time ? new Date(time) : new Date();
}


tools.setStorage = (key, val, storage) => {
    key = `${key}`
    storage = storage || localStorage
    let data = {
        value: val
    }
    storage.setItem(key, JSON.stringify(data));
}

tools.getStorage = (key, storage) => {
    key = `${key}`
    storage = storage || localStorage
    let data = storage.getItem(key);
    if (!data) return data;
    data = JSON.parse(data);
    return data.value
}

tools.getFiled = (key) => {
    return `${config().FIELD_PREFIX}-${key}`
}
export default tools
