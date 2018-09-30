<template>
  <transition name="el-loading-fade" :class="{'hidden':!show}" @touchmove.prevent>
    <div
      class="el-loading-mask"
      :class="[customClass, { 'is-fullscreen': fullscreen }, { 'is-transparent': transparent}]">
      <div class="wrap">
        <div class="loader"></div>
        <p v-if="title" class="loading-text">{{ title }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      fullscreen: true,
      customClass: '',
      transparent: false // mask是否透明（只显示icon图标）
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String
  }
}
</script>

<style lang="scss" scoped>
.el-loading-mask {
  position: absolute;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 1);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  &.is-transparent {
    background-color: rgba(255, 255, 255, 0);
  }
  &.is-fullscreen {
    position: fixed;
  }
  .wrap {
    top: 40%;
    width: 100%;
    margin: 10px auto;
    text-align: center;
    position: absolute;
    .loader {
      background-color: #fff;
      font-size: 25px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 10px auto;
      position: relative;
      -webkit-animation: load 1s infinite ease;
      animation: load 1s infinite ease;
    }
    .loading-text {
      font-family: PingFangSC-Light;
      color: #000000;
      letter-spacing: 0;
      text-align: center;
      font-size: 16px;
    }
  }
  @keyframes load {
    0% {
      background-color: #adc2cc;
      box-shadow: 16px 0 0 0 #e4ebee, -16px 0 0 0#7799AA;
    }
    50% {
      background-color: #e4ebee;
      box-shadow: 16px 0 0 0 #7799aa, -16px 0 0 0#adc2cc;
    }
    100% {
      background-color: #7799aa;
      box-shadow: 16px 0 0 0 #adc2cc, -16px 0 0 0#e4ebee;
    }
  }
}
.el-loading-fade-enter,
.el-loading-fade-leave-active {
  opacity: 0;
}
.hidden {
  opacity: 0;
}
</style>
