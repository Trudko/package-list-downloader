var _atom = require('atom');
var SelectListView = _atom.SelectListView;

module.exports = {

  packageListView: null,

  activate:function() {
    atom.workspaceView.command('package-list:Load-package-list', this.loadPackageList);
  },

  loadPackageList: function() {
    var PackageListView  = require('./package-list-view');
    var view = new PackageListView();
    view.showPackageList();
  }
}
