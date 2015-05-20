$ = jQuery = require 'jquery'
Handlebars = require 'handlebars'


$ ->

  tmpl = Handlebars.compile $('[data-tmp="tr"]').html()
  $container = $('#container')
  $addBtn = $('[data-add="trigger"]')
  $table = $('[data-todoTable="container"]')
  
  keyCheck = (e) ->
    evt = e || window.event
    key = evt.keyCode || evt.which

  # 新規todo追加
  $addBtn.on 'keypress', (e) ->
    key = keyCheck e
    val = $(@).val()
    if key is 13 and val != ''
      $($table).find('tbody').prepend(tmpl data: val)
      $(@).val ''
      false

  # チェックの付け外しによるclassの制御
  $container.on 'change', '[data-checkbox="target"]', (e) ->
    $targetTD = $(e.target).closest('tr')
    $targetTD.toggleClass 'done'

  # 既存のtodoの書き換え
  $container.on 'click', '[data-change="container"]', (e) ->
    txt = $(e.target).text()
    txt = '' if txt is '何か書いて下さい'
    $(e.target).html '<input data-change="container" type="text" class="form-control" />'
    $(e.target).find('input').val(txt).focus()

  # todo書き換え中にフォーカスが外れた時の処理
  $container.on 'blur', '[data-change="container"]', (e) ->
    val = $(@).val()
    val = '何か書いて下さい' if val is ''
    $(@).closest('td').html val
    false

  # todo書き換え後のenterの処理
  $container.on 'keypress', '[data-change="container"]', (e) ->
    key = keyCheck e
    val = $(@).val()
    if key is 13 and val != ''
      $(@).closest('td').html val
      false

  # xボタンを押下した時の処理
  $container.on 'click', '.delete-action', (e) ->
    $(e.target).closest('tr').remove()
    false


