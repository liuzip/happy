<template>
  <div class="popup-overlay" :class="{'popup-hidden':!show}">
    <div class="popup-body display-in-column" :class="{'popup-hidden':!show}" @click.stop>
      <div class="popup-desc">
        <div v-if="dangerouslyUseHTMLString" v-html="content"></div>
        <div v-else>{{content}}</div>
      </div>
      <div class="popup-btn display-in-row">
        <div v-if="showCancelButton" class="btn btn-sepreate-line" @click="handleClickCancel">{{cancelButtonText}}</div>
        <div class="btn" @click="handleClickConfirm">{{confirmButtonText}}</div>
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
  top: 0;
  left: 0;
  .popup-body {
    position: fixed;
    border: 1px solid #666666;
    border-radius: 5 * $px;
    width: 160 * $px;
    height: 80 * $px;
    background-color: #ffffff;
    left: 50%;
    top: 50%;
    margin-left: -80 * $px;
    margin-top: -40 * $px;
    .popup-desc {
      height: 60 * $px;
      text-align: center;
    }
    .popup-btn {
      height: 20 * $px;
      bottom: 0;
      border-top: 1px solid #666666;
      .btn {
        line-height: 20 * $px;
        text-align: center;
        width: 100%;
      }
      .btn-sepreate-line {
        margin-right: 1px solid #666666;
      }
    }
  }
}

.popup-hidden {
  display: none;
}
</style>
