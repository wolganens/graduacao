import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Categories } from '../../../api/categories/categories.js';

import './retrieve.html'

Template.categoryRetrieve.onCreated(function categoriesOnCreated() {
	this.subscribe('categories')
});
Template.categoryRetrieve.helpers({
	categories: () => {
		return Categories.find();
	}
});
Template.categoryRetrieve.events({});