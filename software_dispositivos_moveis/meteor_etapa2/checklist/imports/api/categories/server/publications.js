import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'

import { Categories } from '../categories.js';

Meteor.publish('categories', function () {
	if (!this.userId) {
	    return this.ready();
	}
	return Categories.find({
		userId: this.userId
	});
});