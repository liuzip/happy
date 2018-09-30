<template>
  <div class="popup-overlay" :class="{'popup-hidden':!show}">
    <div class="position-fix-center popup-body display-in-column" :class="{'popup-hidden':!show}" @click.stop>
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
    handleClickCancel () {
      this.callback('cancel')
    },
    handleClickConfirm () {
      this.callback('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/var';
.popup-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  .popup-body {
    border: 1px solid #cccccc;
    border-radius: 5 * $px;
  }
}

.popup-hidden {
  display: none;
}
</style>
