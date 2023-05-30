<template>
    <div class="home">
        <HomeNavBar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <HomeSearchBox />
        <HomeCategories />
        <div class="search-bar" v-if="isShowSearchBar">
            <SearchBar />
        </div>

        <HomeContent />

    </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'
import useScroll from '@/hooks/useScroll'
import { watch, computed } from 'vue';

//发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()


// 监听windwos创建的滚动
// 1.当我们离开页面时，我们移除监听
// 2.如果别的页面冶金学类型的监听，会编写重复代码，抽取出来封装一个hooks
// const scrollListenerHandler = window.addEventListener("scroll", () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight

//     if (clientHeight + scrollTop >= scrollHeight) {
//         homeStore.fetchHouselistData()
//     }
// })

// onMounted(() => {
//     console.log("加载了scroll事件")
//     window.addEventListener("scroll", scrollListenerHandler)
// })

// onUnmounted(() => {
//     console.log("删除了了scroll事件")
//     window.removeEventListener("scroll", scrollListenerHandler)
// })

const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouselistData().then(() => {
            isReachBottom.value = false
        })
    }
})

// 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 400
})
</script> 

<style lang="less" scoped>
.banner {
    img {
        width: 100%;
    }
}

.search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>
