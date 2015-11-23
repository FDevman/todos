define('todos/routes/completed', ['exports', 'ember', 'todos/models/todo'], function (exports, Ember, Todos) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return Todos['default'].get('FIXTURES').filter(function (todo) {
				return todo.isCompleted;
			});
		}
	});

});