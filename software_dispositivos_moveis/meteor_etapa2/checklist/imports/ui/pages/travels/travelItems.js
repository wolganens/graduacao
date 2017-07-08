import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import {removeItem, setCheckedStatus, updateCount} from '/imports/api/travels/methods.js';
import { TAPi18n } from 'meteor/tap:i18n';
import {notyError} from '/imports/ui/lib/errors.js'
import Noty from 'noty';

import {Travels, TravelItems} from '/imports/api/travels/travels.js';
import {Items} from '/imports/api/items/items.js';
import {Categories} from '/imports/api/categories/categories.js';

import './travelItems.html'

Template.travelItems.onCreated(function () {
	const travel_id = FlowRouter.getParam("id");	
	this.autorun(() => {  
		this.subscribe('categories')
		this.subscribe('travel', travel_id);
		this.subscribe('travelItems', travel_id);		
  	});
});
Template.travelItems.helpers({
	travel(){
		return Travels.findOne();
	},	
	categories(){
		return Categories.find().fetch();
	},
	showCategory(){
		return this.items().count() > 0;
	},
	isChecked(item){
		const instance = Template.instance();
		if (instance.subscriptionsReady()){
			return TravelItems.findOne({item_id: item}).checked		
		} else {
			return false;
		}
	},
	qnt(item_id){
		const instance = Template.instance();
		if (instance.subscriptionsReady()){
			return TravelItems.findOne({item_id: item_id}).qnt
		} else {
			return false;
		}
	},
	checkedClass(item){
		const instance = Template.instance();
		if (instance.subscriptionsReady()){
			return TravelItems.findOne({item_id: item}).checked && 'checked'	
		} else {
			return false;
		}
	},
	countClass(){		
		const count = Session.get('incompleteCount');
		const total = Session.get('count');
		const ratio = count/total;
		if (ratio > 0.7){
			return 'label-danger'
		} else if(ratio > 0.4) {
			return 'label-warning'
		} else {
			return 'label-success'
		}		
	},
	incompleteCount(){
		Session.set('incompleteCount', TravelItems.find({checked:false}).count());
		Session.set('count', TravelItems.find().count());
		return Session.get('incompleteCount');
	}
});
Template.travelItems.events({
	'click #add-travel-items'(event) {
		event.preventDefault();
		var current = FlowRouter.current();
		FlowRouter.go(current.path + '/add-items');		
	},
	'click .delete'(event){
		event.preventDefault();
		const info = {
			item_id: this._id,
			travel_id: FlowRouter.getParam("id"),
		}
		var n = new Noty({
			text: TAPi18n.__('sure'),
			theme: 'mint',
			buttons: [
				Noty.button(TAPi18n.__('yes'), 'btn btn-danger', function () {
					removeItem.call(info, (err) => {
						console.log(err);
					});					
					n.close();					
					let not_success = new Noty({
						killer :true,
						type: 'success',
					    text     : TAPi18n.__('success_delete'),
					    timeout: 1200,
					    theme: 'mint'
					}).show();					
				}),

				Noty.button(TAPi18n.__('no'), 'btn btn-error', function () {					
					n.close();
				})
			]
		}).show();
	},
	'change [type=checkbox]'(event) {		
		const checked = $(event.target).is(':checked');

		setCheckedStatus.call({
			travel_id: FlowRouter.getParam("id"),
			item_id: this._id,
			checked: checked,
		});		
	},
	'change .change-qnt'(event){
		console.log('ok')
		const itemtravel = {
			item_id: this._id,
			travel_id: FlowRouter.getParam('id'),
			qnt: parseInt(event.target.value)
		}
		console.log(itemtravel)
		updateCount.call(itemtravel, (err, res)=>{
			if(err) {
				console.log(err);
				notyError(err);
			} else {
				let success = new Noty({
					killer :true,
					type: 'success',
				    text     : TAPi18n.__('success_changed'),
				    timeout: 1000,
				    theme: 'mint'
				}).show();
			}
		})
	}
});