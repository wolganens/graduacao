import { Template } from 'meteor/templating';
import { Items } from '/imports/api/items/items.js';
import { addItem, removeItem } from '/imports/api/travels/methods.js'
import {Categories} from '/imports/api/categories/categories.js';

import './addItem.html'

Template.travelAddItems.onCreated(function () {
	const travel_id = FlowRouter.getParam("id");	
	this.autorun(() => {
		this.subscribe('categories')	
		this.subscribe('notIntravelItems', travel_id);
  	});
});
Template.travelAddItems.onRendered(function(){
	this.autorun(function(){
		$(function(){
			$.material.init();
		});
	})
});
Template.travelAddItems.helpers({
	categories(){
		return Categories.find().fetch();
	}
});
Template.travelAddItems.events({
	'change [type=checkbox]'(event) {
		const checked = $(event.target).is(':checked');
		const travelitem = {
			travel_id: FlowRouter.getParam("id"),
			item_id: this._id,
			qnt: parseInt($("#" + this._id + "-qnt").val()),
			checked: false
		};			
		if (checked) {			
			addItem.call(
				travelitem,
				(err, res) => {
					if (err) {
						console.log(err);
					}					
				}
			)
		} else {
			removeItem.call(
				travelitem,
				(err, res) => {
					if (err) {
						console.log(err);
					}
				}
			)
		}
	}
});