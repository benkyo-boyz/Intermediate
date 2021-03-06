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
	$('div').hide().addClass('disable');
});
$('.showBtn').click(function() {
	$('div').show().removeClass('disable');
});
$('.toggleBtn').click(function() {
	$('div').toggle().toggleClass('disable');
});
$('.fadeOutBtn').click(function() {
  $('.display1').fadeOut(300).removeClass('disable');
});
$('.fadeInBtn').click(function() {
  $('.display1').fadeIn(500).addClass('disable');
});
$('.notice').click(function() {
	var val = "." + $('.noticeTarget').val();
	$(val).addClass('active');
});