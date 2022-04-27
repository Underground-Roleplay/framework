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

alt.on('search:inventory:player', (i, data) => {
    const targetPlayer = alt.Player.getByScriptID(data);
    if (!targetPlayer) return;
    alt.emitServer('context:search:inventory:player', targetPlayer);
});

alt.on('context:police:cuff', (i, data) => {
    const targetPlayer = alt.Player.getByScriptID(data);
    if (!targetPlayer) return;
    alt.emitServer('context:police:cuff', targetPlayer);
});

alt.on('context:police:putinprison', (i, data) => {
    const targetPlayer = alt.Player.getByScriptID(data);
    if (!targetPlayer) return;
    alt.emitServer('context:police:putinprison', targetPlayer);
});
