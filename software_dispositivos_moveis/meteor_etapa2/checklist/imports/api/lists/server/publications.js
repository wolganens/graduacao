import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'

import { Lists } from '../lists.js';

Meteor.publish('lists', function () {
	return Lists.find({});
});