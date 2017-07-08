import './emailsignup.html';
import { insert } from '../../../api/users/methods.js';
import {meteor} from 'meteor/meteor'
import { notyError } from '/imports/ui/lib/errors.js';
import Noty from 'noty';

Template.signInWithEmailModal.onDestroyed(function () {
});
Template.signInWithEmailModal.onRendered(function(){
    
});

Template.signInWithEmailModal.onCreated( () => {
    let template = Template.instance();
    const page = FlowRouter.current().route.name == 'signup' ? 'create' : 'signin';
    template.createOrSignIn = new ReactiveVar(page);
});
Template.signInWithEmailModal.helpers({
    create(){    
        return Template.instance().createOrSignIn.get() == 'create';
    }
});
Template.signInWithEmailModal.events({
    'click [data-auth-type]' ( event, template ) {
        let type = event.target.getAttribute( 'data-auth-type' );
        template.createOrSignIn.set( type );
    },
    'submit form' ( event, template ) {
        event.preventDefault();
        let btn = document.getElementById('btn-form');
        btn.textContent = 'Por favor aguarde...';
        btn.classList.add('disabled');
        user = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        if (template.createOrSignIn.get() == 'create') {
            insert.call(user, (err, res) => {
                console.log(err);
                console.log(res);
                notyError(err)
                btn.textContent = 'Criar uma conta';
                btn.classList.remove('disabled');                
                if (!err) {
                    Meteor.loginWithPassword(user.email, user.password, (err, res)=>{
                        FlowRouter.go('/travels');                        
                    });
                }
            });
        } else {
            Meteor.loginWithPassword(user.email, user.password, (err, res)=>{                
                notyError(err)
                btn.textContent = 'Entrar';
                btn.classList.remove('disabled');                
                if (!err) {
                    FlowRouter.go('/travels');                    
                }
            });
        }
    },
    'click .btn-email'(event,template) {
        template.createOrSignIn.set('create');
    },
    'click #signin'(event, template){
        event.preventDefault();
        template.createOrSignIn.set('signin');
    }
});
