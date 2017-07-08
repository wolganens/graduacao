import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema'

export const insert = new ValidatedMethod({
	name: 'Users.methods.insert',
	validate: new SimpleSchema({
		email: {
	        type: String,
        	regEx: SimpleSchema.RegEx.Email
	    },
	    password: {
	    	type: String
	    }
	}).validator(),
	run(user) {
		if(Meteor.isServer){
			if (!user.password || !user.email) {
				throw new Meteor.Error(500, 'Preencha todos os campos!');
			}
			const user_id = Accounts.createUser({
				password: user.password,
				email: user.email,
			});
			if (user_id) {
				return true;
			} else {				
				throw new Meteor.Error(500, 'Falha ao criar sua conta, entre em contato.');
			}
		}
		
	}
});
