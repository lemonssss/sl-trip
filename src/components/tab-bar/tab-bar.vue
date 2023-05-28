<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path" icon="home-o">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>

            </template>
        </van-tabbar>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import tabbarData from '@/assets/data/tabbar.js'
import { getAssetURL } from '@/utils/load_assets.js'
import { ref } from 'vue';
const router = useRouter()
const currentIndex = ref(0)
const itemClick = (path, index) => {
    //console.log(item)
    currentIndex.value = index
    router.push(path)
}

</script>

<style lang="less" scoped>
.tab-bar {

    // 找到类, 对类中的CSS属性重写
    // :deep(.class)找到子组件的类, 让子组件的类也可以生效
    // :deep(.van-tabbar-item__icon) {
    //     font-size: 50px;
    // }

    img {
        height: 28px;
    }
}
</style>
