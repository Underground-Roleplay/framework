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
})

alt.on('playerDeath', (source, killer, weaponHash) => {
    Core.Character.setDeath(source, true)
})

//Attachment (TEMP)
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


//Interaction
alt.onClient('interaction:trigger', (source, type) => {
    Core.Interactions.triggerInteraction(source, type)
})

//Ticks
alt.onClient("Core:Server:CharacterTick", (source) => {
    Core.Character.tickManager(source)
})