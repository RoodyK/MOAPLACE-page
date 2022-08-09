<template>
  <div class="wrap">
    <AppHeader/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
    name: 'MainView',
    components:{
        AppHeader
    }
}
</script>

<style lang="scss" scoped>
    .wrap{background: url(http://prugioarthall.daewooenc.com/images/main/main_s_img02.jpg); height: 100vh;}
</style>