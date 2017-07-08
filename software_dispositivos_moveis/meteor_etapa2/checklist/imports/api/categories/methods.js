import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'
import { Categories } from './categories.js';

export const categoryCreate = new ValidatedMethod({
	name: 'Categories.methods.create',
	validate: Categories.schema.validator(),	
	run(category) {
		return Categories.insert(category)		
	}
});
export const categoryRemove = new ValidatedMethod({
	name: 'Categories.methods.remove',
	validate: Categories.schema.validator(),
	run(category) {		
		return Categories.remove(category._id);
	}
});