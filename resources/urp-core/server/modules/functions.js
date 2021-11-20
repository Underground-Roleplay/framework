import * as alt from 'alt-server';

import Core from '../main';

import {executeSync, insertSync, hashString, compareHash, getVectorInFrontOfPlayer} from '../libs/utils';

// Utils
const getPlayerIdentifier = (source) => {
    if (!source || !source.valid) {
        return;
    }
    if (!source.hwidHash || !source.hwidExHash || !source.socialID) {
        source.kick(Core.Translate('PLAYER.MISSING_IDENTIFICATORS'))
        return;
    }
    if(source.socialID == 0){
        source.kick(Core.Translate('PLAYER.MISSING_IDENTIFICATORS'))
        return;
    }
    const finalIdentifier = `${source.hwidHash} ${source.hwidExHash} ${source.socialID}`
    return finalIdentifier;
}

//  Player Login
const login = async (source) => {
    const uID = getPlayerIdentifier(source);
    if(!uID) return;
    const account = await executeSync('SELECT * FROM users WHERE socialID = :socialID', {socialID: source.socialID})
    if (account.length <= 0) {
        const hash = hashString(uID);
        const register = await insertSync("INSERT INTO users (identifier, socialID, banned, whitelisted) VALUES (?, ?, ? ,?)", [hash, source.socialID, 0, 0])
        if (!register) {
            source.kick(Core.Translate('ACCOUNT.REGISTER_ERROR'))
            return
        }
        console.log(Core.Translate('ACCOUNT.NEW_CREATED ', { sID : source.socialID }))
        Core.Character.startCharacter(source)
        // Now we start the character
    }else{
        const dataMatch = compareHash(uID, account[0].identifier);
        if (!dataMatch) {
            source.kick(Core.Translate('ACCOUNT.LOGIN_ERROR'))
            return;
        }
        if (account[0].banned) {
            source.kick(Core.Translate('ACCOUNT.BANNED'))
            return;
        }
        console.log(Core.Translate('ACCOUNT.LOGIN', { playerName: `${source.name}`, sID: `${source.socialID}` }))
        Core.Character.startCharacter(source)
       // Now we start the character
    }
}

// Player utils
const setPosition = (source, x, y, z, model = undefined) => {
    if (model) {
        source.spawn(x, y, z, 0)
        source.model = model;
     
    }
    source.pos = new alt.Vector3(x, y, z)
}

const getMoney = (source) => {
    return source.playerData.money
}

const getCurrentInventory = (source) => {
    return source.playerData.inventory
}

// Vehicles
const spawnVehicle = (source, model) => {
   try{
       const fwd = getVectorInFrontOfPlayer(source, 5)
       const vehicle = new alt.Vehicle(model, fwd.x, fwd.y, fwd.z, 0, 0, 0)
       vehicle.numberPlateText = 'STAFF'
   }catch(e){
        console.error(`${model} does not exist.`);
        throw e;
   }
}

//  Permission system
const addPermission = (source, permission) => {
    if(!source || !source.playerData) return;
    const socialID = source.playerData.socialID
    Core.PermissionList[socialID] = {
        socialID: socialID,
        permission: permission.toLowerCase()
    }
    db.execute('DELETE FROM permissions WHERE socialID = ?', [ socialID ], undefined, alt.resourceName)
    db.execute('INSERT INTO permissions (name, socialID, permission) VALUES (?, ?, ?)', [ source.name, socialID, permission.toLowerCase() ],
    undefined, alt.resourceName)
}

const hasPermission = (source, perm) => {
    if(!source || !source.playerData) return;
    const socialID = source.playerData.socialID
    const permission = perm.toLowerCase()
    if (permission === 'user'){
        return true
    }
    if(Core.PermissionList[socialID] && Core.PermissionList[socialID].socialID === socialID && 
    Core.PermissionList[socialID].permission === permission || Core.PermissionList[socialID].permission === 'god'){
        return true
    }
    return false
}

// Callbacks
const createCallback = (name, cb) => {
    if(!Core.serverCallbacks[name]){
        Core.serverCallbacks[name] = cb
    }
}

const triggerCallback = (name, source, cb, ...args) => {
    if (!Core.serverCallbacks[name]) {
     console.log('Callback doesnt exists')
     return;
    }
    Core.serverCallbacks[name](source, ...args)
}

export default { login, getPlayerIdentifier, setPosition, getMoney, createCallback, triggerCallback, hasPermission, 
addPermission, getCurrentInventory, spawnVehicle }