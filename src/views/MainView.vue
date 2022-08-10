<template>
  <div class="wrap">
    <AppHeader/>
    <div class="main">메인입니다</div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
    name: 'MainView',
    components:{
        AppHeader,
        AppFooter
    }
}
</script>

<style lang="scss" scoped>
    .wrap{background: url(http://prugioarthall.daewooenc.com/images/main/main_s_img02.jpg); height: 100vh;}
    .main{
        width: 500px;
        height: 1000px;
    }
</style>