import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createTodo() {
			// Get the todo title set by the "New Todo" text field
			var title = this.get('newTitle');
			if (!title.trim()) { return; }

			// Create the new Todo model
			var todo = this.store.createRecord('todo', {
			title: title,
			isCompleted: false
			});

			// Clear the "New Todo" text field
			this.set('newTitle', '');

			console.log('Saving Todo: ' + title);

			// Save the new model
			todo.save();

		},
		clear() {
			this.get('model').completed.forEach(function (rec) {
				Ember.run.once(this, function() {
					rec.deleteRecord();
					rec.save();
				});
			}, this);
		}
	},

	remaining: Ember.computed('model.all.@each.isCompleted', function() {
		return this.get('model').active.get('length');
	}),

	inflection: Ember.computed('remaining', function () {
		var remaining = this.get('remaining');
		return remaining === 1 ? 'item' : 'items';
	}),

	completed: Ember.computed('model.all.@each.isCompleted', function() {
		return this.get('model').completed.get('length');
	})
});
