import '../../../ui/pages/lists/create.js';
import '../../../ui/pages/lists/retrieve.js';
import '../../../ui/pages/lists/single.js';

let lists_routes = FlowRouter.group({
	prefix: '/lists',
	name: 'lists_group',
	triggersEnter: [function(context, redirect) {
	    if (!Meteor.userId()){
	    	redirect('/')
	    }
  	}]
});

lists_routes.route('/', {
	action: function() {
		BlazeLayout.render('homeLayout', {main: 'listCreate'});
	}
});