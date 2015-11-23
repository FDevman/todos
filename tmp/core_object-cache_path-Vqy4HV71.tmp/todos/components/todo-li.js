define('todos/components/todo-li', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({

		completed: Ember['default'].observer('todo.isCompleted', function () {
			this.get('todo').save();
		}),

		actions: {
			'delete': function _delete(todo) {

				var title = todo.get('title');

				console.log('delete: ' + title);

				todo.deleteRecord();
				todo.save();
			},

			editTodo: function editTodo() {
				// console.log(this.get('todo'));
				// Set component to edit mode
				this.set('isEditing', true);
				// Initialize the text to the current title
				this.set('editedTitle', this.get('todo').get('title'));
			},

			commitEdit: function commitEdit() {
				// Get the current title
				var newtitle = this.get('editedTitle');
				var todo = this.get('todo');

				// If new title is null or empty, just go back to normal mode
				if (!newtitle.trim()) {
					this.set('isEditing', false);
					return;
				}

				// console.log(this);

				// Save changed
				todo.set('title', newtitle);

				// this.save();

				// Go back to normal mode.
				this.set('isEditing', false);
			}
		},

		isEditing: false
	});

});