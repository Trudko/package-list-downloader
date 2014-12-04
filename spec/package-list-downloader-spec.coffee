{$} = require 'atom-space-pen-views'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "PackageListDownloader", ->
  [workspaceElement, editorElement, editor, editor] = []
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('package-list-downloader')

  describe "when the package-profiles-downloader:predefined-list event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('#package-list-container')).not.toExist()

      atom.workspaceView.trigger 'package-profiles-downloader:predefined-list'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('#package-list-container')).toExist()
        atom.workspaceView.trigger 'package-profiles-downloader:predefined-list'
        expect(atom.workspaceView.find('#package-list-container')).not.toExist()
