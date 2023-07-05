import request from '@/utils/request'


export const menuList = () => request.post('/index/menus')

