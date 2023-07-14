<template>
  <div>
    <div class="artplayer-app"></div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import Artplayer from 'Artplayer';
onMounted(()=>{
  var art = new Artplayer({
    container: '.artplayer-app',
    url: 'https://www.artplayer.org/assets/sample/video.mp4',
    poster: 'https://p.qpic.cn/qqgameedu/0/f52a436b3bc38e0e05fe5a1b9a1e6290_0/0',
    setting: true,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    subtitleOffset: true,
    fullscreen: true,
    fullscreenWeb: true,
    theme: '#ffad00',
    hotkey: true,
    pip: true,
    miniProgressBar: true,
    fastForward: true,
    autoOrientation: true,
    thumbnails: {
      url: 'https://www.artplayer.org/assets/sample/thumbnails.png',
      number: 60,
      column: 10,
    },
  });
})

</script>

<style lang="scss" scoped>
.artplayer-app {
  width: 80%;
  height: 980px;
}
</style>
