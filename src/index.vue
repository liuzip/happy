<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    let detectOrient = this.$screenOrient
    detectOrient()
    window.addEventListener('resize', function () { detectOrient() })
    window.addEventListener('pageshow', function () { detectOrient() })
  }
}
</script>
