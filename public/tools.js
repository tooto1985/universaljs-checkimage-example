(function (tools) {
  if (typeof module === 'object' && module.exports) { // Node.js
    module.exports = tools
  } else if (typeof define === 'function' && define.amd) { // AMD / RequireJS
    define([], function () {
      return tools
    })
  } else { // included directly via <script> tag
    var root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global || this
    root[tools.name] = tools
  }
})({
  name: 'tools', // global name for via <script> tag
  version: '0.0.2',
  checkImage: function (ary) { // [{width:100,height:100,size:100},{width:100,height:100,size:100}]
    if (ary.length > 3) {
      throw new Error('超過3張照片')
    }
    if (ary.some(a => a.size > 1024 * 3)) {
      throw new Error('檔案超過3kb')
    }
    if (ary.some(a => a.width > 30 || a.height > 30)) {
      throw new Error('尺寸超過30x30像素')
    }
  }
})
