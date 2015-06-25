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
  }

  Core.prototype = {

    css: function () {
    }

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
