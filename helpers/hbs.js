module.exports = {
  truncate: function (str, len) {
    if(str.length > len && str.length > 0) {
      return str.substr(0, len) + '...'
    }
    return str
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
  }
}