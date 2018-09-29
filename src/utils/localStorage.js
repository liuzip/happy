import MemoryStorage from './memoryStorage'

const localStorage = window.localStorage || new MemoryStorage()

export default {
  set (key, val) {
    return localStorage.setItem(key, JSON.stringify(val))
  },
  get (key) {
    const val = localStorage.getItem(key)
    if (val === null) return null
    return JSON.parse(val)
  },
  remove (key) {
    return localStorage.removeItem(key)
  },
  clear () {
    return localStorage.clear()
  }
}
