import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'

import { Lists } from './lists.js';

export const listCreate = new ValidatedMethod({
	name: 'Lists.methods.create',
	validate: Lists.schema.validator(),
	applyOptions: {
		noRetry: true,
	},
	returnStubValue: true,
	throwStubExceptions: true,
	run(list) {		
		return Lists.insert(list, (err) => {
			console.log(err)
		});
	}
});
export const listRemove = new ValidatedMethod({
	name: 'Lists.methods.remove',
	validate: Lists.schema.validator(),
	run(list) {		
		Lists.remove(list._id);
	}
});