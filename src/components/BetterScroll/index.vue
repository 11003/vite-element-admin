<template>
  <div class='itemScroll_container'  ref='itemScrollList'>
    <div class="itemScroll_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll  from 'better-scroll'
export default {
  name:'itemScroll',
  props:{
    classIgnore:{
      type:String,
      default:""
    },
  },
  data:()=>{
    return {
      tagException:{
        tagName:/textarea/i,
      }
    }
  },
  created(){
    if(this.classIgnore){
      this.tagException.className = new RegExp(this.classIgnore,"i")
    }
    this.$nextTick(()=>{
      this.initScroll()
    })
  },
  methods:{
    initScroll(isDone){
      // tagException 这sb p标签会把span匹配到,如果想要忽略，设置为i标签 ,className 只能绑定触发元素
      // preventDefaultException 完全失效，没有合并参数
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.itemScrollList,{
            click:true,
            mouseWheel:true,
            probeType: 3,
            tagException:this.tagException
          })
          let extraTransform = {
            // 起点的属性
            start: {
              scale: 0
            },
            // 终点的属性
            end: {
              scale: 1.1
            }
          }
          this.scroll.on("scroll",this.onScroll)
          if(isDone) this.scroll.scrollTo(0,this.scroll.maxScrollY,3000, undefined, extraTransform)
          this.scroll.on("scroll",this.onScroll)
        }else{
          this.scroll.refresh();
        }
      })
    },
    onScroll(e){
      this.$emit("onScroll",e)
    },
    getScrollAttr(key){
      return this.scroll[key]
    },
    scrollTo(scrollHeight,time){
      if(time)
        this.scroll.scrollTo(0,scrollHeight,time,{
          fn:(number)=>{ return number }
        })
      else{
        this.scroll.scrollTo(0,scrollHeight)
      }
    }
  }
}
</script>
<style>
.itemScroll_container{
  height:100%;
  width:100%;
  position: relative;
  overflow: hidden;
  user-select:text;
}
</style>
