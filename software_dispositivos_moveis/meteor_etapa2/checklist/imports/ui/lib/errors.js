import { TAPi18n } from 'meteor/tap:i18n';
import Noty from 'noty';


export const notyError = (error) => {	
	console.log("eeeeeeeeeeeeeeeeeeeeeeeerror");
	console.log(error)
	if (error.error === 'validation-error') {
	   console.dir(error, 'error ')
	}
	if (error) {
		let failed = new Noty({
			killer :true,
		    text     : error.message,
		    timeout: 5000,
		    type: 'error',
		    theme: 'mint'
		}).show();
	}	
};