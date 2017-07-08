import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './back.html'

Template.backBtn.events({	
	'click #back': function () {
		history.back();
	}	
});