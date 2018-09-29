<template>
  <div>
    <div>请输入昵称</div>
    <div>
      <input type="text" v-bind="alias">
    </div>
    <div>请输入手机号</div>
    <div>
      <input type="text" v-bind="phone">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      alias: '',
      phone: ''
    }
  }
}
</script>

<style type="scss">
@import '../scss/index.scss';
</style>
