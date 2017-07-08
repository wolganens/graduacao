import './create.html'

import { TAPi18n } from 'meteor/tap:i18n';
import Noty from 'noty';
import {notyError} from '/imports/ui/lib/errors.js';

import {Categories} from '/imports/api/categories/categories.js'
import {itemCreate} from '/imports/api/items/methods.js'

Template.itemCreate.onCreated(function(){
	this.subscribe('categories');
})
Template.itemCreate.helpers({
	categories: function () {		
		return Categories.find().fetch();
	}
});
Template.itemCreate.events({		
	"submit #cat-create-form": (event) =>{
		event.preventDefault();
		const item = {
			name: event.target.name.value,
			category_id: event.target.category.value,
			userId: Meteor.userId(),
			daily: event.target.daily.checked,
			fixed: event.target.fixed.checked
		}
		console.log(item)
		itemCreate.call(item, (err, id) =>{
			if(err) {
				console.log(err)
				notyError(err)
			}
			event.target.name.value = ""
			event.target.category.value = null
			event.target.name.focus()
		});
	}
});