
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

Core.prototype =
  addClass: (cName) ->
    for i in @
      arr = i.className.split(" ")
      continue if arr.indexOf(cName) > -1
      if arr[0] is "" then arr[0] = cName else arr.push(cName)
      i.className = if arr.length is 1 then arr[0] else arr.join " "

  removeClass: (cName) ->
    for i in @
      arr = i.className.split(" ")
      continue if arr.indexOf(cName) is -1
      classArray = []
      for c in arr
        classArray.push(c) if c != cName and c != ""
      i.className = classArray.join " "

  hasClass: (cName) ->
    for i in @
      arr = i.className.split(" ")
      return true if arr.indexOf(cName) > -1
    false



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

