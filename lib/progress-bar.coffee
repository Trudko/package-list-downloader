{$, View} = require 'atom'

module.exports=
class ProgressBarView extends View

  @content: ->
    @div class: 'overlay from-top', =>
      @span class: 'loading loading-spinner-small inline-block'
      @span 'Name of package'
      @div class: 'pull-right', =>
        @button class: 'btn btn-success inline-block-tight gp-confirm-button', click: 'abort', 'Hide progress'

  initialize: ->
    atom.workspaceView.append this

  abort: ->
    @detach()

  changePackageName: ->
