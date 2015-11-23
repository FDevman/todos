import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createTodo: function createTodo() {

			console.log('creating todo');
			// Get the todo title set by the "New Todo" text field
			var title = this.get('newTitle');
			if (!title.trim()) {
				return;
			}

			console.log('title is: ' + title);

			// Create the new Todo model
			var todo = this.store.createRecord('todo', {
				title: title,
				isCompleted: false
			});

			// Clear the "New Todo" text field
			this.set('newTitle', '');

			// Save the new model
			todo.save();
		}
	}
});