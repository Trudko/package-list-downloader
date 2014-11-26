var BufferedProcess = require('atom').BufferedProcess;
var StatusView = require('./status-view')

module.exports = {
  timeout : null,
  numberOfInstaledPackage: 0,
  numberOfPackagedToBeInstalled: 0,
  numberOfSucessfullyInstalled: 0,
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

      this.loadPackageListFromGIst(gistID);
  },

  loadPackageListFromGIst: function(gistID) {
    var request = require('request');
    var requestOptions = {
      url: 'https://api.github.com/gists/' + gistID,
      headers: {
        'User-Agent': 'Trudko'
      }
    }

    var that = this;
    var wasListLoaded;
    request(requestOptions, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var responseObject = JSON.parse(body);
        var packageList = responseObject.files['gistfile1.txt'].content;
        packageList = packageList.split(',');
        var availablePackages = atom.packages.getAvailablePackageNames()
        packageList = packageList.filter(function(packageName) {
          packageName = packageName.trim();
          return availablePackages.indexOf(packageName) < 0;
        });
        var PackageListPackagesView  = require('./package-list-packages-view');
        if (packageList.length > 0) {
          new PackageListPackagesView(packageList);
        } else {
          new StatusView({type: 'text-warning', message: 'All packages from the list are already installed!'})
        }
        wasListLoaded = true;
      } else if (response.statusCode == 404) {
          new StatusView({type: 'text-warning', message: 'Gist with id ' + gistID + ' was not found!'})
          wasListLoaded = false;
      }
    });

    return wasListLoaded;
  },

  installPackageList: function(packageList) {
    var that = this;
    this.numberOfPackagedToBeInstalled = packageList.length;
    packageList.forEach(function(package) {
      that.installPackage(package);
    });
  },

  installPackage: function(packageName) {
      var args, command, exit, stderr, stdout;
      command = atom.packages.getApmPath();
      args = ['install', packageName];

      var that = this;

      stdout = function(output) {};
      stderr = function(output) {};
      exit = (function(_this) {
        return function(exitCode) {
          if (exitCode === 0) {
             that.numberOfSucessfullyInstalled++;
          } else {
            new StatusView({type: 'text-error', message: "" + packageName + "An error occurred installing!"})
          }
          that.numberOfInstaledPackage++;
          that.updateInstalledPackageCounter();
        };
      })(this);
      this.currentInstall = new BufferedProcess({
        command: command,
        args: args,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });
  },
  updateInstalledPackageCounter: function() {
    if (this.numberOfInstaledPackage === this.numberOfPackagedToBeInstalled) {
      if (this.numberOfInstaledPackage === this.numberOfSucessfullyInstalled) {
        new StatusView({type: 'text-warning', message: 'All packages were installed succesfully'})
      }
      this.numberOfInstaledPackage = 0;
      this.numberOfPackagedToBeInstalled = 0;
      this.numberOfSucessfullyInstalled = 0;
    }
  },
  setMessageTimeout: function(timeout) {
      if (this.timeout != null) {
        clearTimeout(this.timeout);
      }
      return this.timeout = setTimeout((function(_this) {
        return function() {
          _this.message.remove();PackagePackage
          return _this.message = null;
        };
      })(this), timeout);
  }
}
