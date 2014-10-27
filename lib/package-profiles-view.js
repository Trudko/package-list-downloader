var _atom = require('atom');
var SelectListView = _atom.SelectListView;
var helpers          = require('atom-helpers');

function PackageProfilesView() {
  SelectListView.__super__.constructor.apply(this, arguments);
}

helpers.extends(PackageProfilesView, SelectListView);

PackageProfilesView.prototype.initialize = function() {
  PackageProfilesView.__super__.initialize.apply(this, arguments);
  return this;
};

PackageProfilesView.prototype.destroy = function() {
  this.currentCommand = null;
  return LocalHistoryView.__super__.detach.apply(this, arguments);
};

PackageProfilesView.prototype.viewForItem = function(item) {
  return '<li class="two-lines">' + item + '</li>';
};

PackageProfilesView.prototype.confirmed = function(item) {
  console.log('confirmed');
};

PackageProfilesView.prototype.showMe = function(item) {
  var items = ['Item 1', 'Item 2'];
  this.addClass('overlay from-top');
  this.setItems(items);
  atom.workspaceView.append(this);
  this.focusFilterEditor();
};

module.exports = PackageProfilesView;
