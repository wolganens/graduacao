import './create.html'

import { TAPi18n } from 'meteor/tap:i18n';
import Noty from 'noty';
import {Categories} from '/imports/api/categories/categories.js'
import {listCreate} from '/imports/api/lists/methods.js'

Template.listCreate.onCreated(function(){	
})
Template.listCreate.helpers({
	
});
Template.listCreate.events({		
	"submit #list-create-form": (event) =>{
		event.preventDefault();
		const list = {
			name: event.target.name.value,			
		}				
		listCreate.call(list, (err, id) =>{				
			event.target.name.value = ""
			event.target.name.focus()
			if (!err) {
				let failed = new Noty({
					killer :true,
				    text     : TAPi18n.__('success_added'),
				    timeout: 1200,
				    type: 'success',
				    theme: 'mint'
				}).show();
			} else {
				let success = new Noty({
					killer :true,
					type: 'alert',
				    text     : TAPi18n.__('failed_added'),
				    timeout: 1200,
				    theme: 'mint'
				}).show();
			}
		});
	}
});