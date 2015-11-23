define('todos/components/toggle-all', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({

		allCompleted: false,

		completed: Ember['default'].observer('allCompleted', function () {
			this.get('todos').forEach(function (rec) {
				Ember['default'].run.once(this, function () {
					rec.set('isCompleted', this.allCompleted);
					rec.save();
				});
			}, this);
		})

	});

});