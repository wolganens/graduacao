import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'

import { Travels } from '../travels.js';

Meteor.publish('travels', function () {
	if (!this.userId) {
	    return this.ready();
	}	
	return Travels.find({
		userId: this.userId
	});
});
Meteor.publish('travel', function (travel_id) {
	return Travels.find({_id: travel_id});
});