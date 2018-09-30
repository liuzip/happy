<template>
  <div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ws: null
    }
  },
  created () {
    this.initSocket()
  },
  destroyed () {
    this.closeSocket()
  },
  methods: {
    initSocket () {
      const wsuri = process.env.WS_API
      this.ws = new WebSocket(wsuri)
      this.ws.onopen = this.wsOpen
      this.ws.onerror = this.wsErr
      this.ws.onmessage = this.wsMsg
      this.ws.onclose = this.wsClose
    },
    wsOpen () {
      console.log('socket opened')
    },
    wsErr (e) {
      console.log(e)
    },
    wsMsg (r) {
      try {
        const data = JSON.parse(r.data)
        console.log(data.value)
      } catch (e) {
        console.log(e)
      }
    },
    sendMsg (data) {
      this.ws.send(data)
    },
    wsClose () {
      console.log('socket closed')
    },
    closeSocket () {
      this.ws.close()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
