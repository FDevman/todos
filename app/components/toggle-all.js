import Ember from 'ember';

export default Ember.Component.extend({
	
	allCompleted: false,

	completed: Ember.observer('allCompleted', function(){
		this.get('todos').forEach(function (rec) {
			Ember.run.once(this, function() {
				rec.set('isCompleted', this.allCompleted);
				rec.save();
			});
		}, this);
	}),
	
});
