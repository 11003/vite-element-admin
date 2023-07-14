<template>
  <div>
    <div id="dplayer"></div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import DPlayer from 'dplayer';
onMounted(()=>{
  const options = {
    container: document.getElementById('dplayer'),
    theme: '#FADFA3',
    video: {
      pic: 'https://p.qpic.cn/qqgameedu/0/f52a436b3bc38e0e05fe5a1b9a1e6290_0/0',
      type: 'auto',
      url: 'https://www.artplayer.org/assets/sample/video.mp4',
    },
    contextmenu: [
      {
        text: '关于小橘子',
        click: (player) => {
          console.log(player);
        },
      },
    ],
    playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3],
  }
  const dp = new DPlayer(options);
})
</script>

<style lang="scss">
#dplayer {
  width: 80%;
  height: 980px;
}
.dplayer-menu-item:not(:first-child){
  display: none;
}
</style>
