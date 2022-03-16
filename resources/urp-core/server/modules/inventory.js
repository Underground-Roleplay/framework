import * as alt from 'alt-server';

import db from 'mysql2-wrapper';
import Core from '../main';
import { executeSync, updateSync } from '../libs/utils';

//  Items
const useableItems = {};
const itemsDropped = [];

const dropItem = (source, item, amount) => {
    Core.Inventory.removeItem(source, item, amount);
    const itemPosition = new alt.Vector3(
        source.pos.x,
        source.pos.y,
        source.pos.z
    );

    const droppedItem = {
        itemPosition,
        item,
        amount,
    };

    itemsDropped.push(droppedItem);
};

const itemsClosed = (source) => {
    if (!itemsDropped) return;
    let items = [];
    itemsDropped.forEach((item) => {
        if (source.pos.distanceTo(item.itemPosition) < 10) {
            items.push(item);
        }
    });

    //console.log(itemsDropped);
    console.log('items', items);
};

const pickupItem = (source, item, amount) => {
    // amount = parseInt(amount);
    // let avaliableAmount = getDroppedItemAmountById(item.entityID);
    // if (!avaliableAmount) return;
    // if (amount > avaliableAmount) {
    //     return;
    // }
    // if (avaliableAmount === amount) {
    //     Core.Entities.removeEntity(item.entityID, 3);
    //     Core.Inventory.addItem(source, item.name, amount);
    //     return;
    // }
    // if (amount < avaliableAmount) {
    //     avaliableAmount -= amount;
    //     Core.Entities.updateEntityData(
    //         item.entityID,
    //         3,
    //         'amount',
    //         avaliableAmount
    //     );
    //     Core.Inventory.addItem(source, item.name, amount);
    //     return;
    // }
};

const getDroppedItemAmountById = (id) => {
    const amount = Core.Entities.getEntityData(id, 3, 'amount');
    return amount;
};

const createUseableItem = (itemName, eventName, isServer = false) => {
    if (useableItems[itemName]) throw new Error('Item already registered');
    useableItems[itemName] = {
        eventName: eventName,
        isServer: isServer,
    };
};

const triggerItemEvent = (source, item) => {
    if (!useableItems[item.name]) return;
    if (useableItems[item.name].isServer) {
        alt.emit(useableItems[item.name].eventName, source, item);
        return;
    }
    alt.emitClient(source, useableItems[item.name].eventName, item);
};

const isUseableItem = (itemName) => {
    return useableItems[itemName];
};

//  Inventory
const getCurrentWeight = (inventory) => {
    let weight = 0;
    if (!inventory) return;
    for (let i = 0; i < inventory.length; i++) {
        weight = !inventory[i]
            ? weight
            : weight + inventory[i].weight * inventory[i].amount;
    }
    return parseInt(weight);
};

const getItemSlot = (inventory, item) => {
    if (!item || !inventory) return;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i]) {
            if (inventory[i].name.toLowerCase() === item.toLowerCase()) {
                return i;
            }
        }
    }
    return undefined;
};

const addItem = (source, ItemName, amount) => {
    console.log('addItem: ', ItemName, amount);
    if (ItemName === undefined && ItemName === null) return false;
    if (amount === null || amount === undefined || amount < 1) amount = 1;

    const i = source.playerData.inventory.findIndex(
        (item) => item.name === ItemName
    );
    if (i > -1 && source.playerData.inventory[i].name === ItemName) {
        source.playerData.inventory[i].amount =
            parseInt(source.playerData.inventory[i].amount) + parseInt(amount);
        saveInventory(source);
        return true;
    }

    if (i < 0) {
        const itemInfo = Core.Shared.Items[ItemName.toLowerCase()];
        if (!itemInfo) {
            alt.emitClient(
                source,
                'notify',
                'error',
                Core.Translate('INVENTORY.LABEL'),
                Core.Translate('ITEM_DOESNT_EXISTS')
            );
            return;
        }
        if (itemInfo.type === 'weapon') {
            itemInfo.info = {
                serie: '99999',
            };
        }
        source.playerData.inventory.push({
            name: ItemName,
            amount: amount,
            info: itemInfo.info || '',
            label: itemInfo.label,
            description: itemInfo.description || '',
            weight: itemInfo.weight,
            type: itemInfo.type,
            unique: itemInfo.unique,
            useable: itemInfo.useable,
            image: itemInfo.image,
            shouldClose: itemInfo.shouldClose,
            combinable: itemInfo.combinable,
        });
        saveInventory(source);
        return true;
    }
    return false;
};

