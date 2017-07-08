import { Meteor } from 'meteor/meteor';

Meteor.publish('profile', function () {
	return Meteor.users.find(this.userId, {fields:{
		'emails' : 1,
		'services.facebook': 1,
		'services.google': 1,
		'username': 1,
		'profile.name': 1,		
	}});
});
Meteor.publish('users.all', function () {
	return Meteor.users.find({}, {fields:{
		'emails' : 1,
		'services.facebook': 1,
		'services.google': 1,
		'profile.name': 1,
		'profile.guest': 1,
		'createdAt': 1
	}});
});