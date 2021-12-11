import * as alt from 'alt-server';
import * as Entities from 'entity-sync';

const PED_TYPE = 1
const MARKER_TYPE = 2

const addNewEntity = (type, pos, dimension, data, range) => {
    const newEntity = Entities.createGameEntity(type, pos, dimension, range)
    for (let key in data){
        Entities.setGameEntityData(newEntity, type, key, data[key]);
    }
    alt.log(`Created entity ${newEntity} with type ${type}`);
    return newEntity;
}

const setEntityPosition = (id, type, pos) => {
    Entities.setGameEntityPosition(id, type, pos)
}

const createPed = (pos, dimension, data) => {
    if(!data.pedType && data.pedType !== 0  || !data.modelHash) throw new Error('Missing parameters')
    addNewEntity(PED_TYPE, pos, dimension, data, 250)
}

const createMarker = (pos, dimension, data) => {
    if(!data.type && data.type !== 0 || !data.r && data.r !== 0 || 
        !data.g && data.g !== 0 || !data.b && data.b !== 0|| !data.a && data.a !== 0)  throw new Error('Missing parameters')
    addNewEntity(MARKER_TYPE, pos, dimension, data, 250)
}

export default { createPed, createMarker, setEntityPosition }