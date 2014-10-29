var StatusMessage;

module.exports = StatusMessage = (function() {
  function StatusMessage(message) {
    this.statusBar = atom.workspaceView.statusBar;
    if (this.statusBar != null) {
      this.panel = this.statusBar.appendLeft("<div class=\"inline-block\">" + message + "</div>");
      this.node = this.panel.element.lastChild;
    }
  }

  StatusMessage.prototype.remove = function() {
    if (this.statusBar != null) {
      return this.panel.element.removeChild(this.node);
    }
  };

  StatusMessage.prototype.setText = function(text) {
    if (this.statusBar != null) {
      return this.node.innerHTML = text;
    }
  };

  return StatusMessage;

})();
