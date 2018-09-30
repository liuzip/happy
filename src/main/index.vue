<template>
  <div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'signed',
      'config'
    ]),
    ...mapGetters([
      'unsingedWithAlias',
      'isNewUser'
    ])
  },
  created () {
    this.initStore()
    if (this.isNewUser) {
      this.$router.push({
        name: 'login'
      })
    } else if (this.unsingedWithAlias) {
      this.$popup({
        content: `确认使用账号${this.config.alias}（${this.config.phone}）登陆吗？`,
        showCancelButton: true,
        confirmButtonText: '换个账号',
        cancelButtonText: '确认',
        confirm: () => {
          this.$router.push({
            name: 'login'
          })
        }
      })
    }
  },
  methods: {
    ...mapMutations(['initStore'])
  }
}
</script>

<style type="scss">
@import '../scss/index.scss';
</style>
