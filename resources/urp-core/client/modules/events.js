import * as alt from 'alt-client';
import * as natives from 'natives';
import Core from '../main';

//  Initialize Ticks
alt.onServer('Core:Client:CharacterLoaded', () => {
    Core.Functions.startTicks()
    Core.Functions.interactionMode()
})

//  Entity sync
alt.onServer("entitySync:create", async (id, type, pos, data) => {
    const entity = await Core.Entities.getEntity(id, type, pos, data)
    alt.log(`[ENTITY] Created entity ${id} (Type ${type})`);
    console.log(entity)
})

//  Data manager
alt.onServer('playerData:set', (key, value) => {
    Core.Functions.handleSetplayerData(key, value)
})

alt.on('playerData:changed', (key, value, old) => {
    if(key === 'isDead'){
    Core.Functions.handleDeath(value)
    }
})

alt.on('connectionComplete', () => {
    Core.Browser.createInstance()
})

alt.on('disconnect', () => {
    Core.Browser.destroyInstance()
    // Core.Entities.destroyEntities()
})