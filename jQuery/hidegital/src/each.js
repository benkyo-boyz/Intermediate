module.exports = function (obj, callback) {
  if ($.isArray(obj)) {
    var i = 0,
        l = obj.length;
    for (; i < l; i++) {
      callback(obj[i], i);
    }
  } else {
    for (var key in obj) {
      callback(key, obj[key]);
    }
  }
}
