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
        callback.apply(this, [this[i], i]);
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
      this.each(function(elem,i) {
        elem.classList.add(name);
      });
      return this;//thisを返すことでメソッドチェーンを可能とする
    },

    removeClass: function(name) {
      this.each(function(elem,i) {
        elem.classList.remove(name);
      });
      return this;
    },

    toggleClass: function(name) {
      this.each(function(elem,i) {
        var hasClass = elem.className;
        if (hasClass.indexOf(name) === -1) {
          elem.classList.add(name);
        } else {
          elem.classList.remove(name);
        }
      });
      return this;
    },

    click: function(event) {
      this[0].addEventListener('click', event);
      return this;
    },

    hide: function() {
      this.each(function(elem,i) {
        elem.style.display = 'none';
      });
      return this;
    },

    show: function() {
      this.each(function(elem,i) {
        elem.style.display = 'block';
      });
      return this;
    },

    toggle: function() {
      this.each(function(elem,i) {
        var state = elem.style.display;
        if (!state || state === 'block') {
          elem.style.display = 'none';
        } else {
          elem.style.display = 'block';
        }
      });
      return this;
    },

    fadeOut: function(time) {
      var _this = this[0];
      if(_this.style.display === 'none') return this;
      var stepTime = Math.floor(1000 / 60);
      var step = Math.floor((stepTime * 1000) / time) / 1000;
      if(!_this.style.opacity) _this.style.opacity = 1;
      var Timer = function() {
        setTimeout(function() {
          _this.style.opacity -= step;
          if(_this.style.opacity > 0) {
            Timer();
          } else {
            _this.style.display = "none";
            _this.style.opacity = "";
          }
        }, stepTime);
      };
      Timer();
      return this;
    },

    fadeIn: function(time) {
      //途中です
      var _this = this[0];
            _this.style.display = "block";
            var num = Number(_this.style.opacity) + 0.1;
            console.log(typeof num);
          _this.style.opacity = num;
          console.log('hoge');
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