const removeAllItems = (source) => {
    source.playerData.inventory = [];
    saveInventory(source);
};

const addItemActived = (source, ItemName, slot) => {
    if (ItemName === undefined && ItemName === null) return false;

    const itemInfo = Core.Shared.Items[ItemName.toLowerCase()];
    source.playerData.inventory[1][slot] = {
        name: ItemName,
        amount: 1,
        info: itemInfo.info || '',
        label: itemInfo.label,
        description: itemInfo.description || '',
        weight: itemInfo.weight,
        type: itemInfo.type,
        unique: itemInfo.unique,
        useable: itemInfo.useable,
        image: itemInfo.image,
        shouldClose: itemInfo.shouldClose,
        combinable: itemInfo.combinable,
    };
    saveInventory(source);
    return true;
};

const transferChest = (source, ItemName, amount) => {
    console.log('transferChest: ', ItemName, amount);
    if (ItemName === undefined && ItemName === null) return false;
    if (amount === null || amount === undefined || amount < 1) amount = 1;

    const i = source.playerData.chest.findIndex(
        (item) => item.name === ItemName
    );

    if (i > -1 && source.playerData.chest[i].name === ItemName) {
        source.playerData.chest[i].amount =
            parseInt(source.playerData.chest[i].amount) + parseInt(amount);
        saveInventoryChests(source, source.playerData.chest, 1);
        return true;
    }

    if (i < 0) {
        const itemInfo = Core.Shared.Items[ItemName.toLowerCase()];
        source.playerData.chest.push({
            name: ItemName,
            amount: amount,
            info: itemInfo.info || '',
            label: itemInfo.label,
            description: itemInfo.description || '',
            weight: itemInfo.weight,
            type: itemInfo.type,
            unique: itemInfo.unique,
            useable: itemInfo.useable,
            image: itemInfo.image,
            shouldClose: itemInfo.shouldClose,
            combinable: itemInfo.combinable,
        });
        saveInventoryChests(source, source.playerData.chest, 1);
        return true;
    }
    return false;
};

// VEHICLES INV
const getVehicleInventory = async (source, vehicle) => {
    if (source.playerData.ssn !== vehicle.data.ssn) {
        alt.emit('notify', 'error', `TRUNK`, `You do not own this car`);
        return;
    }
    if (source.pos.distanceTo(vehicle) > 10) {
        alt.emit(
            'notify',
            'error',
            `TRUNK`,
            `You aren't close enough to open this car trunk`
        );
        return;
    }
    source.playerData.trunk = vehicle.id;
    source.playerData.chestOrigin = 'trunk';
    alt.emitClient(
        source,
        'inventory:updateVehicleInventory',
        getCurrentInventory(source),
        vehicle.data.inventory
    );
};

const transferVehicle = (source, ItemName, amount) => {
    if (ItemName === undefined && ItemName === null) return false;
    if (amount === null || amount === undefined || amount < 1) amount = 1;

    const targetVehicle = alt.Vehicle.getByID(source.playerData.trunk);

    const i = targetVehicle.data.inventory.findIndex(
        (item) => item.name === ItemName
    );

    if (i > -1 && targetVehicle.data.inventory[i].name === ItemName) {
        targetVehicle.data.inventory[i].amount =
            parseInt(targetVehicle.data.inventory[i].amount) + parseInt(amount);
        saveInventoryChests(source, targetVehicle.data.inventory, 1);
        return true;
    }

    if (i < 0) {
        const itemInfo = Core.Shared.Items[ItemName.toLowerCase()];
        targetVehicle.data.inventory.push({
            name: ItemName,
            amount: amount,
            info: itemInfo.info || '',
            label: itemInfo.label,
            description: itemInfo.description || '',
            weight: itemInfo.weight,
            type: itemInfo.type,
            unique: itemInfo.unique,
            useable: itemInfo.useable,
            image: itemInfo.image,
            shouldClose: itemInfo.shouldClose,
            combinable: itemInfo.combinable,
        });
        saveInventoryChests(source, targetVehicle.data.inventory, 1);
        return true;
    }
    return false;
};

