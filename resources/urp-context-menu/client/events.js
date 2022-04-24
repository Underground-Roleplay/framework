import * as alt from 'alt-client';
import Core from 'urp-core';

/////////////////////////////////////////////////////////////////////////////////////
// POLICE CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////
// // PLAYER CONTEXT EVENTS
// ////////////////////////////////////////////////////////////////////////////////

alt.on('context:vehicle:trunk', (i, data) => {
    const targetVehicle = alt.Vehicle.getByScriptID(data);
    if (!targetVehicle) return;
    alt.emitServer('stash:inventory:dataRequest:vehicle', targetVehicle);
});

alt.on('context:vehicle:lock', (i, data) => {
    const targetVehicle = alt.Vehicle.getByScriptID(data);
    if (!targetVehicle) return;
    alt.emitServer('context:vehicle:lock', targetVehicle);
});

alt.on('context:vehicle:engine', (i, data) => {
    const targetVehicle = alt.Vehicle.getByScriptID(data);
    if (!targetVehicle) return;
    alt.emitServer('context:vehicle:engine', targetVehicle);
});
