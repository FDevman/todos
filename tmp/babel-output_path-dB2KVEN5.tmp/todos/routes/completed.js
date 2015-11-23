import Ember from 'ember';
import Todos from 'todos/models/todo';

export default Ember.Route.extend({
	model: function model() {
		return Todos.get('FIXTURES').filter(function (todo) {
			return todo.isCompleted;
		});
	}
});