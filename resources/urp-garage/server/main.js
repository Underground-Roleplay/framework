import Core from 'urp-core';
import * as alt from 'alt-server';
import { GARAGE_INTERACTIONS, GARAGE_SLOTS } from '../shared/garagesList';

Core.Interactions.createMultipleInteractions(GARAGE_INTERACTIONS)

const getClosesestGarage = (source) => {
    for(let i = 0; i < GARAGE_INTERACTIONS.length; i++){
        const garagePos = new alt.Vector3(GARAGE_INTERACTIONS[i].x, GARAGE_INTERACTIONS[i].y, GARAGE_INTERACTIONS[i].z)
        const distanceToGarage = source.pos.distanceTo(garagePos)
        if(distanceToGarage <= 10){
            return i
        }
    }
    return false
}

const getFreeGarageSlot = (slots) => {
    for(let i = 0; i < slots.length; i++){
        const position = new alt.Vector3(slots[i].position)
        const carInSpot = alt.Vehicle.all.findIndex((v) => v.pos.distanceTo(position) < 1)
        if(carInSpot === -1) return i
    }
    return false
}

alt.onClient('Garage:Refresh', (source, ssn) => {
    Core.Vehicles.loadSourceGarage(source)
})

alt.onClient('Garage:Withdraw', (source, data) => { 
    const { id } = data
    const currentGarage = getClosesestGarage(source)
    if(currentGarage === false) return;
    const garageSlots = GARAGE_SLOTS[currentGarage]
    const freeSlot = getFreeGarageSlot(garageSlots)
    if(freeSlot === false){
        alt.emitClient(source,'notify', 'error', 'GARAGE', 'THIS GARAGE DONT HAVE MORE SLOTS')
        return;
    }
    Core.Vehicles.spawnById(source, id, garageSlots[freeSlot].position, garageSlots[freeSlot].rotation)
    alt.emitClient(source,'alert')
})

// alt.onClient('Garage:Save', (source, data) => {

// })

alt.on('loaded', (source, data) => {
    alt.emitClient(source, 'Garage:UpdateVeh', JSON.stringify(data))
});