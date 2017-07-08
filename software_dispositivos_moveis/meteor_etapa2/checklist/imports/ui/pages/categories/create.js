import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { notyError } from '/imports/ui/lib/errors.js';
import Noty from 'noty';

import { categoryCreate } from '/imports/api/categories/methods'

import './create.html'

Template.categoryCreate.onCreated(function categoriesOnCreated() {	
});
Template.categoryCreate.helpers({	
});
Template.categoryCreate.events({		
	"submit #cat-create-form": (event) =>{
		event.preventDefault();
		const category = {
			name: event.target.name.value,
			userId: Meteor.userId()
		}
		const id = categoryCreate.call(category, (err,res)=>{
			if(err) {
				console.log(err);
			}
		});
		event.target.name.value = null;
		event.target.focus()
	}
});