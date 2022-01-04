import * as alt from 'alt-server'
import Core from '../main';

alt.on('License:addLicense', async (target, type) => {
    AddLicense(target, type)
})


alt.on('License:removeLicense', async (target, type) => {
    RemoveLicense(target, type)
})

alt.on('Core:getLicense', async (type, cb) => {
    GetLicense(type, cb)
})

alt.on('Core:getLicenses', async (type, cb) => {
    GetLicenses(type, cb)
})

alt.on('Core:checkLicense', async (target, type, cb) => {
    CheckLicense(target, type, cb)
})

alt.on('Core:getLicensesList', async (cb) => {
    GetLicensesList(cb)
})


/**
 * This function will add a license to a player.
 * @param target - The player who is being targeted.
 * @param type - The type of license you want to add.
 * @returns The player's playerData.metadata.licences object.
 */
const AddLicense = (target, type) => {
    if (!target || !target.valid ) {
        return;
    }
    if(!target.playerData.metadata.licences[type]){
        target.playerData.metadata.licences[type] = true
        Core.Character.saveMetadata(target)
        Core.Functions.emitPlayerData(target, 'metadata', target.playerData.metadata)
        alt.emitClient(target,'notify', 'success', Core.Translate('LICENSE.LABEL'), Core.Translate('LICENSE.LICENSE_ISSUED', { licenseType: type }))
    }
}

/**
 * This function will remove a license from a player.
 * @param target - The player who is being affected
 * @param type - The type of license to remove.
 * @returns The player's license data.
 */
const RemoveLicense = (target, type) => {
    if (!target || !target.valid) {
        return;
    }
    if(target.playerData.metadata.licences[type]){
        target.playerData.metadata.licences[type] = false
        Core.Character.saveMetadata(target)
        Core.Functions.emitPlayerData(target, 'metadata', target.playerData.metadata)
        alt.emitClient(target,'notify', 'success', Core.Translate('LICENSE.LABEL'), Core.Translate('LICENSE.LICENSE_REVOKED', { licenseType: type }))
    }
}

const GetLicense = (type, cb) => {
    if (!target || !target.valid) {
        return;
    }
}

const GetLicenses = (target, type, cb) => {
    if (!target || !target.valid) {
        return;
    }
}

const CheckLicense = (type, cb) => {
    if (!target || !target.valid) {
        return;
    }
}

const GetLicensesList = (cb) => {
    if (!target || !target.valid) {
        return;
    }
}

export default { AddLicense }