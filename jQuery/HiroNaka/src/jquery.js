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

    addClass: function(name) {
        this[0].classList.add(name);
        return this;//thisを返すことでメソッドチェーンを可能とする
    },

    removeClass: function(name) {
        this[0].classList.remove(name);
        return this;
    },

    toggleClass: function(name) {
      var _this = this[0];
      var hasClass = _this.className;
      if (hasClass.indexOf(name) === -1) {
        _this.classList.add(name);
      } else {
        _this.classList.remove(name);
      }
      return this;
    },

    click: function(event) {
      this[0].addEventListener('click', event);
      return this;
    },

    hide: function() {
      this[0].style.display = 'none';
      return this;
    },

    show: function() {
      this[0].style.display = 'block';
      return this;
    },

    toggle: function() {
      var state = this[0].style.display;
      if (!state || state === 'block') {
        this[0].style.display = 'none';
      } else {
        this[0].style.display = 'block';
      }
      return this;
    },

    val: function(text) {
      if (text) {
        this[0].value = text;
      } else {
        return this[0].value;
      }
    },

    child: function(target) {
      console.log('child');
    },

    splice: Array.prototype.splice

  }

  window.$ = $;

  require('./test');

})();
