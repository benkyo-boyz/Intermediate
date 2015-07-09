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

$('div').each(function (e, i) {
  console.log(e);
});

$('body').addClass('piyo');
$('body').removeClass('fuga');
$('.hideBtn').click(function() {
	$('.display').hide().addClass('disable');
});
$('.showBtn').click(function() {
	$('.display').show().removeClass('disable');
});
$('.toggleBtn').click(function() {
	$('.display').toggle().toggleClass('disable');
});
$('.notice').click(function() {
	var val = "." + $('.noticeTarget').val();
	$(val).addClass('active');
});