import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'
import tools from "@/utils/tool";
// 登录时设置时间
export const setTokenTime = () => {
  tools.setStorage(TOKEN_TIME, Date.now())
}

// 获取
export const getTokenTime = () => {
  return tools.getStorage(TOKEN_TIME)
}

// 是否已经过期
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  return currentTime - tokenTime > TOKEN_TIME_VALUE
}
