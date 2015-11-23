define('todos/router', ['exports', 'ember', 'todos/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('all-todos');
    this.route('active');
    this.route('completed');
  });

  exports['default'] = Router;

});