define('todos/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].FixtureAdapter.extend({
		defaultSerializer: "-default"
	});

});