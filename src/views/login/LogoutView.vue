<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("login/logout");
  }
}
</script>

<style>

</style>