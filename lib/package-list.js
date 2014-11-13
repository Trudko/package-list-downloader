var _atom = require('atom');
var SelectListView = _atom.SelectListView;

module.exports = {

  packageListView: null,

  activate:function() {
    atom.workspaceView.command('package-list:Load-package-list', this.loadPackageList);
    atom.workspaceView.command('package-list:Custom-package-list', this.customPackageList);
  },

  loadPackageList: function() {
    var PackageListView  = require('./package-list-view');
    var view = new PackageListView();
    view.showPackageList();
  },

  customPackageList: function() {
    var PackageListCustomListView  = require('./package-list-custom-list-view');
    var view = new PackageListCustomListView();
    atom.workspaceView.append(view);
  }
}
