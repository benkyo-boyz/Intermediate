
mocha.setup 'bdd'

window.onload = ->
  mocha.run()

describe '.addClass(class)', ->
  describe '$(".myTest").addClass("bar")', ->
    it 'myTestクラスを持つdivタグにbarクラス付与の結果', ->
      test = $(".myTest").addClass("bar")
      return expect(test.get(0).className).to.be('myTest bar')

  describe '$(".myTest2").addClass(" foo   ")', ->
    it 'myTest2クラスを持つdivタグにfooクラス付与の結果', ->
      test = $(".myTest2").addClass("foo")
      return expect(test.get(0).className).to.be('myTest2 foo')


# describe('add(a, b)', function() {
#   describe('add(1, 2)', function() {
#     it('1+2の足し算の結果3', function() {
#       var test = add(1, 2);
#       return expect(test).to.be(3);
#     });
#   });
#   describe('add(0.1, 0.2)', function() {
#     it('0.1+0.2の足し算の結果0.3', function() {
#       var test = add(0.1, 0.2);
#       return expect(test).to.be(0.3);
#     });
#   });
# });
