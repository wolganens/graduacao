
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Lists } from '../../../api/lists/lists.js';

import './retrieve.html'

Template.listRetrieve.onCreated(function categoriesOnCreated() {
	this.autorun(() => {    	
		this.subscribe('lists')
  	});
});
Template.listRetrieve.helpers({
	lists: () => {
		const instance = Template.instance();
		if (instance.subscriptionsReady()){			
			return Lists.find().fetch();
		} else {
			return [];
		}
	}
});
Template.listRetrieve.events({});