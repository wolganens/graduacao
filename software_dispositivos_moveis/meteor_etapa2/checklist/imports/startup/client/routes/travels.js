import '../../../ui/pages/travels/create.js';
import '../../../ui/pages/travels/retrieve.js';
import '../../../ui/pages/travels/single.js';
import '../../../ui/pages/travels/title.html';
import '../../../ui/pages/travels/travelItems.js';
import '../../../ui/pages/travels/addItem.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

let travels_routes = FlowRouter.group({
	prefix: '/travels',
	name: 'travels_group',	
	triggersEnter: [function(context, redirect) {		
	    if (!Meteor.userId()){
	    	redirect('/join')
	    }
  	}]
});

travels_routes.route('/', {
	action: function() {
		BlazeLayout.render('homeLayout', {main: 'travelRetrieve', title: 'travelTitle'});
	},
});
travels_routes.route('/create', {
	action: function() {
		BlazeLayout.render('homeLayout', {main: 'travelCreate', title: 'createTitle'});
	},
});
travels_routes.route('/single/:id', {
	action: function() {
		BlazeLayout.render('homeLayout', {main: 'travelItems', title: 'travelItemsTitle'});
	},
});
travels_routes.route('/single/:id/add-items', {
	action: function() {
		BlazeLayout.render('homeLayout', {main: 'travelAddItems', title: 'travelAddItemsTitle'});
	},
});