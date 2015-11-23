/* jshint ignore:start */

define('todos/config/environment', ['ember'], function(Ember) {
  var prefix = 'todos';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("todos/tests/test-helper");
} else {
  require("todos/app")["default"].create({"name":"todos","version":"0.0.0+5ce0d897"});
}

/* jshint ignore:end */
