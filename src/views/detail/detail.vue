<template>
    <div class="detail top-page" ref="detailRef">
        <TabControl v-if="showTabControl" class="tabs" :titles="names" @tabItemClick="tabClick" />
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart" v-memo="[mainPart]">
            <DetailSweipe :swipe-data="mainPart.topModule.housePicture.housePics" />
            <DetailInfos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
            <DetailFacility name="设施" :ref="getSectionRef"
                :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
            <DetailLandlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
            <DetailComment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
            <DetailNotice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
            <DetailMap name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
            <DetailIntro :price-intro="mainPart.introductionModule" />
        </div>

        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">乐行旅途, 永无止境!</div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { getDetailInfos } from '@/service'
import DetailSweipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'
import TabControl from '@/components/tab-control/tab-control.vue'
import useScroll from '@/hooks/useScroll';


const onClickLeft = () => {
    router.back()
}
const router = useRouter()
const route = useRoute()
const houseId = route.params.id

// 发送网络请求获取数据
const detailinfos = ref({})
const mainPart = computed(() => detailinfos.value.mainPart)
getDetailInfos(houseId).then(res => {
    detailinfos.value = res.data
})

// tabControl相关的操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
    return scrollTop.value >= 300
})

const sectionEls = ref({})
const names = computed(() => {
    return Object.keys(sectionEls.value)
})

const getSectionRef = (value) => {
    const name = value.$el.getAttribute("name")
    sectionEls.value[name] = value.$el
}

const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let instance = el.offsetTop
    if (index !== 0) {
        instance = instance - 44
    }

    detailRef.value.scrollTo({
        top: instance,
        behavior: "smooth"
    })
}

</script>

<style lang="less" scoped>
.tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
}

.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
        width: 123px;
    }

    .text {
        margin-top: 12px;
        font-size: 12px;
        color: #7688a7;
    }
}
</style>
