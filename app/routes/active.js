import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.all('todo').filterBy('isCompleted', false);
	}
});
