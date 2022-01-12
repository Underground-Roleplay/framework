import * as alt from 'alt-server';
import * as Entities from 'entity-sync';

const PED_TYPE = 1;
const MARKER_TYPE = 2;
const ITEM_TYPE = 3;

const addNewEntity = (type, pos, dimension, data, range) => {
    const newEntity = Entities.createGameEntity(type, pos, dimension, range);
    for (let key in data) {
        Entities.setGameEntityData(newEntity, type, key, data[key]);
    }
    alt.log(`Created entity ${newEntity} with type ${type}`);
    return newEntity;
};

const removeEntity = (id, type) => {
    Entities.removeGameEntity(id, type);
};

const setEntityPosition = (id, type, pos) => {
    Entities.setGameEntityPosition(id, type, pos);
};

const createPed = (pos, dimension, data) => {
    if ((!data.pedType && data.pedType !== 0) || !data.modelHash)
        throw new Error('Missing parameters');
    addNewEntity(PED_TYPE, pos, dimension, data, 250);
};

const createMarker = (pos, dimension, data) => {
    if (
        (!data.type && data.type !== 0) ||
        (!data.r && data.r !== 0) ||
        (!data.g && data.g !== 0) ||
        (!data.b && data.b !== 0) ||
        (!data.a && data.a !== 0)
    )
        throw new Error('Missing parameters');
    addNewEntity(MARKER_TYPE, pos, dimension, data, 250);
};

const createDropItem = (pos, dimension, item) => {
    const entity = addNewEntity(ITEM_TYPE, pos, dimension, item, 5);
    return entity;
};

const updateEntityData = (id, type, key, data) => {
    return Entities.setGameEntityData(id, type, key, data);
};

const getEntityData = (id, type, key) => {
    return Entities.getGameEntityData(id, type, key);
};

export default {
    createPed,
    createMarker,
    setEntityPosition,
    createDropItem,
    removeEntity,
    updateEntityData,
    getEntityData,
};
