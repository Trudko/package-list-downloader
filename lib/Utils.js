var BufferedProcess = require('atom').BufferedProcess;
var StatusMessage = require('./status-message')

module.exports = {

  timeout : null,

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

  loadPackageList: function(packageListName) {
      var gistID;
      switch (packageListName) {
        case 'PHP':
          gistID = '4157065edd53fdd3daca';
        break;
        case 'Javascript':
          gistID = 'da9b00c4ddf35d9648b4';
        break;
      }
      var request = require('request');
      var requestOptions = {
        url: 'https://api.github.com/gists/' + gistID,
        headers: {
          'User-Agent': 'Trudko'
        }
      }

      var that = this;
      request(requestOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var responseObject = JSON.parse(body);
          var packageList = responseObject.files['gistfile1.txt'].content;
          packageList = packageList.split(',');
          var PackageListPackagesView  = require('./package-list-packages-view');
          var view = new PackageListPackagesView(packageList);
        }
      });
  },

  installPackageList: function(packageList) {
    var that = this;
    packageList.forEach(function(package) {
      that.installPackage(package);
    });
  },

  installPackage: function(packageName) {
      var args, command, exit, stderr, stdout;
      this.displayMessage("" + packageName + " installed!", 1500);
      command = atom.packages.getApmPath();
      args = ['install', packageName];
      var that = this;
      stdout = function(output) {};
      stderr = function(output) {};
      exit = (function(_this) {
        return function(exitCode) {
          if (exitCode === 0) {
            that.displayMessage("" + packageName + " installed!", 15000);
          } else {
            that.displayMessage("An error occurred installing " + packageName, 15000);
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
  },

  displayMessage: function(message, timeout) {
      if (this.timeout != null) {
        clearTimeout(this.timeout);
      }
      if (this.message != null) {
        this.message.setText(message);
      } else {
        this.message = new StatusMessage(message);
      }
      if (timeout != null) {
        return this.setMessageTimeout(timeout);
      }
  },

  setMessageTimeout: function(timeout) {
      if (this.timeout != null) {
        clearTimeout(this.timeout);
      }
      return this.timeout = setTimeout((function(_this) {
        return function() {
          _this.message.remove();
          return _this.message = null;
        };
      })(this), timeout);
  }
}
