import './retrieve.html'

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Categories } from '../../../api/categories/categories.js';
import { Items } from '../../../api/items/items.js';

import './retrieve.html'

Template.itemRetrieve.onCreated(function categoriesOnCreated() {
	this.autorun(() => {    	
		this.subscribe('items')
		this.subscribe('categories');
  	});
});
Template.itemRetrieve.helpers({
	categories: () => {
		const instance = Template.instance();
		if (instance.subscriptionsReady()){
			return Categories.find();
		} else {
			return [];
		}
	}
});
Template.itemRetrieve.events({});