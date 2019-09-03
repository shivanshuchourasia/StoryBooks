const moment = require('moment')

module.exports = {
  truncate: function (str, len) {
    if(str.length > len && str.length > 0) {
      return str.substr(0, len) + '...'
    }
    return str
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
  },
  formatDate: function (date, format) {
    return moment(date).format(format)
  },
  select: function (selected, options) {
    return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
  },
  editIcon: function (storyUser, loggedUser, storyId, floating = true) {
    if (storyUser == loggedUser) {
      if(floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`
      } else {
        return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`
      }
    } else {
      return ''
    }
  }
}