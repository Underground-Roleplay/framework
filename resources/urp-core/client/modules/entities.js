import * as alt from 'alt-client';
import * as natives from 'natives';
import Core from "../main";

const nearItems = [];

const list = []

const getEntity = async (id, type, pos, data) => {
    if(!list[`${id}_${type}`]){
        const localId = await createEntity(type, pos, data, id)
        list[`${id}_${type}`] = {
            id: id,
            type: type,
            pos: pos,
            data: data,
            local: localId
        }
        return list[`${id}_${type}`]
    }
    if(!data && !list[`${id}_${type}`].local && pos === list[`${id}_${type}`].pos){
        list[`${id}_${type}`].local = await createEntity(list[`${id}_${type}`].type, list[`${id}_${type}`].pos, 
        list[`${id}_${type}`].data)
        return list[`${id}_${type}`]
    }
    if(!list[`${id}_${type}`].local && list[`${id}_${type}`].pos !== pos){
        console.log(pos)
        list[`${id}_${type}`].pos = pos
        list[`${id}_${type}`].local = await createEntity(list[`${id}_${type}`].type, list[`${id}_${type}`].pos, 
        list[`${id}_${type}`].data)
        return list[`${id}_${type}`]
    }
    return list[`${id}_${type}`]
}

const createEntity = async (type, pos, data, id = undefined) => {
    if(type === 1){
        const pedId = await createPed(pos, data)
        return pedId
    }
    if(type === 2){
        const markerTimer = createMarker(pos, data)
        return markerTimer
    }
    if(type === 3){
        const itemID = createDroppedItem(id, pos, data)
        return itemID
    }
}

const updatePos = async (id, type, pos) => {
    destroyEntity(id, type)
    getEntity(id, type, pos)
}

const createDroppedItem = (id, pos, data) => {
    const defaultMarker = {
        type: 0,
        scalex: 1,
        scaley: 1,
        scalez: 1,
        ...new alt.RGBA(0,181,204,200)
    }
    const marker = createMarker(pos, defaultMarker)
    data.marker = marker
    if(nearItems.length > 0){
        for(let i = 0; i < nearItems.length; i++){
            if(!nearItems[i]){
                nearItems[i] = data
                nearItems[i].slot = i
                nearItems[i].entityID = id
                return i;
            }
        }
    }
    const idx = nearItems.push(data) - 1
    nearItems[idx].slot = idx
    nearItems[idx].entityID = id
    return idx
}

const createMarker = (pos, data) => {
    if(!data.type && data.type !== 0) throw new Error('Missing parameters');
    const marker = alt.everyTick(() => {
        natives.drawMarker(
            data.type,
            pos.x,
            pos.y,
            pos.z - 1,
            data.dirx || 0,
            data.diry || 0,
            data.dirz || 0,
            data.rotx || 0,
            data.roty || 0,
            data.rotz || 0,
            data.scalex || 2.5,
            data.scaley || 2.5,
            data.scalez || 2.5,
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

const destroyEntity = (id, type) => {
    if(!list[`${id}_${type}`]) return;
    if(type === 1){
        const { local } = list[`${id}_${type}`]
        natives.deletePed(local)
        list[`${id}_${type}`].local = undefined
    }
    if(type === 2){
        const { local } = list[`${id}_${type}`]
        alt.clearEveryTick(local)
        list[`${id}_${type}`].local = undefined
    }
    if(type === 3){
        const { local } = list[`${id}_${type}`]
        if(nearItems[local] && nearItems[local].marker){
            alt.clearEveryTick(nearItems[local].marker)
        }
        nearItems[local] = undefined;
        list[`${id}_${type}`].local = undefined
    }
}

// const destroyEntities = () => {
//     for(let ent in list) {
//         let entity = list[ent];
//         if(entity) delete entity;
//     }
// }

export default {getEntity, createPed, destroyEntity, updatePos, nearItems}