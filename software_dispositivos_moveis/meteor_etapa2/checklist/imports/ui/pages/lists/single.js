import './single.html'
import Noty from 'noty';
import { TAPi18n } from 'meteor/tap:i18n';

import { listRemove } from '../../../api/lists/methods.js';

Template.listSingle.events({
	'click .delete'(){
		const list = this;
		var n = new Noty({
			text: TAPi18n.__('sure'),
			theme: 'mint',
			buttons: [
				Noty.button(TAPi18n.__('yes'), 'btn btn-danger', function () {
					listRemove.call(list);
					n.close();					
					let not_success = new Noty({
						killer :true,
					    text     : TAPi18n.__('success_delete'),
					    timeout: 1200,
					    theme: 'mint',
					    type:'success'
					}).show();					
				}),

				Noty.button(TAPi18n.__('no'), 'btn btn-error', function () {					
					n.close();
				})
			]
		}).show();
	}
});