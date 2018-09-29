const MemoryStorage = function () {
  this._store = {}
}

MemoryStorage.prototype.setItem = function (key, val) {
  this._store[key] = String(val)
}
MemoryStorage.prototype.getItem = function (key) {
  return this._store.hasOwnProperty(key) ? this._store[key] : null;
}
MemoryStorage.prototype.removeItem = function (key) {
  delete this._store[key]
}
MemoryStorage.prototype.clear = function () {
  this._store = {}
}

export default MemoryStorage
