<template>
  <div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signed: false,
      config: {}
    }
  },
  created () {
    this.config = localStorage.get('config')
    if (!this.signed) {
      if (this.config && this.config.alias) {
        this.$popup({
          content: `确认使用账号${this.config.alias}（${this.config.phone}）登陆吗？`,
          showCancelButton: true,
          confirm: () => {
            this.saveData({
              verify: true
            })
          }
        })
      } else {
        this.$route.push({
          path: '/login'
        })
      }
    }
  }
}
</script>

<style type="scss">
@import '../scss/index.scss';
</style>
