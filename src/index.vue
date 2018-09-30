<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    let screenOrient = this.$screenOrient
    screenOrient()
    window.addEventListener('resize', screenOrient)
    window.addEventListener('pageshow', screenOrient)
  }
}
</script>
