import '../../../ui/layouts/homeLayout.js'
import '/imports/ui/pages/home/home.js'
import '/imports/ui/pages/auth/emailsignup.js'

FlowRouter.route('/', {
	action: function() {
		if (!Meteor.userId()){
	    	FlowRouter.redirect('/join')
	    } else {
			FlowRouter.redirect('/travels')
	    }		
	},
	triggersEnter: [function(context, redirect) {
	   
  	}]
});