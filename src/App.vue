<template>
  <RouterView/>
</template>

<script>
export default {
  beforeCreate() {
      this.$store.dispatch('login/getMemberInfo')
  },
}
</script>

<style>

</style>