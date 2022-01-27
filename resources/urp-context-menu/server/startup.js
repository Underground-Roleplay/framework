/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import Core from 'urp-core';
import * as chat from 'urp-chat';

/////////////////////////////////////////////////////////////////////////////////////
// VEHICLE CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////////

alt.onClient('context:vehicle:engine', (source) => {
    Core.Vehicles.handleToggleEngine(source, source.vehicle);
});

/////////////////////////////////////////////////////////////////////////////////////
// POLICE CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////////

alt.onClient('context:police:cuff', (source) => {
    Core.Police.setHandcuffs(source);
});

alt.onClient('context:police:uncuff', (source) => {
    Core.Police.removeHandcuffs(source);
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

alt.onClient('context:vehicle:lock', (source) => {
    if (!source) return;
    Core.Vehicles.vehicleLockState(source);
});
