var _atom = require('atom');
var SelectListView = _atom.SelectListView;

module.exports = {

  packageListView: null,

  activate:function() {
    atom.commands.add('.workspace','package-list-downloader:load-predefined-list', this.loadPackageList);
    atom.commands.add('.workspace','package-list-downloader:load-custom-list', this.customPackageList);
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
