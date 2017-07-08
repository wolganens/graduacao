import './single.html'
import Noty from 'noty';
import { TAPi18n } from 'meteor/tap:i18n';

import { categoryRemove } from '../../../api/categories/methods.js';

Template.categorySingle.events({
	'click .delete'(){
		const cat = this;
		var n = new Noty({
			text: TAPi18n.__('sure'),
			theme: 'mint',
			buttons: [
				Noty.button(TAPi18n.__('yes'), 'btn btn-success', function () {
					categoryRemove.call(cat);
					n.close();					
					let not_success = new Noty({
						killer :true,
					    text     : TAPi18n.__('success_delete'),
					    timeout: 1200,
					    type: 'success',
					    theme: 'mint'
					}).show();
				}),

				Noty.button(TAPi18n.__('no'), 'btn btn-error', function () {					
					n.close();
				})
			]
		}).show();
	}
});