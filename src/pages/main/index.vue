<template>
  <div class="position-fix-center board-background">
    <div class="create-room" @click="createRoom">新建房间</div>
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
    ...mapMutations(['initStore']),
    createRoom () {
      this.$router.push({
        name: 'game'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/var';

.board-background {
  position: absolute;
  width: 100%;
  height: 100%;
  .create-room {
    width: 100 * $px;
    height: 100 * $px;
    background-color: #ffffff;
    line-height: 100 * $px;
    text-align: center;
    border-radius: 5 * $px;
    box-shadow: 2px 2px 2px 2px rgba(120, 120, 120, .8);
  }
}

</style>
