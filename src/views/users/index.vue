<template>
  <div>users {{rom}}</div>
  <Vue3Lottie
    animation-link="https://assets10.lottiefiles.com/packages/lf20_swnrn2oy.json"
    :height="200"
    :width="200"
    :pause-animation="playState"
  />
  <el-button type="primary">123</el-button>
  <button @click="setPlayState">
    Play/Pause Animation
  </button>
</template>

<script setup>
import {ref} from "vue"
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
const rom = Math.floor(Math.random() * 100) + 1
const playState = ref(null)
const setPlayState = () => {
  playState.value = !playState.value
}
</script>

<style lang="scss" scoped></style>
