var _atom = require('atom');
var SelectListView = _atom.SelectListView;
var helpers = require('atom-helpers');

function PackageListView() {
  SelectListView.__super__.constructor.apply(this, arguments);
}

helpers.extends(PackageListView, SelectListView);
PackageListView.prototype.initialize = function() {
  PackageListView.__super__.initialize.apply(this, arguments);
  return this;
};

PackageListView.prototype.destroy = function() {
  this.currentCommand = null;
  return PackageListView.__super__.detach.apply(this, arguments);
};

PackageListView.prototype.viewForItem = function(item) {
  return '<li class="two-lines">' + item + '</li>';
};

PackageListView.prototype.confirmed = function(packageListName) {
  var utils = require('./Utils.js');
  utils.loadPackageList(packageListName);
  this.remove();
};

PackageListView.prototype.showPackageList = function(item) {
  var items = ['PHP', 'Javascript', 'General', 'Git'];
  this.addClass('overlay from-top');
  this.setItems(items);
  atom.workspaceView.append(this);
  this.focusFilterEditor();
};

module.exports = PackageListView;
