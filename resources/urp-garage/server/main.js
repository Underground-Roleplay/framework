import Core from 'urp-core';
import db from 'mysql2-wrapper';
import * as alt from 'alt-server';
import { GARAGE_INTERACTIONS, GARAGE_SLOTS } from '../shared/garagesList';

Core.Interactions.createMultipleInteractions(GARAGE_INTERACTIONS);

const getClosesestGarage = (source) => {
    for (let i = 0; i < GARAGE_INTERACTIONS.length; i++) {
        const garagePos = new alt.Vector3(
            GARAGE_INTERACTIONS[i].x,
            GARAGE_INTERACTIONS[i].y,
            GARAGE_INTERACTIONS[i].z
        );
        const distanceToGarage = source.pos.distanceTo(garagePos);
        if (distanceToGarage <= 10) {
            return i;
        }
    }
    return false;
};

const getFreeGarageSlot = (slots) => {
    for (let i = 0; i < slots.length; i++) {
        const position = new alt.Vector3(slots[i].position);
        const carInSpot = alt.Vehicle.all.findIndex(
            (v) => v.pos.distanceTo(position) < 1
        );
        if (carInSpot === -1) return i;
    }
    return false;
};

alt.onClient('Garage:Refresh', async (source) => {
    const ssn = Core.Functions.getPlayerData(source, 'ssn');
    const vehList = [];
    const result = await executeSync(
        'SELECT * from characters_vehicles WHERE ssn = ?',
        [ssn]
    );
    for (let i = 0; i < result.length; i++) {
        const vehicleData = result[i];
        if (vehicleData) {
            vehicleData.position = JSON.parse(vehicleData.position);
            vehicleData.status = JSON.parse(vehicleData.status);
            vehicleData.metadata = JSON.parse(vehicleData.metadata);
            vehicleData.customizations = JSON.parse(vehicleData.customizations);
            vehList.push(vehicleData);
        }
    }
    alt.emitClient(source, 'Garage:UpdateVeh', JSON.stringify(vehList));
});

alt.onClient('Garage:Withdraw', (source, data) => {
    const { id } = data;
    const currentGarage = getClosesestGarage(source);
    if (currentGarage === false) return;
    const garageSlots = GARAGE_SLOTS[currentGarage];
    const freeSlot = getFreeGarageSlot(garageSlots);
    if (freeSlot === false) {
        alt.emitClient(
            source,
            'notify',
            'error',
            'GARAGE',
            'THIS GARAGE DONT HAVE MORE SLOTS'
        );
        return;
    }
    if (Core.Vehicles.pool[id]) {
        alt.emitClient(
            source,
            'notify',
            'error',
            'GARAGE',
            'VEHICLE ALREADY SPAWNED'
        );
        return;
    }
    Core.Vehicles.spawnById(
        source,
        id,
        garageSlots[freeSlot].position,
        garageSlots[freeSlot].rotation
    );
    alt.emitClient(source, 'alert');
});

alt.onClient('Garage:Save', (source) => {
    const ssn = Core.Functions.getPlayerData(source, 'ssn');
    const closestVeh = alt.Vehicle.all.find(
        (v) =>
            source.pos.distanceTo(v.pos) < 50 &&
            Core.Vehicles.getVehicleData(v, 'ssn') === ssn
    );
    if (!closestVeh) {
        alt.emitClient(
            source,
            'notify',
            'error',
            'GARAGE',
            'YOU DONT HAVE ANY VEHICLE OF YOURS CLOSE TO YOU'
        );
        return;
    }
    //Destroy veh now
    Core.Vehicles.putInGarage(source, closestVeh);
});

const executeSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response);
        };
        db.execute(query, parameters, resolvePromise, alt.resourceName);
    });
};
