<template>
  <div id="video-box">
    <h1>从视频文件提取画面帧</h1>
    <input type="file">
  </div>
</template>

<script setup>
import {onMounted,nextTick} from "vue"

onMounted(() => {
  nextTick(() => {
    const inp = document.querySelector('input[type=file]');
    inp.onchange = async (e) => {
      const file = e.target.files[0];
      // const frame = await captureFrame(file, 10);
      // createPreview(frame)
      // 提取10张
      for (let i=0;i<10;i++) {
          const frame = await captureFrame(file,i*1);
          createPreview(frame)
      }
    }
  })

})

function createPreview(frame) {
  const img = document.createElement('img');
  console.log('img===>', img)
  img.src = frame.url;
  document.getElementById('video-box').appendChild(img);
}

function drawVideo(vdo) {
  return new Promise(function (resolve, reject) {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = vdo.videoWidth;
    cvs.height = vdo.videoHeight;
    ctx.drawImage(vdo, 0, 0, cvs.width, cvs.height);
    cvs.toBlob(blob => {
      resolve({
        blob,
        url: URL.createObjectURL(blob)
      })
    })
    // document.getElementById('video-box').appendChild(cvs);
  })
}

function captureFrame(vdeFile, time = 0) {
  return new Promise((resolve, reject) => {
    const vdo = document.createElement('video');
    vdo.currentTime = time;
    vdo.muted = true;
    vdo.autoplay = true;
    vdo.oncanplay = async () => {
      const frame = await drawVideo(vdo)
      resolve(frame);
    }
    vdo.src = URL.createObjectURL(vdeFile)
  })
}
</script>

<style lang="scss" >
img, video, canvas {
  width: 100px;
  height: 100px;
  display: block;
  object-fit: cover;
}
</style>
