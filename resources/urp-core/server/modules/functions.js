import * as alt from 'alt-server';
import * as chat from 'urp-chat';

import db from 'mysql2-wrapper';

import Core from '../main';

import {
    executeSync,
    insertSync,
    updateSync,
    hashString,
    compareHash,
    getVectorInFrontOfPlayer,
    getClosestEntity,
} from '../libs/utils';

// Utils
const getPlayerIdentifier = (source) => {
    if (!source || !source.valid) {
        return;
    }
    if (!source.hwidHash || !source.hwidExHash || !source.socialID) {
        source.kick(Core.Translate('PLAYER.MISSING_IDENTIFICATORS'));
        return;
    }
    if (source.socialID == 0) {
        source.kick(Core.Translate('PLAYER.MISSING_IDENTIFICATORS'));
        return;
    }
    const finalIdentifier = `${source.hwidHash} ${source.hwidExHash} ${source.socialID}`;
    return finalIdentifier;
};

//  Player Login
const login = async (source) => {
    const uID = getPlayerIdentifier(source);
    if (!uID) return;
    const account = await executeSync(
        'SELECT * FROM users WHERE socialID = :socialID',
        { socialID: source.socialID }
    );
    if (account.length <= 0) {
        const hash = hashString(uID);
        const register = await insertSync(
            'INSERT INTO users (identifier, socialID, banned, whitelisted) VALUES (?, ?, ? ,?)',
            [hash, source.socialID, 0, 0]
        );
        if (!register) {
            source.kick(Core.Translate('ACCOUNT.REGISTER_ERROR'));
            return;
        }
        console.log(
            Core.Translate('ACCOUNT.NEW_CREATED ', { sID: source.socialID })
        );
        if (Core.Config.WhitelistOn)
            return source.kick(
                Core.Translate('ACCOUNT.NOT_ALLOW_LISTED', {
                    socialID: source.socialID,
                })
            );
    } else {
        const dataMatch = compareHash(uID, account[0].identifier);
        if (!dataMatch) {
            source.kick(Core.Translate('ACCOUNT.LOGIN_ERROR'));
            return;
        }
        if (account[0].banned) {
            source.kick(Core.Translate('ACCOUNT.BANNED'));
            return;
        }
        if (!Core.Config.WhitelistOn) {
            console.log(
                Core.Translate('ACCOUNT.LOGIN', {
                    playerName: `${source.name}`,
                    sID: `${source.socialID}`,
                })
            );
            Core.Character.startCharacter(source);
            return;
        }
        if (!account[0].whitelisted) {
            source.kick(
                Core.Translate('ACCOUNT.NOT_ALLOW_LISTED', {
                    socialID: account[0].id,
                })
            );
            return;
        } else {
            console.log(
                Core.Translate('ACCOUNT.LOGIN', {
                    playerName: `${source.name}`,
                    sID: `${source.socialID}`,
                })
            );
            Core.Character.startCharacter(source);
            // Now we start the character
        }
    }
};

//  Player whitelist & BAN status
const whitelistBanStatus = async (source, socialID, type) => {
    const result = await executeSync(
        'SELECT banned, whitelisted from users WHERE socialID = ?',
        [socialID]
    );
    if (result.length <= 0) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('COMMANDS.LABEL'),
            Core.Translate('COMMANDS.USER_ID_NOT_FOUND')
        );
        return;
    }
    if (type === 'whitelist') {
        if (result[0].whitelisted) {
            alt.emitClient(
                source,
                'notify',
                'error',
                Core.Translate('COMMANDS.LABEL'),
                Core.Translate('COMMANDS.USER_ID_ALLREADY_WHITELISTED')
            );
            return;
        } else {
            updateSync(
                'UPDATE users SET whitelisted = ? WHERE socialID = ?',
                [1, socialID],
                undefined,
                alt.resourceName
            );
            alt.emitClient(
                source,
                'notify',
                'success',
                Core.Translate('COMMANDS.LABEL'),
                Core.Translate('COMMANDS.USER_ID_WHITELISTED')
            );
        }
    } else if (type === 'ban') {
        if (result[0].banned) {
            alt.emitClient(
                source,
                'notify',
                'error',
                Core.Translate('COMMANDS.LABEL'),
                Core.Translate('COMMANDS.USER_ID_ALLREADY_BANNED')
            );
            return;
        } else {
            updateSync(
                'UPDATE users SET banned = ? WHERE socialID = ?',
                [1, socialID],
                undefined,
                alt.resourceName
            );
            alt.emitClient(
                source,
                'notify',
                'success',
                Core.Translate('COMMANDS.LABEL'),
                Core.Translate('COMMANDS.USER_ID_BANNED')
            );
        }
    } else if (type === 'unban') {
        if (!result[0].banned) {
            alt.emitClient(
                source,
                'notify',
                'error',
                Core.Translate('COMMANDS.LABEL'),
                Core.Translate('COMMANDS.USER_ID_NOT_BANNED')
            );
            return;
        } else {
            updateSync(
                'UPDATE users SET banned = ? WHERE socialID = ?',
                [0, socialID],
                undefined,
                alt.resourceName
            );
            alt.emitClient(
                source,
                'notify',
                'success',
                Core.Translate('COMMANDS.LABEL'),
                Core.Translate('COMMANDS.USER_ID_UNBANNED')
            );
        }
    }
};

