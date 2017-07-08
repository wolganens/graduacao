import './single.html'
import Noty from 'noty';
import { TAPi18n } from 'meteor/tap:i18n';

import { itemRemove } from '../../../api/items/methods.js';

Template.itemSingle.events({
	'click .delete'(){
		const item = this;
		var n = new Noty({
			text: TAPi18n.__('sure'),
			theme: 'mint',
			buttons: [
				Noty.button(TAPi18n.__('yes'), 'btn btn-danger', function () {
					itemRemove.call(item);
					n.close();					
					let not_success = new Noty({
						killer :true,
						type: 'success',
					    text     : TAPi18n.__('success_delete'),
					    timeout: 1200,
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