const removeItemVehicle = (source, ItemName, amount) => {
    if (ItemName === undefined) return false;
    if (amount === null || amount === undefined || amount < 1) amount = 1;

    const targetVehicle = alt.Vehicle.getByID(source.playerData.trunk);

    const i = targetVehicle.data.inventory.findIndex(
        (item) => item.name === ItemName
    );

    if (targetVehicle.data.inventory[i].amount > amount) {
        targetVehicle.data.inventory[i].amount =
            targetVehicle.data.inventory[i].amount - amount;
        saveInventoryChests(source, targetVehicle.data.inventory);
        return true;
    }
    if (targetVehicle.data.inventory[i].amount == amount) {
        targetVehicle.data.inventory.splice(i, 1);
        saveInventoryChests(source, targetVehicle.data.inventory);
        return true;
    }
};

const removeItemChest = (source, ItemName, amount) => {
    console.log('removeItem Chest: ', ItemName, amount);
    if (ItemName === undefined) return false;
    if (amount === null || amount === undefined || amount < 1) amount = 1;

    const i = source.playerData.chest.findIndex(
        (item) => item.name === ItemName
    );

    if (source.playerData.chest[i].amount > amount) {
        source.playerData.chest[i].amount =
            source.playerData.chest[i].amount - amount;
        saveInventoryChests(source, source.playerData.chest, 1);
        return true;
    }
    if (source.playerData.chest[i].amount <= amount) {
        source.playerData.chest.splice(i, 1);
        saveInventoryChests(source, source.playerData.chest, 1);
        return true;
    }
};

const removeItem = (source, ItemName, amount) => {
    console.log('removeItem: ', ItemName, amount);
    if (ItemName === undefined) return false;
    if (amount === null || amount === undefined || amount < 1) amount = 1;

    const i = source.playerData.inventory.findIndex(
        (item) => item.name === ItemName
    );
    if (amount > source.playerData.inventory[i].amount) return;
    if (source.playerData.inventory[i].amount > amount) {
        source.playerData.inventory[i].amount =
            source.playerData.inventory[i].amount - amount;
        saveInventory(source);
        return true;
    }
    if (source.playerData.inventory[i].amount <= amount) {
        source.playerData.inventory.splice(i, 1);
        saveInventory(source);
        return true;
    }
    return false;
};
const removeItemActived = (source, ItemName, slot) => {
    if (ItemName === undefined) return false;

    if ((source.playerData.inventory[1][slot].amount = 1)) {
        source.playerData.inventory[1][slot] = {};
        saveInventory(source);
        return true;
    }
    return false;
};
const getItemBySlot = (source, slot) => {
    return source.playerData.inventory[slot];
};
const saveInventoryChests = async (source, data, id) => {
    if (!source) return;
    if (source.playerData.chestOrigin === 'homeInventory') {
        await updateSync(
            'UPDATE characters_homes SET inventory = ? WHERE id = ? AND ssn = ?',
            [JSON.stringify(data), id, source.playerData.ssn],
            undefined,
            alt.resourceName
        );
        return alt.emitClient(
            source,
            'inventory:updateHomeInventory',
            getCurrentInventory(source),
            source.playerData.chest
        );
    }
    if (source.playerData.chestOrigin === 'chest') {
        await updateSync(
            'UPDATE chest SET chest = ? WHERE id = ? ',
            [JSON.stringify(data), id],
            undefined,
            alt.resourceName
        );
        return alt.emitClient(
            source,
            'inventory:updateChest',
            getCurrentInventory(source),
            source.playerData.chest
        );
    }
    if (source.playerData.chestOrigin === 'trunk') {
        const targetVehicle = alt.Vehicle.getByID(source.playerData.trunk);

        await updateSync(
            'UPDATE characters_vehicles SET inventory = ? WHERE id = ? AND ssn = ?',
            [
                JSON.stringify(targetVehicle.data.inventory),
                targetVehicle.data.id,
                targetVehicle.data.ssn,
            ],
            undefined,
            alt.resourceName
        );

        return alt.emitClient(
            source,
            'inventory:updateVehicleInventory',
            getCurrentInventory(source),
            targetVehicle.data.inventory
        );
    }
};

