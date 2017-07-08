import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'

import { Travels, TravelItems } from './travels.js';
import { Items } from '/imports/api/items/items.js';

export const travelCreate = new ValidatedMethod({
	name: 'Travels.methods.create',
	validate: Travels.schema.validator(),
	applyOptions: {
		noRetry: true,
	},
	run(travel) {
		const travel_id = Travels.insert(travel, (err) => {
			console.log(err);
		});
		console.log(Meteor.userId())
		const items = Items.find({
			userId: Meteor.userId(),
			fixed:true
		})
		items.forEach(function (item) {
			if (item.daily) {
				TravelItems.insert({
					travel_id: travel_id,
					item_id: item._id,
					qnt: travel.nights
				});
			} else {
				TravelItems.insert({
					travel_id: travel_id,
					item_id: item._id,					
				});
			}
		});
		return travel_id
	}
});
export const travelRemove = new ValidatedMethod({
	name: 'Travels.methods.remove',
	validate: Travels.schema.validator(),
	run(travel) {		
		return Travels.remove(travel._id);
	}
});
export const addItem = new ValidatedMethod({
	name: 'Travels.methods.addItem',
	validate: null,
	applyOptions: {
		noRetry: true,
	},
	run(travelitem) {	
		const find = TravelItems.findOne({
			travel_id: travelitem.travel_id,
			item_id: travelitem.item_id
		});
		if (!find) {
			return TravelItems.insert(travelitem, (err)=>{
				if (err) {
					console.log(err);
				}
			});
		}
	}
});
export const updateCount = new ValidatedMethod({
	name: 'Travels.methods.updateCount',
	validate: null,
	applyOptions: {
		noRetry: true,
	},
	run(travelitem) {	
		const find = TravelItems.findOne({
			travel_id: travelitem.travel_id,
			item_id: travelitem.item_id
		});
		if (find) {
			return TravelItems.update({
				travel_id: travelitem.travel_id,
				item_id: travelitem.item_id
			}, {
				$set: {qnt: travelitem.qnt}
			}, (err)=>{
				if (err) {
					console.log(err);
				}
			});
		}
	}
});
export const removeItem = new ValidatedMethod({
	name: 'Travels.methods.removeItem',
	validate: null,
	applyOptions: {
		noRetry: true,
	},
	run(travelitem) {
		const find = TravelItems.findOne({
			travel_id: travelitem.travel_id,
			item_id: travelitem.item_id
		});
		if (find) {
			return TravelItems.remove(travelitem)
		}
	}
});
export const setCheckedStatus = new ValidatedMethod({
	name: 'Travels.methods.checkitem',
	validate: TravelItems.schema.validator({ clean: true, filter: false }),
	run(travelitem) {
		const oldtravelitem = TravelItems.findOne(
			{
				travel_id: travelitem.travel_id,
				item_id: travelitem.item_id
			}
		);

		if (travelitem.checked === oldtravelitem.checked) {		
			return;
		}

		TravelItems.update(oldtravelitem, { $set: {
			checked: travelitem.checked,
		} });
	},
});
