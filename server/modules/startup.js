var startup = function() {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
};

var _setEnvironmentVariables = function() {
  var settings = Meteor.settings.private;
  process.env.MAIL_URL = settings.MAIL_URL;
};

var _setBrowserPolicies = function() {};

var _generateAccounts = function() {
  TMModules.server.generateAccounts();
};

TMModules.server.startup = startup;
