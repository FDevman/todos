import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			all: this.store.findAll('todo'),
			completed: this.store.all('todo').filterBy('isCompleted', true),
			active: this.store.all('todo').filterBy('isCompleted', false)
		});
	}
});
