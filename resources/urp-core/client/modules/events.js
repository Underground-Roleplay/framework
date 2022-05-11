import * as alt from 'alt-client';
import * as natives from 'natives';
import Core from '../main';

//  Initialize Ticks
alt.onServer('Core:Client:CharacterLoaded', async () => {
    Core.Functions.startTicks();
    Core.Utils.interactionMode();
    Core.Functions.disableBehaviours();
});

//  Respawn Manager
alt.onServer('Core:Character:Respawned', () => {
    Core.Functions.disableConfigFlags();
});

//  Entity sync
alt.onServer('entitySync:create', async (id, type, pos, data) => {
    Core.Entities.getEntity(id, type, pos, data);
    alt.log(`[ENTITY] Created entity ${id} (Type ${type})`);
});

alt.onServer('entitySync:remove', (id, type) => {
    Core.Entities.destroyEntity(id, type);
    alt.log(`[ENTITY] Destroyed entity ${id} (Type ${type})`);
});

alt.onServer('entitySync:updatePosition', (id, type, pos) => {
    Core.Entities.updatePos(id, type, pos);
    alt.log(`[ENTITY] Entity position updated ${id} (Type ${type})`);
});

//  Data manager
alt.onServer('playerData:set', (key, value) => {
    Core.Functions.handleSetplayerData(key, value);
});

alt.on('playerData:changed', (key, value, old) => {
    if (key === 'isDead') {
        Core.Functions.handleDeath(value);
    }
});

alt.on('connectionComplete', () => {
    Core.Browser.createInstance();
});

alt.on('disconnect', () => {
    Core.Browser.destroyInstance();
    // Core.Entities.destroyEntities()
});

alt.on('streamSyncedMetaChange', (entity, key, value, oldValue) => {
    Core.Functions.handleVehicleStates(entity, key, value, oldValue);
});

//TEMP
let myObjects = [];

alt.on('streamSyncedMetaChange', (entity, key, value, oldValue) => {
    if (entity instanceof alt.Player) {
        if (entity === alt.Player.local) return;
        if (key !== 'attachment') return;
        if (value) {
            let objData = JSON.parse(value);
            myObjects[entity.id] = natives.createObject(
                objData.hash,
                0,
                0,
                0,
                false,
                false,
                false
            );
            natives.attachEntityToEntity(
                myObjects[entity.id],
                entity.scriptID,
                natives.getPedBoneIndex(entity.scriptID, objData.hand),
                0,
                0,
                0,
                0,
                0,
                0,
                false,
                true,
                true,
                false,
                1,
                true
            );
        } else {
            if (myObjects[entity.id]) {
                let tmp = myObjects[entity.id];
                myObjects[entity.id] = natives.detachEntity(
                    myObjects[entity.id],
                    true,
                    true
                );
                alt.setTimeout(() => {
                    natives.deleteObject(tmp);
                }, 5000);
            }
        }
    }
});

alt.on('gameEntityDestroy', (entity) => {
    if (!myObjects[entity.id]) return;
    myObjects[entity.id] = natives.deleteObject(myObjects[entity.id]);
});

alt.onServer('police:setHandsCuff', () => {
    natives.setEnableHandcuffs(alt.Player.local.scriptID, true);
    Core.Functions.loadAnim('mp_arresting');
    alt.setTimeout(() => {
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
    }, 200);
});

alt.everyTick(() => {
    if (!alt.Player.local.hasSyncedMeta('HasHandcuffs')) return;
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
    natives.uncuffPed(alt.Player.local.scriptID, true);
    Core.Functions.stopAnim();
});

let alert = null;
alt.onServer('Alert:createBlip', (cds, name) => {
    alt.log(alert);
    if (alert) {
        alert.destroy();
        alert = null;
    }
    alert = Core.Functions.generateBlip(cds, name);
    alt.setTimeout(() => {
        alert.destroy();
        alert = null;
    }, 15000);
    return;
});
