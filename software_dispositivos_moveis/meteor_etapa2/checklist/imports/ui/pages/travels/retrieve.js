import { Template } from 'meteor/templating';
import { Travels } from '../../../api/travels/travels.js';

import './retrieve.html'

Template.travelRetrieve.onCreated(function categoriesOnCreated() {
	this.autorun(() => {    	
		this.subscribe('travels')
  	});
});
Template.travelRetrieve.helpers({
	travels: () => {
		const instance = Template.instance();
		if (instance.subscriptionsReady()){
			return Travels.find();
		} else {
			return [];
		}
	}
});
Template.travelRetrieve.events({});