<template>
  <RouterView/>
</template>

<script>
export default {
  async beforeCreate() {
      await this.$store.dispatch('login/checkLogin');
      // window.Kakao.init('30a0ca9cd61e5a9e5d16b30149e2785d');
  },
}
</script>

<style>

</style>