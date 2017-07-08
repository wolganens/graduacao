import './register-api.js'
Meteor.startup(function () {
	const services = Meteor.settings.private.oAuth;

	const configure = () => {
		if ( services ) {
			for( let service in services ) {
				ServiceConfiguration.configurations.upsert( { service: service }, {
					$set: services[ service ]
				});
			}
		}
	};
	configure()
});