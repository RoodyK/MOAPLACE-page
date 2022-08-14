<template>
  <div class="wrap">
    <AppHeader/>
    <MainVisual/>
    <div class="main">메인입니다</div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MainVisual from '@/components/MainVisual.vue'

export default {
    name: 'MainView',
    components:{
        AppHeader,
        AppFooter,
        MainVisual
    }
}
</script>

<style lang="scss" scoped>
    
</style>