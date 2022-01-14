import * as alt from 'alt-client';
import * as context from '/client/context';
import * as contextInteractionBuilder from '/client/interactionBuilder';
import Core from 'urp-core';
import * as natives from 'natives';

import chat from 'urp-chat';

/////////////////////////////////////////////////////////////////////////////////
// POLICE CONTEXT EVENTS
////////////////////////////////////////////////////////////////////////////////
alt.onServer('police:setHandsCuff', () => {
    //Core.Functions.setHandcuffs();
    natives.setEnableHandcuffs(alt.Player.local.scriptID, true);
    alt.log(natives.isPedCuffed(alt.Player.local.scriptID));
    Core.Functions.loadAnim('mp_arresting');
    natives.taskPlayAnim(
        alt.Player.local.scriptID,
        'mp_arresting',
        'idle',
        3.0,
        -3.0,
        -1,
        63,
        0,
        0,
        0,
        0
    );
});

alt.everyTick(() => {
    if (alt.Player.local.getSyncedMeta('HasHandcuffs')) {
        natives.disableControlAction(0, 24, true);
        natives.disableControlAction(0, 25, true);
        natives.disableControlAction(0, 12, true);
        natives.disableControlAction(0, 13, true);
        natives.disableControlAction(0, 14, true);
        natives.disableControlAction(0, 15, true);
        natives.disableControlAction(0, 16, true);
        natives.disableControlAction(0, 17, true);
        natives.disableControlAction(0, 37, true);
        natives.disableControlAction(0, 44, true);
        natives.disableControlAction(0, 45, true);
        natives.disableControlAction(0, 263, true);
        natives.disableControlAction(0, 264, true);
        natives.disableControlAction(0, 140, true);
        natives.disableControlAction(0, 141, true);
        natives.disableControlAction(0, 257, true);
        natives.disableControlAction(0, 345, true);
    } else {
        natives.enableControlAction(0, 24, true);
        natives.enableControlAction(0, 25, true);
        natives.enableControlAction(0, 12, true);
        natives.enableControlAction(0, 13, true);
        natives.enableControlAction(0, 14, true);
        natives.enableControlAction(0, 15, true);
        natives.enableControlAction(0, 16, true);
        natives.enableControlAction(0, 17, true);
        natives.enableControlAction(0, 37, true);
        natives.enableControlAction(0, 44, true);
        natives.enableControlAction(0, 45, true);
        natives.enableControlAction(0, 263, true);
        natives.enableControlAction(0, 264, true);
        natives.enableControlAction(0, 140, true);
        natives.enableControlAction(0, 141, true);
        natives.enableControlAction(0, 257, true);
        natives.enableControlAction(0, 345, true);
    }
});

alt.onServer('police:uncuff', () => {
    natives.uncuffPed(alt.Player.local, true);
    Core.Functions.stopAnim();
    //Core.Functions.removeHandcuffs();
});

// /////////////////////////////////////////////////////////////////////////////////
// // PLAYER CONTEXT EVENTS
// ////////////////////////////////////////////////////////////////////////////////

alt.on('context:player:showssn', () => {
    const ssn = Core.Functions.getPlayerData('ssn');
    alt.log(ssn);
});

alt.on('context:player:showid', () => {
    const id = Core.Functions.getPlayerData('id');
    alt.log(id);
});

// alt.on('context:police:cuff', () => {
//     alt.log(`aqui1`);
//     //Core.Functions.setHandcuffs();
//     natives.setEnableHandcuffs(alt.Player.local.scriptID, true);
//     alt.log(natives.isPedCuffed(alt.Player.local.scriptID));
//     Core.Functions.loadAnim('mp_arresting');
//     natives.taskPlayAnim(
//         alt.Player.local.scriptID,
//         'mp_arresting',
//         'idle',
//         3.0,
//         -3.0,
//         -1,
//         63,
//         0,
//         0,
//         0,
//         0
//     );
//     natives.setPedComponentVariation(alt.Player.local.scriptID, 7, 41, 0, 2);
//     // "mp_arresting","idle"
// });
