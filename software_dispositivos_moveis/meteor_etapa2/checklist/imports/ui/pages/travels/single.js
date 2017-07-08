import './single.html'
import Noty from 'noty';
import { TAPi18n } from 'meteor/tap:i18n';

import { travelRemove } from '../../../api/travels/methods.js';

Template.travelSingle.events({
	'click .delete'(){
		const travel = this;
		var n = new Noty({
			text: TAPi18n.__('sure'),
			theme: 'mint',
			type: 'alert',
			buttons: [
				Noty.button(TAPi18n.__('yes'), 'btn btn-danger', function () {
					travelRemove.call(travel);
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