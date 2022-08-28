<template>
  <RouterView/>
</template>

<script>
export default {
  async beforeCreate() {
      await this.$store.dispatch('login/checkLogin');
  },
}
</script>

<style>

</style>