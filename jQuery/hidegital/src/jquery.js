(function () {


  //contextの中からselectorを探すよ contextはdom
  var $ = function (selector, context) {
    return new Core(selector, context);
  }

  $.isArray = require('./isArray');
  $.each = require('./each');

  var Core = function (selector, context) {
    context = context || document; //contextがなかったらdocumentが入る
    var elems = context.querySelectorAll(selector);
    Array.prototype.push.apply( this, elems );
    //Arraylikeオブジェクト オブジェクトなのに配列のようにpush、参照などをするやり方

    this.context = context;
    this.selector = selector;
    return this;
    //core　
  };

  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  Core.prototype = {

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
      for (var i = 0; i < l; i++) {  //数字の時のみオリジナルのdomを取得するため
        ret.push(this[i]);
      }
      if (typeof index === 'number') {
        ret = ret[index];
      }
      return ret;
    },

    //text: function(e) {
    //  var t = "";
    //  for ( var j = 0; j < e.length; j++ ) {
    //    var r = e[j].childNodes;
    //    for ( var i = 0; i < r.length; i++ )
    //      //t += r[i].nodeType != 1 ?
    //      //    r[i].nodeValue : jQuery.fn.text([ r[i] ]);
    //      console.log(r);
    //  }
    //  return t;
    //},

    trim: function trim(text) {
      var rtext;
      rtext = '';
      if (text !== null) {
        rtext = (text + '').replace(rtrim, '');
      }
      return rtext;
    },
    addClass: function addClass(v) {
      var cName,
          classArr,
          i;
      v = this.trim(v);
      for (var k = 0; k < this.length; k++) {
        i = this[k];
        cName = this.trim(i.className);
        classArr = cName.split(' ');
        if (classArr.indexOf(v) > -1) {
          continue;
        }
        if (classArr[0] === '') {
          classArr[0] = v;
        } else {
          classArr.push(v);
        }
        /*class追加処理*/
        if(classArr.length === 1) {
          i.className = classArr[0];
        }else {
          i.className = classArr.join(' ');
        }
        //console.log(classArr);
      }
      return this;
    },

    removeClass: function removeClass(v) {
      var cName,
          classArr,
          clearArr,
          k,
          i,
          m,
          j;
      v = this.trim(v);
      //console.log(v);
      for (k = 0; k < this.length; k++) {
        i = this[k];
        console.log(i);
        cName = this.trim(i.className);
        classArr = cName.split(' ');
        if (classArr.indexOf(v) === -1) {
          continue;
        }

        clearArr = [];
        for (j = 0; j < classArr.length; j++ ) {
          m = classArr[j];
          if (m !== v && m !== '' ) {
            clearArr.push(m);
          }
        }
        i.className = clearArr.join(' ');
      }


      return this;

    },


    splice: Array.prototype.splice

  }

  window.$ = $;

  require('./test');


})();
