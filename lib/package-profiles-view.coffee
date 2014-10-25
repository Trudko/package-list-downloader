{View} = require 'atom'

module.exports =
class PackageProfilesView extends View
  @content: ->
    @div class: 'package-profiles overlay from-top', =>
      @div "The PackageProfiles package is Alive! It's ALIVE!", class: "message"

  initialize: (serializeState) ->
    atom.workspaceView.command "package-profiles:toggle", => @toggle()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "PackageProfilesView was toggled!"
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
