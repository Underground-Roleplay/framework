import * as native from 'natives';
import * as alt from 'alt-client';
import Core from 'urp-core';
import chat from 'urp-chat';

/////////////////////////////////////////////////////////////////////////////////
// POLICE CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////
alt.on('context:police:cuff', () => {
    Core.Functions.setHandcuffs();
});

alt.on('context:police:uncuff', () => {
    Core.Functions.removeHandcuffs();
});

/////////////////////////////////////////////////////////////////////////////////
// PLAYER CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////

alt.on('context:player:showssn', () => {
    const ssn = Core.Functions.getPlayerData('ssn');
    alt.log(ssn);
});

alt.on('context:player:showid', () => {
    const id = Core.Functions.getPlayerData('id');
    alt.log(id);
});
