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

alt.on('playerDisconnect', async (source) => {
    Core.Character.updateBasicData(source)
})

alt.on('playerDeath', (source, killer, weaponHash) => {
    Core.Character.setDeath(source, true)
})

//Ticks
alt.onClient("Core:Server:CharacterTick", (source) => {
    Core.Character.tickManager(source)
})