{$, EditorView, View} = require 'atom'
utils = require './Utils'

module.exports=
class PackageListDownloaderCustomListView extends View

  @content: ->
    @div class: 'overlay from-top', =>
      @subview 'gistUrl', new EditorView(mini: true, placeholderText: 'ID of Gist with packages list.')
      @div class: 'block', =>
        @span class: 'pull-left', =>
          @button class: 'btn btn-success inline-block-tight gp-confirm-button', click: 'confirmList', 'Confirm'
        @span class: 'pull-right', =>
          @button class: 'btn btn-error inline-block-tight gp-cancel-button', click: 'abort', 'Cancel'

  confirmList: ->
    utils.loadPackageListFromGIst @gistUrl.text()
    @detach()

  initialize: ->
    @on 'core:cancel', => @detach()
    @on 'core:confirm', => @confirmList()
    atom.workspaceView.append this

  abort: ->
    @detach()