// Player utils
const setPosition = (source, x, y, z, model = undefined) => {
    if (model) {
        source.spawn(x, y, z, 0);
        source.model = model;
    }
    source.pos = new alt.Vector3(x, y, z);
};

const getMoney = (source) => {
    return source.playerData.money;
};

const getCurrentInventory = (source) => {
    return source.playerData.inventory;
};

const getPlayerData = (source, key) => {
    return source.playerData[key];
};

const getIdentityByProximity = (source) => {
    const closestSource = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Player.all],
        10
    );
    if (!closestSource || closestSource === source) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('SYSTEM.LABEL'),
            Core.Translate('NO_PLAYERS_NEAR')
        );
        return;
    }
    chat.send(
        source,
        `${JSON.stringify(closestSource.playerData.charinfo)} ${
            closestSource.playerData.ssn
        }`
    );
};

// Vehicles
const spawnVehicle = (source, model) => {
    try {
        const fwd = getVectorInFrontOfPlayer(source, 1);
        const vehicle = new alt.Vehicle(model, fwd.x, fwd.y, fwd.z, 0, 0, 0);
        source.setIntoVehicle(vehicle, 1);
        vehicle.numberPlateText = 'STAFF';
        vehicle.engineOn = true;
        vehicle.data = {
            metadata: { fuel: 100 },
        };
        vehicle.setStreamSyncedMeta('engine', true);
        vehicle.setStreamSyncedMeta('fuel', 100);
    } catch (e) {
        console.error(
            Core.Translate('VEHICLE.INCORRECT_MODEL', { model: model })
        );
        throw e;
    }
};

//  Permission system
const addPermission = (source, permission) => {
    if (!source || !source.playerData) return;
    const socialID = source.playerData.socialID;
    Core.PermissionList[socialID] = {
        socialID: socialID,
        permission: permission.toLowerCase(),
    };
    db.execute(
        'DELETE FROM permissions WHERE socialID = ?',
        [socialID],
        undefined,
        alt.resourceName
    );
    db.execute(
        'INSERT INTO permissions (name, socialID, permission) VALUES (?, ?, ?)',
        [source.name, socialID, permission.toLowerCase()],
        undefined,
        alt.resourceName
    );
};

const hasPermission = (source, perm) => {
    if (!source || !source.playerData) return false;
    const socialID = source.playerData.socialID;
    const permission = perm.toLowerCase();
    if (permission === 'user') {
        return true;
    }
    if (!Core.PermissionList[socialID]) {
        return false;
    }
    if (
        (Core.PermissionList[socialID].socialID === socialID &&
            Core.PermissionList[socialID].permission === permission) ||
        Core.PermissionList[socialID].permission === 'god'
    ) {
        return true;
    }
    return false;
};

