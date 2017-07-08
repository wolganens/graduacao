import '../../../ui/pages/items/create.js';
import '../../../ui/pages/items/retrieve.js';
import '../../../ui/pages/items/title.html';
import '../../../ui/pages/items/single.js';

let items_routes = FlowRouter.group({
	prefix: '/items',
	name: 'items_group',
	triggersEnter: [function(context, redirect) {
	    if (!Meteor.userId()){
	    	redirect('/join')
	    }
  	}]
});

items_routes.route('/', {
	action: function() {
		BlazeLayout.render('homeLayout', {main: 'itemCreate', title: 'itemsTitle'});
	}
});