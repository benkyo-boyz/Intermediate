
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

  find: (value) ->
    value = @trim value
    for i in @
      @querySelectorAll value
    @

  text: (value) ->
    isValue = false
    returnText = ""
    ffFlag = if typeof @.get(0).innerText is undefined then true else false
    console.log ffFlag
    # valueが空（取得したい時）
    if value is undefined
      for i in @
        returnText += if ffFlag then i.textContent else i.innerText
    # valueがある（代入したい時）
    else
      isValue = true
      for i in @
        if ffFlag
          i.textContent = value
        else
          i.innerText = value
    return if isValue then @ else returnText

  html: (value) ->
    isValue = false
    returnHtml = ""
    # valueが空（取得したい時）
    if value is undefined
      for i in @
        returnHtml += i.innerHTML
    # valueがある（代入したい時）
    else
      isValue = true
      for i in @
        i.innerHTML = value
    return if isValue then @ else returnHtml




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