const updateIdentity = (source, dt) => {
    if (!source || !source.playerData) return;
    const ssn = source.playerData.ssn;
    let data = JSON.parse(dt);
    source.playerData.charinfo.firstname = data.firstname;
    source.playerData.charinfo.lastname = data.lastname;
    source.playerData.charinfo.birthdate = data.brithdate;
    source.playerData.charinfo.gender = data.gender;
    updateSync(
        'UPDATE characters SET charinfo = ? WHERE ssn = ?',
        [JSON.stringify(source.playerData.charinfo), ssn],
        undefined,
        alt.resourceName
    );
};

const emitPlayerData = (source, key, value) => {
    alt.nextTick(() => {
        alt.emitClient(source, 'playerData:set', key, value);
    });
};
const GetSsn = (source, dt) => {
    if (!source || !source.playerData) return;
    const ssn = source.playerData.ssn;

    return ssn;
};
const GetNumber = (source, dt) => {
    if (!source || !source.playerData) return;
    const phone = source.playerData.phone;

    return phone;
};
const getSourceTargetByPhone = (phone) => {
    for (let i = 0; i < alt.Player.all.length; i++) {
        console.log(alt.Player.all[i].playerData.phone);
        if (alt.Player.all[i].playerData.phone === phone) {
            return alt.Player.all[i];
        }
    }
    return undefined;
};

//OK
const inviteCallRequest = (source, phone) => {
    const isSourceInCall = source.playerData.inCall;
    alt.log(`[DEBUG] source is in call? ${isSourceInCall}`);
    if (isSourceInCall) {
        alt.log('The source is already in a call');
        return;
    }

    //This phone is in string
    const target = getSourceTargetByPhone(phone);
    alt.log(`[DEBUG] target is ${target}`);
    if (!target) {
        alt.log(`fora da area de cobertura ou o numero esta errado`);
        return;
    }

    const isTargetInCall = target.playerData.inCall;
    alt.log(`[DEBUG] target is in call? ${isTargetInCall}`);
    if (isTargetInCall) {
        alt.log(`ocupado`);
        return;
    }

    alt.emitClient(target, 'Phone:inviteCallRequest', source.playerData.phone);
};

const createCallPhone = (source, phone) => {
    console.log(
        `[createCallPhone] caller ${source.playerData.phone} target ${phone}`
    );
    const target = getSourceTargetByPhone(phone);
    if (!target) return;
    if (source.playerData.inCall || target.playerData.inCall) return;
    Core.Voice.createVoiceChannel(phone, 999999, false);
    Core.Voice.addSourceToChannel(source, phone);
    Core.Voice.addSourceToChannel(target, phone);
    source.playerData.inCall = { state: true, voiceChannel: phone };
    target.playerData.inCall = { state: true, voiceChannel: phone };
    alt.emitClient(target, 'Phone:inCall');
};

const endCall = (source, phone) => {
    console.log(`[endCall] caller ${source.playerData.phone} target ${phone}`);
    const target = getSourceTargetByPhone(phone);
    if (!target) return;
    Core.Voice.removeSourceFromChannel(
        source,
        source.playerData.inCall.voiceChannel
    );
    Core.Voice.removeSourceFromChannel(
        target,
        target.playerData.inCall.voiceChannel
    );
    Core.Voice.destroyVoiceChannel(source.playerData.inCall.voiceChannel);
    target.playerData.inCall = false;
    source.playerData.inCall = false;
    alt.emitClient(target, 'Phone:endCall');
    alt.emitClient(source, 'Phone:endCall');
};

const PhoneTunel = (source, targtEvent, dataRvent, phone) => {
    const target = alt.Player.all.find(
        (s) => s.playerData.phone === parseInt(phone)
    );
    if (target) {
        alt.emitClient(target, targtEvent, target, dataRvent);
    }
};

const repairVehicle = (source) => {
    let targetVehicle = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Vehicle.all],
        3
    );
    if (!targetVehicle) return;
    targetVehicle.repair();
};

export default {
    login,
    whitelistBanStatus,
    getPlayerIdentifier,
    setPosition,
    getMoney,
    hasPermission,
    addPermission,
    getCurrentInventory,
    spawnVehicle,
    emitPlayerData,
    getIdentityByProximity,
    updateIdentity,
    getPlayerData,
    GetSsn,
    createCallPhone,
    inviteCallRequest,
    endCall,
    PhoneTunel,
    GetNumber,
    repairVehicle,
};
