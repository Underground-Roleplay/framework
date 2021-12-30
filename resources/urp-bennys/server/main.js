import Core from 'urp-core';
import * as alt from 'alt-server';



alt.onClient('Bennys:att', (source,index, id) => {
    if (source.vehicle === null) return;
    if (source.vehicle.modKit != 1 || source.vehicle.modKit == 1 ) {
        source.vehicle.modKit = 1;        
        source.vehicle.setMod(index, id);
    }
})
alt.onClient('Bennys:instalar', (source) => {
	console.log('instal');
	if (Core.Money.hasFullMoney(source, 250)) {		
			if (source.vehicle) {
				Core.Money.getPayment(source, 250)
				Core.Vehicles.saveMods(source.vehicle)
				setTimeout(() => {
					Core.Vehicles.reloadMods(source)
				}, 50);
			}else{

			}
			alt.emitClient(source, 'notify', 'error', 'erro', 'comprou')
			
	} else {
			alt.emitClient(source, 'Bennys:close')
			alt.emitClient(source, 'notify', 'error', 'erro', 'don`t money')
	}
   
})
alt.onClient('Bennys:reload', (source) => {
		console.log('relod');
		Core.Vehicles.reloadMods(source)
})

const getModsCount = (source) => {
	let data = [
		 {id: modTypes.Spoilers, name:'Spoilers', value: source.vehicle.getModsCount(modTypes.Spoilers)}, 
		 {id: modTypes.Front_Bumper, name:'Front Bumper', value: source.vehicle.getModsCount(modTypes.Front_Bumper)}, 
		 {id: modTypes.Rear_Bumper, name:'Rear Bumper', value: source.vehicle.getModsCount(modTypes.Rear_Bumper)}, 
		 {id: modTypes.Side_Skirt, name:'Side Skirt', value: source.vehicle.getModsCount(modTypes.Side_Skirt)}, 
		 {id: modTypes.Exhaust, name:'Exhaust', value: source.vehicle.getModsCount(modTypes.Exhaust)}, 
		 {id: modTypes.Frame, name:'Frame', value: source.vehicle.getModsCount(modTypes.Frame)}, 
		 {id: modTypes.Grille, name:'Grille', value: source.vehicle.getModsCount(modTypes.Grille)}, 
		 {id: modTypes.Hood, name:'Hood', value: source.vehicle.getModsCount(modTypes.Hood)}, 
		 {id: modTypes.Fender, name:'Fender', value: source.vehicle.getModsCount(modTypes.Fender)}, 
		 {id: modTypes.Right_Fender, name:'Right Fender', value: source.vehicle.getModsCount(modTypes.Right_Fender)}, 
		 {id: modTypes.Roof, name:'Roof', value: source.vehicle.getModsCount(modTypes.Roof)}, 
		 {id: modTypes.Engine, name:'Engine', value: source.vehicle.getModsCount(modTypes.Engine)}, 
		 {id: modTypes.Brakes, name:'Brakes', value: source.vehicle.getModsCount(modTypes.Brakes)}, 
		 {id: modTypes.Transmission, name:'Transmission', value: source.vehicle.getModsCount(modTypes.Transmission)}, 
		 {id: modTypes.Horns, name:'Horns', value: source.vehicle.getModsCount(modTypes.Horns)}, 
		 {id: modTypes.Suspension, name:'Suspension', value: source.vehicle.getModsCount(modTypes.Suspension)}, 
		 {id: modTypes.Armor, name:'Armor', value: source.vehicle.getModsCount(modTypes.Armor)}, 
		 {id: modTypes.Turbo, name:'Turbo', value: source.vehicle.getModsCount(modTypes.Turbo)}, 
		 {id: modTypes.Xenon, name:'Xenon', value: source.vehicle.getModsCount(modTypes.Xenon)}, 
		 {id: modTypes.Front_Wheels, name:'Front Wheels', value: source.vehicle.getModsCount(modTypes.Front_Wheels)}, 
		 {id: modTypes.Util_Shadow_Silver, name:'Util Shadow_Silver', value: source.vehicle.getModsCount(modTypes.Util_Shadow_Silver)}, 
		 {id: modTypes.Back_Wheels, name:'Back Wheels', value: source.vehicle.getModsCount(modTypes.Back_Wheels)}, 
		 {id: modTypes.Plate_holders, name:'Plate holders', value: source.vehicle.getModsCount(modTypes.Plate_holders)}, 
		 {id: modTypes.Trim_Design, name:'Trim Design', value: source.vehicle.getModsCount(modTypes.Trim_Design)}, 
		 {id: modTypes.Ornaments, name:'Ornaments', value: source.vehicle.getModsCount(modTypes.Ornaments)}, 
		 {id: modTypes.Dial_Design, name:'Dial Design', value: source.vehicle.getModsCount(modTypes.Dial_Design)}, 
		 {id: modTypes.Steering_Wheel, name:'Steering Wheel', value: source.vehicle.getModsCount(modTypes.Steering_Wheel)}, 
		 {id: modTypes.Shift_Lever, name:'Shift Lever', value: source.vehicle.getModsCount(modTypes.Shift_Lever)}, 
		 {id: modTypes.Plaques, name:'Plaques', value: source.vehicle.getModsCount(modTypes.Plaques)}, 
		 {id: modTypes.Hydraulics, name:'Hydraulics', value: source.vehicle.getModsCount(modTypes.Hydraulics)}, 
		 {id: modTypes.Boost, name:'Boost', value: source.vehicle.getModsCount(modTypes.Boost)}, 
		 {id: modTypes.Window_Tint, name:'Window Tint', value: source.vehicle.getModsCount(modTypes.Window_Tint)}, 
		 {id: modTypes.Livery, name:'Livery', value: source.vehicle.getModsCount(modTypes.Livery)}, 
		 {id: modTypes.Plate, name:'Plate', value: source.vehicle.getModsCount(modTypes.Plate)}, 
    ]
	return data
}

export const modTypes = {
	Spoilers : 0,
	Front_Bumper: 1,
	Rear_Bumper: 2,
	Side_Skirt: 3,
	Exhaust: 4,
	Frame: 5,
	Grille: 6,
	Hood: 7,
	Fender: 8,
	Right_Fender: 9,
	Roof: 10,
	Engine: 11,
	Brakes: 12,
	Transmission: 13,
	Horns: 14,
	Suspension: 15,
	Armor: 16,
	Turbo: 18,
	Xenon: 22,
	Front_Wheels: 23,
	Util_Shadow_Silver: 20,
	Back_Wheels: 24, // only for motorcycles
	Plate_holders: 25,
	Trim_Design: 27,
	Ornaments: 28,
	Dial_Design: 30,
	Steering_Wheel: 33,
	Shift_Lever: 34,
	Plaques: 35,
	Hydraulics: 38,
	Boost: 40,
	Window_Tint: 55,
	Livery: 48,
	Plate: 62,
	Colour1: 66,
	Colour2: 67
}

alt.onClient('Bennys:load', (source) => {

    alt.emitClient(source,'Bennys:loadMod',getModsCount(source))
})