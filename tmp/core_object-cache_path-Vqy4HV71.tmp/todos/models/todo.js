define('todos/models/todo', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	var Todo = DS['default'].Model.extend({
		title: DS['default'].attr('string'),
		isCompleted: DS['default'].attr('boolean')

	});
	Todo.reopenClass({
		FIXTURES: [{
			id: 1,
			title: 'Learn Ember.js',
			isCompleted: true
		}, {
			id: 2,
			title: '...',
			isCompleted: false
		}, {
			id: 3,
			title: 'Profit!',
			isCompleted: false
		}]
	});
	exports['default'] = Todo;

});