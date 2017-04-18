var MemoryStorage = {};

var window = window || {};

var Storage = {
  getItem: function(key) {
    try {
      if (!window.localStorage) {
        return MemoryStorage[key];
      } else {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      return '';
    }
  },

  setItem: function(key, value) {
    try {
      if (!window.localStorage) {
        MemoryStorage[key] = value;
      } else {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {}
  }
}

export default Storage;
