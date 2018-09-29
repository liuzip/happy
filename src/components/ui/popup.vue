<template>
  <div class="a-overlay" :class="{'a-hidden':!show}" @click="handleClickOverlay" @touchmove.prevent>
    <div class="a-popup a-fix-bottom" :class="{'a-hidden':!show}" @click.stop>
      <div class="a-popup-title">{{title}}</div>
      <div class="a-popup-desc">
        <p v-if="dangerouslyUseHTMLString" v-html="content"></p>
        <p v-else>{{content}}</p>
      </div>
      <div class="a-btn-line">
        <div v-if="showCancelButton" class="a-btn" :class="cancelButtonClass" @click="handleClickCancel">{{cancelButtonText}}</div>
        <div class="a-btn" :class="confirmButtonClass" @click="handleClickConfirm">{{confirmButtonText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    overlayClickable: {
      type: Boolean,
      default: true
    },
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false // 是否将 content 属性作为 HTML 片段处理
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonClass: {
      type: String
    },
    cancelButtonClass: {
      type: String,
      default: 'a-btn-orange'
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClickOverlay () {
      if (this.overlayClickable) {
        this.callback('ignore')
      }
    },
    handleClickCancel () {
      this.callback('cancel')
    },
    handleClickConfirm () {
      this.callback('confirm')
    }
  }
}
</script>
