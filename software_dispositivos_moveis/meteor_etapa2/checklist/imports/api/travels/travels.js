import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'
import {Items} from '/imports/api/items/items.js'

export const Travels = new Mongo.Collection('Travels');
export const TravelItems = new Mongo.Collection('TravelItems');

Travels.schema = new SimpleSchema({
	place_id: 		{type: String},
	description: 	{type: String},
	_id: 			{type: String, optional: true, regEx: SimpleSchema.RegEx.Id},
	userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true, autoValue:function(){ return this.userId } },
	date: 			{type: Date, },
	nights: 		{type: SimpleSchema.Integer},	
	users:          {type: Array, optional: true, defaultValue: new Array()},
	"users.$":      {type: String},
	created_at:		{type: Date, optional: true, defaultValue: new Date()},
	updated_at:		{type: Date, optional: true, defaultValue: new Date()}
});

TravelItems.schema = new SimpleSchema({
	travel_id: {type: String, optional: true, regEx: SimpleSchema.RegEx.Id},
	item_id: {type: String, optional: true, regEx: SimpleSchema.RegEx.Id},
	users:          {type: Array, optional: true, defaultValue: new Array()},
	"users.$":      {type: String},
	qnt: {type: SimpleSchema.Integer, optional:true},
	checked: {type: Boolean, optional: true, defaultValue: false}
})

TravelItems.attachSchema(TravelItems.schema)
Travels.attachSchema(Travels.schema);

TravelItems.helpers({
	items: function () {
		return Items.find({_id: this.item_id})
	}
});
