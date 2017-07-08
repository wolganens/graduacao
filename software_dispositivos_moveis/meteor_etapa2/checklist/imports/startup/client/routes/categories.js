import '../../../ui/pages/categories/create.js';
import '../../../ui/pages/categories/retrieve.js';
import '../../../ui/pages/categories/single.js';
import '../../../ui/pages/categories/title.html';

let categories_routes = FlowRouter.group({
	prefix: '/categories',
	name: 'categories_group',
	triggersEnter: [function(context, redirect) {
	    if (!Meteor.userId()){
	    	redirect('/join')
	    }
  	}]
});

categories_routes.route('/', {
	action: function() {
		BlazeLayout.render('homeLayout', {main: 'categoryCreate', title: 'categoriesTitle'});
	}
});