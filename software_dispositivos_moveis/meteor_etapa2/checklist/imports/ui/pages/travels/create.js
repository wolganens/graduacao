import './create.html'
import { TAPi18n } from 'meteor/tap:i18n';
import Noty from 'noty';
import { Session } from 'meteor/session'
import {moment} from 'meteor/momentjs:moment'
import { notyError } from '/imports/ui/lib/errors.js';

import {travelCreate} from '/imports/api/travels/methods.js'
import 'geocomplete/jquery.geocomplete.js'

Template.travelCreate.onCreated(function(){	
})
Template.travelCreate.onRendered(function(){	
	$(function(){
		$("#location").geocomplete(
			{
				types: ["geocode"]
			}
		).bind("geocode:result", function(event, result){
			const place = {
				place_id: result.place_id,
				description: result.formatted_address
			}
		    Session.set('place', place);
	  	});	  	
        
        $('#datetimepicker1').datepicker({
        	language: 'pt-BR'
        });
	});
})
Template.travelCreate.helpers({	
});
Template.travelCreate.events({		
	"submit #travel-create-form": (event) =>{
		event.preventDefault();
		if (!Session.get('place')){
			const error = {message: "Escolha local de destino"}
			notyError(error)
			return
		}
		const travel = Session.get('place');
		travel.nights = parseInt(event.target.nights.value)
		travel.date = moment(event.target.date.value, "DD/MM/YYYY").toDate();
		travelCreate.call(travel, (err, res)=>{
			if(err) {
				notyError(err)
			} else {
				let success = new Noty({
					killer :true,
					type: 'success',
				    text     : TAPi18n.__('success_added'),
				    timeout: 1200,
				    theme: 'mint'
				}).show();
				FlowRouter.go('/travels/single/' + res)
			}
		})
	}
});