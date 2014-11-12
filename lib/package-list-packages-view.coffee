{$, View} = require 'atom'
utils = require './Utils'

module.exports=
class PackageListPackagesView extends View

  @content: (items) ->
    if items.length > 0
      @div class: 'overlay from-top', id: 'package-list-container',  style: '300px; width: 300px',  =>
        for item in items
          @li =>
            @span =>
              @input type: 'checkbox', id: item
              @span item
        @div class: 'block', =>
          @span class: 'pull-left', =>
            @button class: 'btn btn-success inline-block-tight gp-confirm-button', click: 'confirmList', 'Confirm'
          @span class: 'pull-right', =>
            @button class: 'btn btn-error inline-block-tight gp-cancel-button', click: 'abort', 'Cancel'
     else
        utils.displayMessage('All package from the list are already installed!', 1500)



  confirmList: ->
    packagesToInstall = []
    for item in $("#package-list-container").find('input:checked')
      packagesToInstall.push item.id

    utils.installPackageList packagesToInstall
    @detach()

  initialize: ->
    atom.workspaceView.append this

  abort: ->
    @detach()
