PackageProfilesView = require './package-profiles-view'

module.exports =
  packageProfilesView: null

  activate: (state) ->
    @packageProfilesView = new PackageProfilesView(state.packageProfilesViewState)

  deactivate: ->
    @packageProfilesView.destroy()

  serialize: ->
    packageProfilesViewState: @packageProfilesView.serialize()
