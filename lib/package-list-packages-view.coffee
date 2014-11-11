{$, View} = require 'atom'
utils = require './Utils'

module.exports=
class PackageListPackagesView extends View

  @content: (items) ->
    console.log(items)
    @div class: 'overlay from-top', style: '300px; width: 300px',  =>
      for item in items
        @li =>
          @span =>
            @input type: 'checkbox'
            @span item
      @div class: 'block', =>
        @span class: 'pull-left', =>
          @button class: 'btn btn-success inline-block-tight gp-confirm-button', click: 'confirmList', 'Confirm'
        @span class: 'pull-right', =>
          @button class: 'btn btn-error inline-block-tight gp-cancel-button', click: 'abort', 'Cancel'

  confirmList: ->

  initialize: ->
    atom.workspaceView.append this

  abort: ->
    @detach()
