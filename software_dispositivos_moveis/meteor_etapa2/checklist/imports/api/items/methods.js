import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'

import { Items } from './items.js';

export const itemCreate = new ValidatedMethod({
	name: 'Items.methods.create',
	validate: Items.schema.validator(),
	applyOptions: {
		noRetry: true,
	},
	run(item) {		
		return Items.insert(item, (err) => {			
		});
	}
});
export const itemRemove = new ValidatedMethod({
	name: 'Items.methods.remove',
	validate: Items.schema.validator(),
	run(item) {		
		Items.remove(item._id);
	}
});