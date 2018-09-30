<template>
  <div>
    <div>请输入昵称</div>
    <div>
      <input type="text" v-model="alias">
    </div>
    <div>请输入手机号</div>
    <div>
      <input type="text" v-model="phone">
    </div>
    <div @click="confirm">确认</div>
    <div @click="cancel">取消</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      alias: '',
      phone: ''
    }
  },
  methods: {
    ...mapMutations(['signIn']),
    confirm () {
      this.signIn({
        alias: this.alias,
        phone: this.phone
      })
      this.$screenOrient(false)
      this.$router.back()
    },
    cancel () {
      this.$screenOrient(false)
      this.$router.back()
    }
  },
  created () {
    this.$screenOrient(true)
  }
}
</script>

<style lang="scss" scoped>
</style>
