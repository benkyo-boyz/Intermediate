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

  function trim(text) {
    var rtext;
    rtext = '';
    if (text !== null) {
      rtext = (text + '').replace(rtrim, '');
    }
    return rtext;
  }

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

    trim: function trim(text) {
      var rtext;
      rtext = '';
      if (text !== null) {
        rtext = (text + '').replace(rtrim, '');
      }
      return rtext;
    },

    text: function(e) {
      //e = e || this;
      //jquery1.0からこの分岐だとeが''の時もthisになるので置き換えが出来ない
      e = (typeof(e) === 'string')? e : this ;
      var t = '';
      for ( var j = 0; j < this.length; j++ ) {
        var r = this[j].childNodes;
        for ( var i = 0; i < r.length; i++ )
          if(typeof(e) !== 'string') {
            //nodetypeはブラウザによって差異があるそうだけど今回は考えない
            if(r[i].nodeType != 1) {
              t += trim(r[i].nodeValue);
            }
          }else {
            r[i].nodeValue = e;
          }
      }
      return t;
    },


    addClass: function(v) {
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

    removeClass: function(v) {
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

    hasClass: function(v) {
      var flg,
          classArr;
      v = this.trim(v);
      flg = false;
      for (var k = 0; k < this.length; k++) {
        var i = this[k];
        classArr = i.className.split(" ");
        if (classArr.indexOf(v) > -1) {
          flg =true;
        }
      }
      return flg;
    },

    splice: Array.prototype.splice

  }

  window.$ = $;

  require('./test');


})();
