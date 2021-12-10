import * as alt from 'alt-server';
import Core from '../main';

// alt:V default events
alt.on('playerConnect', async (source) => {
    if(!Core.DBReady) {
        return source.kick();
    }
    if (!source || !source.valid) {
        return;
    }
    console.log(Core.Translate('PLAYER.NEW_CONNECTED', { playerName: source.name }))
    alt.emit('Core:CreateLog', 'default', 'SERVER', undefined, `A player have been connected ${source.name}`)
    Core.Functions.login(source)
})

alt.on('entityEnterColshape', (colshape, source) => {
    Core.Interactions.handleEnterInteraction(colshape, source)
})

alt.on('entityLeaveColshape', (colshape, source) => {
    Core.Interactions.handleLeaveInteraction(colshape, source)
})

alt.on('playerDisconnect', async (source) => {
    Core.Character.updateBasicData(source)
    alt.emit('Core:CreateLog', 'default', 'SERVER', undefined, `A player has disconnect ${source.name}`)
})

alt.on('playerDeath', (source, killer, weaponHash) => {
    Core.Character.setDeath(source, true)
})

//  Vehicles

alt.on('Core:Garage:Spawn', (source, id, pos, rot) => {
    Core.Vehicles.spawnById(source, id, pos, rot)
})
alt.on('playerEnteredVehicle', (source, vehicle, seat) => { 
    Core.Vehicles.sourceEnteredInVehicle(source, vehicle, seat)
})

alt.on('playerLeftVehicle', (source, vehicle, seat) => { 
    Core.Vehicles.sourceLeavesVehicle(source, vehicle, seat)
})


//  Attachment (TEMP)
alt.onClient('character:addAttachment', (source, hash, hand) => {
    if (!source) return;
    const obj = {
        hash: hash,
        hand: hand,
    };
    source.setStreamSyncedMeta('attachment', JSON.stringify(obj));
});

alt.onClient('character:destroyAttachment', (source) => {
    if (!source) return;
    source.setStreamSyncedMeta('attachment', '');
});


//  Interaction
alt.onClient('interaction:trigger', (source, type) => {
    Core.Interactions.triggerInteraction(source, type)
})

//  Ticks
alt.onClient("Core:Server:CharacterTick", async (source) => {
    Core.Character.tickManager(source)
})