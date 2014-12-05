{$} = require 'atom-space-pen-views'

describe "PackageListDownloaderView", ->
  [editor, editorElement] = []

  beforeEach ->
    runs ->
      editor = atom.workspace.getActiveEditor()
      editorElement - atom.views.getView(editor)

  describe "Predefined view", ->

    it "loads all categories when toggled", ->
      workspaceElement = atom.views.getView(atom.workspace)
      atom.commands.dispatch workspaceElement, 'package-list-downloader:load-predefined-list'
