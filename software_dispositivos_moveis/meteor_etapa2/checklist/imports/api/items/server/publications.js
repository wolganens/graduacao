import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'

import { Items } from '../items.js';
import { Travels,TravelItems } from '/imports/api/travels/travels.js';
import { publishComposite } from 'meteor/reywood:publish-composite';

Meteor.publish('items', function () {
	if (!this.userId) {
	    return this.ready();
	}
	return Items.find({userId: this.userId});
});

publishComposite('travelItems', function(travel_id) {
    return {
        find() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return TravelItems.find({ travel_id: travel_id });
        },
        children: [
        	{
		        find(travelitem){
		        	return Items.find({_id: travelitem.item_id})
		        }
	        }
        ]
    }
});
/*
Meteor.publish('travelItems', function (travel_id) {
	if (!this.userId) {
	    return this.ready();
	}
	const travelitemids = TravelItems.find({travel_id: travel_id}).map(function (travelitem) {
		return travelitem.item_id
	});
	return Items.find({
		_id: {
			$in: TravelItems.find({travel_id: travel_id}).map(function (travelitem) {
				return travelitem.item_id
			})
		},
		userId: this.userId
	});
});
*/

Meteor.publish('notIntravelItems', function (travel_id) {
	if (!this.userId) {
	    return this.ready();
	}
	const travelitemids = TravelItems.find({travel_id: travel_id}).map(function (travelitem) {
		return travelitem.item_id
	});
	return Items.find({
		_id: {
			$nin: travelitemids
		},
		userId: this.userId
	});
});