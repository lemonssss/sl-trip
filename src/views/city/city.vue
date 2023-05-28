<template>
    <div class="city tab-page">
        <div class="top">
            <!-- 1.搜索框 -->
            <van-search v-model="searchValue" aria-placeholder="城市/区域/位置" shape="round" show-action @click="cancelClick" />
            <!-- 2.tab的切换 -->
            <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>

            </van-tabs>
        </div>
        <div class="content">
            <!-- <CityGroup :group-data="currentGroup" /> -->

            <template v-for="(value, key, index) in allCities">
                <CityGroup v-show="tabActive === key" :group-data="value" />
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
import CityGroup from './cpns/city-group.vue'

const router = useRouter()

// 搜索框的功能
const searchValue = ref("")
const cancelClick = () => {
    router.back()
}

// tab的切换
const tabActive = ref()
/**
 * 这个位置发送网络请求又两个缺点：
 * 1.如果网络请求太多，那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
 * 2.如果页面封装了很多子组件，子组件需要这些数据，我们必须一步步将数据传递过去(props)
 */
//网络请求：请求城市的数据
// const allcity = ref({})
// getCityAll().then(res => {
//     allcity.value = res.data
// })

//从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

//目的：从选中标签中获取数据
//1. 获取正确的Key： 将tabs中绑定的tabAction 正确绑定
//2. 根据key从allCities获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value]) 
</script>

<style lang="less" scoped>
.city {

    .top {
        position: relative;
        z-index: 9;
    }

    // //方案一：top固定定位
    // .top {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    // }

    // .content {
    //     margin-top: 98px;
    // }
    // 方案二：局部滚动
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}
</style>
