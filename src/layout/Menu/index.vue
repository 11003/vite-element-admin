<template>
  <div class='sideBarContainer'>
    <BetterScroll ref="ItemScroll">
      <el-menu
        active-text-color="#ffd04b"
        :background-color="variables.menuBg"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#fff"
        router
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        :collapse="!$store.getters.siderType"
      >
        <el-sub-menu
          :index="''+item.id"
          v-for="(item, index) in menusList"
          :key="item.id"
        >
          <template #title>
            <el-icon>
              <component :is="iconList[index]"></component>
            </el-icon>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item
            :index="it.path"
            v-for="it in item.children"
            :key="it.id"
            @click="savePath(it.path)"
          >
            <template #title>
              <el-icon>
                <component :is="icon"></component>
              </el-icon>
              <span>{{ it.authName }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </BetterScroll>
  </div>
</template>

<script setup>
import BetterScroll from '@/components/BetterScroll/index.vue'
import { menuList } from '@/api/menu'
import { onMounted, ref } from 'vue'
import variables from '@/styles/variables.module.scss'

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
const tagIndex = ref(0)
const curIndex = ref(-1)

const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([])
const initMenusList = () => {
  menuList().then(res => {
    menusList.value = res.data
  })
}
initMenusList()

onMounted(() => {
  initScroll();
})

const ItemScroll = ref(null)
const initScroll = () => {
  let index = getTagIndex()
  setTimeout(()=>{
    if(index !== tagIndex.value) return;
    ItemScroll.value && ItemScroll.value.initScroll()
  },250)
}
const getTagIndex = () => {
  return ++tagIndex.value > 10000 ? 0 : tagIndex.value
}
const handleOpen = (key) => {
  initScroll()
  curIndex.value = key;
}
const handleClose = () => {
  initScroll()
  curIndex.value = -1;
}

const savePath = (path) => {
  sessionStorage.setItem('path', path)
}
</script>

<style lang="scss">
.sidebar-container {
  display: flex;
  flex-direction: column;
}
.sideBarContainer {
  overflow: hidden;
}
</style>
