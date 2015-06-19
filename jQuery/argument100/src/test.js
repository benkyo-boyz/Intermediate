$.each(['a', 'b', 'c'], function (e, i) {
  console.log(e, i);
});

$.each({
  a: 'apple',
  b: 'banana',
  c: 'chocolate'
}, (k, v) => {
  console.log(k, v);
});

console.log($('body'));
console.log($('div'));
console.log($('div').get());
console.log($('div').get(0));
//$('body').addClass('hoge');
$('div').each(function (e, i) {
  console.log(e);
});

$("#e").removeClass("hoge");