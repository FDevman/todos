define('todos/routes/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return Ember['default'].RSVP.hash({
				all: this.store.findAll('todo'),
				completed: this.store.all('todo').filterBy('isCompleted', true),
				active: this.store.all('todo').filterBy('isCompleted', false)
			});
		}
	});

});