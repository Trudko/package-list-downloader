{$, View} = require 'atom'

module.exports =
  class StatusView extends View

    @content = (params) ->
      @div class: 'overlay from-top', =>
        @div class: "#{params.type} message", params.message

    initialize: ->
      @subscribe $(window), 'core:cancel', => @detach()
      atom.workspaceView.append(this)
      setTimeout =>
        @detach()
      , 2 * 1000

    detach: ->
      super
      @unsubscribe()
