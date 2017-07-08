import './homeLayout.html'
import { FlowRouter } from 'meteor/kadira:flow-router';
Template.homeLayout.onRendered(function(){	
})
Template.homeLayout.events({
	'click #side-open'(event){
		event.preventDefault();
		$("#__blaze-root").addClass('open')
	},
	'click #side-menu-bg'(event){
		event.preventDefault();
		$("#__blaze-root").removeClass('open')
	},
	'click #side-menu a'(event){		
		$("#__blaze-root").removeClass('open')
	},
	'click #logout'(event){    	
        Meteor.logout((err, res) => {
        	FlowRouter.go('/')
        });        
    },
    'click [data-language]'(event){
    	event.preventDefault();
    	TAPi18n.setLanguage(event.target.getAttribute('data-language'));
		T9n.setLanguage(event.target.getAttribute('data-language'))
    }
});