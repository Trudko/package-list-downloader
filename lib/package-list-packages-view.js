var _atom = require('atom');
var SelectListView = _atom.SelectListView;
var view =  _atom.View;
var helpers          = require('atom-helpers');


function PackageListPackagesView() {
  SelectListView.__super__.constructor.apply(this, arguments);
}

helpers.extends(PackageListPackagesView, view);
PackageListPackagesView.prototype.currentInstall;
PackageListPackagesView.prototype.initialize = function() {
  //PackageListPackagesView.__super__.initialize.apply(this, arguments);
  return this;
};

PackageListPackagesView.content = function(state) {
  return this.div({
      "style": 'width: 300px;height: 300px;background-color:red'
  },'Text');
};



PackageListPackagesView.prototype.destroy = function() {
  this.currentCommand = null;
  return PackageListPackagesView.__super__.detach.apply(this, arguments);
};

PackageListPackagesView.prototype.viewForItem = function(item) {
  return '<li class="two-lines"><input class="package_' + item + '"type="checkbox" />' + item + '</li>';
};

PackageListPackagesView.prototype.confirmed = function(packageListName) {
  var utils = require('./Utils.js');
  utils.loadPackageList(packageListName);
};

PackageListPackagesView.prototype.showPackageList = function(packages) {
  this.addClass('overlay from-top');
  //this.setItems(packages);
  atom.workspaceView.append(this);
  //this.focusFilterEditor();
};

module.exports = PackageListPackagesView;
