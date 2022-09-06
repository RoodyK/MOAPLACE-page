<template>
  <div id="detail">
    <img v-for="di, index in detailimg" :key="index" :src="di.show_detail_img">
  </div>
</template>

<script>
  import axios from '@/axios/axios.js'
  export default {
    name:"ShowDetailImg",
    data(){
      return{
        detailimg:[]
      }
    },
    created(){
      this.data();
    },
    methods:{
      data(){
        let show_num=this.$route.params.show_num;
        axios.get(`/moaplace.com/show/showdetail/${show_num}`)
          .then((resp) => {
            this.detailimg = resp.data.detailimg;
          }
        )
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../scss/common.scss';
  #detail{
    text-align: center;
    img{
      width: 100%;
      margin-top: 50px;
    }
  }
</style>