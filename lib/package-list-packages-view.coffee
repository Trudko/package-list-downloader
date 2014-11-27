{$, View} = require 'atom'
utils = require './Utils'
StatusView = require('./status-view')

module.exports=
class PackageListPackagesView extends View

  @content: (items) ->
      @div class: 'overlay from-top select-list', id: 'package-list-container', =>
        @ol class: 'list-group mark-active', =>
          for item in items
            @li class: 'active', click: 'activatePackage', item
        @div class: 'block', style: 'padding-top: 10px', =>
          @span class: 'pull-left', =>
            @button class: 'btn btn-success inline-block-tight gp-confirm-button', click: 'confirmList', 'Confirm'
          @span class: 'pull-right', =>
            @button class: 'btn btn-error inline-block-tight gp-cancel-button', click: 'abort', 'Cancel'

  activatePackage: ->
    packageItem = event.target
    if packageItem.className == 'active'
      packageItem.className = ''
    else
      packageItem.className = 'active'

  confirmList: ->
    packagesToInstall = []
    for item in $("#package-list-container").find('.active')
      packagesToInstall.push item.innerHTML

    utils.installPackageList packagesToInstall
    @detach()

  initialize: ->
    atom.workspaceView.append this

  abort: ->
    @detach()
