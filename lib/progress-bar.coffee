{$, View} = require 'atom'

module.exports=
class ProgressBarView extends View

  @content: ->
    @div class: 'overlay from-top', =>
      @span class: 'inline-block', 'Installing packages: '
      @progress class: 'inline-block', max: '100', value: '0', outlet: 'progressBar'
      @span class: 'inline-block', 'At 0%'
      @div class: 'pull-right', =>
        @button class: 'btn btn-success inline-block-tight gp-confirm-button', click: 'abort', 'Hide progress'

  initialize: ->
    atom.workspaceView.append this

  abort: ->
    @detach()

  updateProgress: (percentage)  ->
    progressBar = @progressBar[0]
    progressBar.value = percentage
    progressBar.nextSibling.innerText = 'At ' + percentage + '%'
