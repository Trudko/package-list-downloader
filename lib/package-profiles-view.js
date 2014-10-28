var _atom = require('atom');
var SelectListView = _atom.SelectListView;
var helpers          = require('atom-helpers');


function PackageProfilesView() {
  SelectListView.__super__.constructor.apply(this, arguments);
}

helpers.extends(PackageProfilesView, SelectListView);
PackageProfilesView.prototype.currentInstall;
PackageProfilesView.prototype.initialize = function() {
  PackageProfilesView.__super__.initialize.apply(this, arguments);
  return this;
};

PackageProfilesView.prototype.destroy = function() {
  this.currentCommand = null;
  return PackageProfilesView.__super__.detach.apply(this, arguments);
};

PackageProfilesView.prototype.viewForItem = function(item) {
  return '<li class="two-lines"><input id="phpcheck" type="checkbox" />' + item + '</li>';
};

PackageProfilesView.prototype.confirmed = function(packageListName) {
  var utils = require('./Utils.js');
  utils.installPackages(packageListName);
};

PackageProfilesView.prototype.installPackage = function(packageName) {

}

PackageProfilesView.prototype.showMe = function(item) {
  var items = ['PHP', 'Javascript'];
  this.addClass('overlay from-top');
  this.setItems(items);
  atom.workspaceView.append(this);
  this.focusFilterEditor();
};

module.exports = PackageProfilesView;
