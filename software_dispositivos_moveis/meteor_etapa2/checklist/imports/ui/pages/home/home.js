import './home.html'
import {notyError} from '/imports/ui/lib/errors.js'

Template.homePage.onCreated(function(){
	this.subscribe('profile');
})
Template.homePage.events({
	'click [data-social-login]' ( event, template ) {
		event.preventDefault();
		const service = event.target.getAttribute( 'data-social-login' ),
		options = {
			requestPermissions: [ 'email' ]
		};

		if ( service === 'loginWithTwitter' ) {
			delete options.requestPermissions;
		}

		Meteor[ service ]( options, notyError);
	}
});