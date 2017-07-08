const getUserIdentity = ( user ) => {
    let emails   = user.emails,
    services = user.services;

    if ( emails ) {
        return emails[ 0 ].address;
    } else if ( services ) {
        return _getEmailFromService( services );
    } else {
        return user.profile.name;
    }
};

const _getEmailFromService = ( services ) => {
    for ( let service in services ) {
        let current = services[ service ];
        return service === 'twitter' ? current.screenName : current.email;
    }
};

Template.registerHelper( 'userIdentity', () => {
    if (Meteor.user()) {
        return getUserIdentity( Meteor.user() );
    } else {
        return ''
    }
});
Template.registerHelper( 'userPicture' ,() =>{
    Tracker.autorun(function () {
        const user = Meteor.user();
        if (user && user.services) {
            if (user.services.google){
                return '<img src="' + user.services.google.picture +'" id="profile-picture">'
            } else if (user.services.facebook) {
                return '<img src="//graph.facebook.com/'+ user.services.facebook.id + '/picture?type=large" id="profile-picture">'
            } else {
                return '<svg id="profile-picture" width="30" height="30" class="pull-left icon"><use xlink:href="#user" /></svg>';      
            }
        }
        return '';        
    });
});