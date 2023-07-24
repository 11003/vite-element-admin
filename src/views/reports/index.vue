<template>
  <div>reports</div>
</template>

<script setup>
import * as RongIMLib from '@rongcloud/imlib-next'
import {onMounted} from "vue";
// 应用初始化以获取 RongIMLib 实例对象，请务必保证此过程只被执行一次
RongIMLib.init({ appkey: 'pvxdm17jpfwxr' });
onMounted(()=>{
  // 添加事件监听
  const Events = RongIMLib.Events

  RongIMLib.addEventListener(Events.CONNECTING, () => {
    console.log('正在链接服务器')
  })

  RongIMLib.addEventListener(Events.CONNECTED, () => {
    console.log('已经链接到服务器')
  })

  RongIMLib.addEventListener(Events.MESSAGES, (evt) => {
    console.log(evt.messages)
  })

  RongIMLib.connect('YXfOhKzoWTI+lUU8fbIzctikyAfD/PZTcI5kV3qtoOk=@8gah.cn.rongnav.com;8gah.cn.rongcfg.com').then(res => {
    if (res.code === RongIMLib.ErrorCode.SUCCESS) {
      console.log('链接成功, 链接用户 id 为: ', res.data.userId);
    } else {
      console.warn('链接失败, code:', res.code)
    }
  })
})
</script>

<style lang="scss" scoped></style>
