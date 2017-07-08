import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const Lists = new Mongo.Collection('Lists');

Lists.schema = new SimpleSchema({
	name: 			{type: String},
	_id: 			{type: String, 	optional: true},
	items: 			{type: Array, 	optional:true},
	"items.$": 		{type: String, regEx: SimpleSchema.RegEx.Id},
	created_at:		{type: Date, optional: true, defaultValue: new Date()},
	updated_at:		{type: Date, optional: true, defaultValue: new Date()}
});

Lists.attachSchema(Lists.schema);
