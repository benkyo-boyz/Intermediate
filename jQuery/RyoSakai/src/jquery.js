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
  };

  Core.prototype = {

    trim_full: function(text) {
      return text.replace(/^[¥s ]+|[¥s ]+$/g, "")
    },

    toggleClass: function(name, mode_value) {
      var mode = mode_value || 0;
      var set_list = this.trim_full(name).split(' ');
      var elem, setName, base_list, index;
      for (var i = 0, len = this.length; i < len; i++) {
        elem = this[i];
        if (elem.nodeType !== 1) {
          continue;
        }

        if (this.trim_full(elem.className) == "") {
          base_list = [];
        } else {
          base_list = elem.className.split(' ');
        }

        for (var j = 0, l = set_list.length; j < l; j++) {
          setName = this.trim_full(set_list[j]);
          if (setName == "") {
            continue;
          }

          index = base_list.indexOf(setName);
          if (mode == 1 && index > -1 || mode == 2 && index < 0) {
            continue;
          } else if (!mode) {
            index < 0 ? mode = 1: mode = 2;
          }

          if (mode == 1) {
            base_list.push(setName);
          } else {
            base_list.splice(index, 1);
          }
        }
        elem.className = base_list.join(' ');
      }
      return this;
    },

    addClass: function(name) {
      return this.toggleClass(name, 1);
    },

    removeClass: function(name) {
      return this.toggleClass(name, 2);
    },

    find: function (name) {
      var count = 0;
      for (var i = 0, len = this.length; i < len; i++) {
        var elem = this[i];
        var elems = elem.querySelectorAll(name);
        for (var j = 0, l = elems.length; j < l; j++) {
          this[count++] = elems[j];
        }
      }

      this.selector = name;
      if (count > 0 && len > count) {
        this.splice(count, len - count);
      }

      console.log(this);
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

})();
