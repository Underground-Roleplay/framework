import * as alt from 'alt-client';
import * as natives from 'natives';
import Core from "../main";

const list = {}


const getEntity = async (id, type, pos, data) => {
    const localId = await createEntity(type, pos, data)
    if(!list[`${id}_${type}`]){
        list[`${id}_${type}`] = {
            id: id,
            type: type,
            pos: pos,
            data: data,
            local: localId
        }
        return list[`${id}_${type}`]
    }
    return list[`${id}_${type}`]
}

const createEntity = async (type, pos, data) => {
    if(type === 1){
        const pedId = await createPed(pos, data)
        return pedId
    }
    if(type === 2){
        const markerTimer = createMarker(pos, data)
        return markerTimer
    }
}

const createMarker = (pos, data) => {
    console.log(data)
    if(!data.type && data.type !== 0) throw new Error('Missing parameters');
    const marker = alt.everyTick(() => {
        natives.drawMarker(
            data.type,
            pos.x,
            pos.y,
            pos.z,
            data.dirx || 0,
            data.diry || 0,
            data.dirz || 0,
            data.rotx || 0,
            data.roty || 0,
            data.rotz || 0,
            data.scalex || 0.25,
            data.scaley || 0.25,
            data.scalez || 0.25,
            data.r,
            data.g,
            data.b,
            data.a,
            false,
            true,
            2,
            false,
            undefined,
            undefined,
            false
        );
    })
    return marker
}

const createPed = async (pos, data) => {
    if(!data.pedType || !data.modelHash) return;
    await Core.Functions.RequestModel(data.modelHash)
    const ped = natives.createPed(data.pedType, data.modelHash, pos.x, pos.y, pos.z, 0, false, false)
    natives.clearPedTasksImmediately(ped);
    natives.setEntityInvincible(ped, true);
    natives.setBlockingOfNonTemporaryEvents(ped, true);
    natives.freezeEntityPosition(ped, true);
    return ped;
}

// const destroyEntities = () => {
//     for(let ent in list) {
//         let entity = list[ent];
//         if(entity) delete entity;
//     }
// }

export default {getEntity, createPed}