/*import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-material-design/dist/js/ripples.min.js';
import 'bootstrap-material-design/dist/js/material.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import 'bootstrap-material-design/dist/css/ripples.min.css'*/
import '../../ui/accounts/accounts-templates.js';
import 'noty/lib/noty.css';
import './global-helpers.js'

import '/imports/ui/components/delete.js'
import '/imports/ui/components/back.js'
import './routes'

Meteor.startup(() => {
	Tracker.autorun(() => {
		let lang;

		// URL Language takes priority
		const urlLang = FlowRouter.getQueryParam('lang');
		if (urlLang) {
			lang = urlLang;		
		} else {
			// If no user language, try setting by browser (default en)
			const localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
			let locale = 'en';

			if (localeFromBrowser.match(/en/)) locale = 'en';			
			if (localeFromBrowser.match(/pt/)) locale = 'pt';

			lang = locale;
		}
		TAPi18n.setLanguage('pt');
		T9n.setLanguage('pt')		
	});
});
