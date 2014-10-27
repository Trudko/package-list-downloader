var _atom = require('atom');
var SelectListView = _atom.SelectListView;

module.exports = {

  packageProfilesView: null,

  activate:function() {
    atom.workspaceView.command('package-profiles:Load-profile-list', this.loadProfileList);

  },

  loadProfileList: function() {
    var packageProfilesViews  = require('./package-profiles-view');
    var view = new packageProfilesViews();
    view.showMe();    
  }
}
