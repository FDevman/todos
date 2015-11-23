define('todos/controllers/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
		actions: {
			createTodo: function createTodo() {
				// Get the todo title set by the "New Todo" text field
				var title = this.get('newTitle');
				if (!title.trim()) {
					return;
				}

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
			clear: function clear() {
				this.get('model').completed.forEach(function (rec) {
					Ember['default'].run.once(this, function () {
						rec.deleteRecord();
						rec.save();
					});
				}, this);
			}
		},

		remaining: Ember['default'].computed('model.all.@each.isCompleted', function () {
			return this.get('model').active.get('length');
		}),

		inflection: Ember['default'].computed('remaining', function () {
			var remaining = this.get('remaining');
			return remaining === 1 ? 'item' : 'items';
		}),

		completed: Ember['default'].computed('model.all.@each.isCompleted', function () {
			return this.get('model').completed.get('length');
		})
	});

});