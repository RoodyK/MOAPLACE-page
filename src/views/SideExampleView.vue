<template>
  <div class="wrap">
    <AppHeader/>
    <SideVisual menu="MOA PLACE" img="moa"/>
    <!-- <SideVisual menu="SHOW / TICKET" img="show"/>
    <SideVisual menu="RENTAL APPLICATION" img="rental"/>
    <SideVisual menu="CUSTOMER SERVICE" img="cs"/> -->
    <TestComp/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import TestComp from '@/components/TestComp.vue'

export default {
    name: 'SideExampleView',
    components:{
        AppHeader,
        AppFooter,
        SideVisual,
        TestComp
    }
}
</script>

<style lang="scss" scoped>
    
</style>