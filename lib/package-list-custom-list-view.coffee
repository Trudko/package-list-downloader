{$, EditorView, View} = require 'atom'
utils = require './Utils'

module.exports=
class PackageListCustomListView extends View

  @content: ->
    @div class: 'overlay from-top', =>
      @subview 'tagName', new EditorView(mini: true, placeholderText: 'Link to gist with packages')

  initialize: ->
    atom.workspaceView.append this

  abort: ->
    @detach()
