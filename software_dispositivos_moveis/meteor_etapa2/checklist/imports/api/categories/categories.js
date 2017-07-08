import { Mongo } from 'meteor/mongo';
import { Items } from '/imports/api/items/items.js'
import SimpleSchema from 'simpl-schema'

export const Categories = new Mongo.Collection('Categories');


Categories.schema = new SimpleSchema({
	name: 			{type: String,},
	_id: 			{type: String, optional: true},
	users:          {type: Array, optional: true, defaultValue: new Array()},
	"users.$":      {type: String},
	userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true, defaultValue:function(){ console.log("logado"); console.log(this.userId); return this.userId } },
	created_at:		{type: Date, optional: true, defaultValue: new Date()},
	updated_at:		{type: Date, optional: true, defaultValue: new Date()}
});

Categories.attachSchema(Categories.schema);
Categories.helpers({
	items: function () {
		return Items.find({category_id: this._id})
	}
});
