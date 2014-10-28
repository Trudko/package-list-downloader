var BufferedProcess = require('atom').BufferedProcess;

module.exports = {

  installPackages: function(packageListName) {
    var packageList;
    switch (packageListName) {
      case 'PHP':
        var packageList = ['linter-php', 'language-php','php-getters-setters', 'linter-phpmd', 'linter-phpcs']
      break;
      case 'Javascript':
        var packageList = ['turbo-javascript']
      break;
    }
    var that = this;
    packageList.forEach(function(package) {
        that.installPackage(package);
    });
  },

  installPackage: function(packageName) {
    var args, command, exit, stderr, stdout;
    console.log("Installing " + packageName);
    command = atom.packages.getApmPath();
    args = ['install', packageName];
    stdout = function(output) {};
    stderr = function(output) {};
    exit = (function(_this) {
      return function(exitCode) {
        if (exitCode === 0) {
            console.log("" + packageName + " installed!");
        } else {
          console.log("An error occurred installing " + packageName);
        }
      };
    })(this);
    return this.currentInstall = new BufferedProcess({
      command: command,
      args: args,
      stdout: stdout,
      stderr: stderr,
      exit: exit
    });
  }
}
