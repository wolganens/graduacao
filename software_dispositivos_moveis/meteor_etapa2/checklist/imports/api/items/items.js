import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const Items = new Mongo.Collection('Items');

Items.schema = new SimpleSchema({
	name: 			{type: String},
	_id: 			{type: String, optional: true},
	category_id: 	{type: String, optional: true},
	users:          {type: Array, optional: true, defaultValue: new Array()},
	"users.$":      {type: String},
	daily: 			{type: Boolean, optional: true, defaultValue: false},
	fixed: 			{type: Boolean, optional: true, defaultValue: false},
	userId: 		{ type: String, regEx: SimpleSchema.RegEx.Id, optional: true, defaultValue: Meteor.userId },
	created_at:		{type: Date, optional: true, defaultValue: new Date()},
	updated_at:		{type: Date, optional: true, defaultValue: new Date()}
});
Items.attachSchema(Items.schema);
