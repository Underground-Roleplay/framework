/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import Core from 'urp-core';
import * as chat from 'urp-chat';

/////////////////////////////////////////////////////////////////////////////////////
// VEHICLE CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////////

alt.onClient('context:vehicle:engine', (source, vehicle) => {
    Core.Vehicles.handleToggleEngine(source, vehicle);
});

alt.onClient('context:vehicle:lock', (source, vehicle) => {
    if (!source || !vehicle) return;
    Core.Vehicles.vehicleLockState(source, vehicle);
});

/////////////////////////////////////////////////////////////////////////////////////
// POLICE CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////////

alt.onClient('context:police:cuff', (source, targetPlayer) => {
    Core.Police.cuffsState(source, targetPlayer);
});

alt.onClient('context:police:putinprison', (source, targetPlayer) => {
    Core.Police.putInPrison(source, targetPlayer);
});

/////////////////////////////////////////////////////////////////////////////////////
// MECHANIC CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////////

alt.onClient('context:mechanic:repair', (source) => {
    Core.Functions.repairVehicle(source);
});

/////////////////////////////////////////////////////////////////////////////////////
// PLAYER CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////////

alt.onClient('context:player:showssn', (source) => {
    if (!source) return;
    let playerData = source.getMeta('playerData');
    chat.send(source, `your ssn is ${playerData.ssn}`);
});

alt.onClient('context:player:showid', (source) => {
    if (!source) return;
    let playerData = source.getMeta('playerData');
    chat.send(source, `your id is ${playerData.id}`);
});
alt.onClient('context:player:status', (source) => {
    if (!source) return;
    chat.send(
        source,
        `your id is ${JSON.stringify(source.getMeta('playerData'))}`
    );
});
