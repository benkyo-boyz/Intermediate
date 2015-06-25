
$ = (selector, context) ->
  new Core selector, context

$.isArray = require './isArray'
$.each = require './each'

Core = (selector, context) ->
  context = context or document
  elems = context.querySelectorAll selector
  Array.prototype.push.apply @, elems
  @context = context
  @selector = selector
  @

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

Core.prototype =
  trim: (text) ->
    rtext = ""
    if text isnt null
      rtext = (text + "").replace(rtrim, "")
    rtext

  addClass: (value) ->
    value = @trim value
    for i in @
      cName = @trim i.className
      classArr = cName.split(" ")
      continue if classArr.indexOf(value) > -1
      if classArr[0] is "" then classArr[0] = value else classArr.push(value)
      i.className = if classArr.length is 1 then classArr[0] else classArr.join " "
    console.log @.get(0).className
    @

  removeClass: (value) ->
    value = @trim value
    for i in @
      cName = @trim i.className
      classArr = cName.split(" ")
      continue if classArr.indexOf(value) is -1
      needClassArr = []
      for j in classArr
        needClassArr.push(j) if j != value and j != ""
      i.className = needClassArr.join " "
    @

  toggleClass: (value) ->
    value = @trim value
    for i in @
      cName = @trim i.className
      classArr = cName.split(" ")
      if classArr.indexOf(value) is -1
        @addClass value
      else
        @removeClass value
    @


  hasClass: (value) ->
    value = @trim value
    flag = false
    for i in @
      classArr = i.className.split(" ")
      if classArr.indexOf(value) > -1
        flag = true
        break
    flag




  each: (callback) ->
    i = 0
    l = @length
    for i in [0..l]
      callback.call(@, @[i], i)
    return

  get: (index) ->
    ret = []
    l = @length
    for i in [0..l]
      ret.push @[i]
    if typeof index is 'number'
      ret = ret[index]
    ret

  splice: Array.prototype.splice

window.$ = $

require './test'
return