const saveInventory = async (source) => {
    if (!source) return;
    const { inventory, ssn } = source.playerData;
    db.execute(
        'UPDATE characters SET inventory = ? WHERE ssn = ?',
        [JSON.stringify(inventory), ssn],
        undefined,
        alt.resourceName
    );
    Core.Functions.emitPlayerData(source, 'inventory', inventory);
};

const sendItem = (source, item, amount) => {
    const targetPed = alt.Player.all.find(
        (p) => source.pos.distanceTo(p.pos) < 1.5 && source !== p
    );
    if (!targetPed) {
        alt.emitClient(
            source,
            'notify',
            'error',
            'Not found!',
            'Not found Player'
        );
        return;
    }

    Core.Inventory.removeItem(source, item, amount);
    Core.Inventory.addItem(targetPed, item, amount);
};
const useWeapon = async (source, weaponName) => {
    const wHash = alt.hash(weaponName);
    if (!wHash) return;

    if (!source.playerData.lastWeapon) {
        source.playerData.lastWeapon = { equipped: true, weapon: weaponName };
        source.giveWeapon(wHash, 9999, true);
        return;
    }

    if (source.playerData.lastWeapon.weapon !== weaponName) {
        const oldHash = alt.hash(source.playerData.lastWeapon.weapon);
        source.removeWeapon(oldHash);
        source.playerData.lastWeapon = { equipped: true, weapon: weaponName };
        source.giveWeapon(wHash, 9999, true);
        return;
    }

    if (!source.playerData.lastWeapon.equipped) {
        source.playerData.lastWeapon = { equipped: true, weapon: weaponName };
        source.giveWeapon(wHash, 9999, true);
        return;
    }
};

const isItem = (source, item) => {
    const itemInfo = Core.Shared.Items[item.toLowerCase()];
    if (itemInfo) {
        return true;
    } else {
        return false;
    }
};

const getCurrentInventory = (source) => {
    return source.playerData.inventory;
};

const getInventoryActived = (source) => {
    return source.playerData.inventory[1];
};

const getHomeInventory = async (source, id) => {
    const data = await executeSync(
        'SELECT * from characters_homes WHERE id = :id ',
        { id: id }
    );
    source.playerData.chest = JSON.parse(data[0].inventory);
    source.playerData.chestOrigin = 'homeInventory';
    alt.emitClient(
        source,
        'inventory:updateHomeInventory',
        getCurrentInventory(source),
        source.playerData.chest
    );
};

const getChest = async (source, id) => {
    const data = await executeSync('SELECT * from chest WHERE id = :id', {
        id: id,
    });

    source.playerData.chest = JSON.parse(data[0].chest);
    source.playerData.chestOrigin = 'chest';
    alt.emitClient(
        source,
        'inventory:updateChest',
        getCurrentInventory(source),
        source.playerData.chest
    );
};

export default {
    getCurrentWeight,
    getItemSlot,
    addItem,
    dropItem,
    removeItem,
    removeAllItems,
    saveInventory,
    createUseableItem,
    triggerItemEvent,
    isUseableItem,
    useWeapon,
    getItemBySlot,
    isItem,
    pickupItem,
    removeItemChest,
    transferChest,
    getChest,
    getHomeInventory,
    getCurrentInventory,
    removeItemActived,
    addItemActived,
    getInventoryActived,
    getVehicleInventory,
    transferVehicle,
    removeItemVehicle,
    sendItem,
    itemsClosed,
};
