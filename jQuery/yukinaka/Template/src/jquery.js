(function () {

  var $ = function (selector, context) {
    return new Core(selector, context);
  }

  $.isArray = require('./isArray');
  $.each = require('./each');

  var Core = function (selector, context) {
    context = context || document;
    var elems = context.querySelectorAll(selector);
    Array.prototype.push.apply( this, elems );
    this.context = context;
    this.selector = selector;
    return this;
    },
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  Core.prototype = {
    trim: function(text) {
      if(text === null) {
        text = ""
      } else {
        text = (text + "").replace(rtrim, "")
      }
      return text
    },
    addClass: function(name) {
      var cName = this.trim(name);

      for (var i = 0; i < this.length; i++) {
        var classArray = this[i].className.split(' ');
        if(classArray.indexOf(cName) > -1) {
          continue;
        }
        if(classArray[0] === '') {
          classArray[0] = cName;
        } else {
          classArray.push(cName);
        }
        this[i].className = classArray.join(' ');
      }
      return this;
    },
    removeClass: function(name) {
      var cName = this.trim(name);
      for (var i = 0; i < this.length; i++) {
        var classArray = this[i].className.split(' '),
            index = classArray.indexOf(cName);
        if(index <= -1) {
          continue;
        }
        classArray.splice(index, 1);
        this[i].className = classArray.join(' ');
      }
      return this;
    },

    css: function () {
    },

    each: function (callback) {
      var i = 0,
          l = this.length;
      for (; i < l; i++) {
        callback.call(this, this[i], i);
      }
    },

    get: function (index) {
      var ret = [],
          l = this.length;
      for (var i = 0; i < l; i++) {
        ret.push(this[i]);
      }
      if (typeof index === 'number') {
        ret = ret[index];
      }
      return ret;
    },

    splice: Array.prototype.splice

  }

  window.$ = $;

  require('./test');

  $('div').removeClass('hoge');
})();
