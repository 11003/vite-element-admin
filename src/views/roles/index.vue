<template>
  <div class='www'>
    <BetterScroll ref='ItemScroll'>
      <div v-for='item in 100'>{{item}}</div>
    </BetterScroll>
  </div>
</template>

<script>
import BetterScroll from '@/components/BetterScroll/index.vue'

export default {
  components: {
    BetterScroll
  },
  async mounted() {
    await this.initScroll()
    this.runScroll();
  },
  methods: {
    initScroll(){
      return new Promise(resolve => {
        this.$refs.ItemScroll && this.$refs.ItemScroll.initScroll()
        resolve()
      })
    },
    runScroll() {
      setTimeout(()=>{
        let maxScrollHeight = this.$refs.ItemScroll?.getScrollAttr("maxScrollY");
        let time = Math.ceil(Math.abs(maxScrollHeight) / 60) * 5;
        this.$refs.ItemScroll &&
        this.$refs.ItemScroll.scrollTo(maxScrollHeight, time * 1000);
      },1000)
    },
  }
}
</script>

<style lang="scss" scoped>
.www {
  height: 100px;
  text-align: center;
  user-select: none;
  background: #1f2d3d;
  color: #fff;
  overflow: hidden;
}
</style>
