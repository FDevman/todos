define('todos/routes/completed', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.all('todo').filterBy('isCompleted', true);
		}
	});

});