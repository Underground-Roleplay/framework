import * as alt from 'alt-server';
import Core from '../main';

alt.on('License:addLicense', async (target, type) => {
    addLicense(target, type);
});

alt.on('License:removeLicense', async (target, type) => {
    removeLicense(target, type);
});

alt.on('Core:getLicense', async (type, cb) => {
    getLicense(type, cb);
});

alt.on('Core:getLicenses', async (type, cb) => {
    getLicenses(type, cb);
});

alt.on('Core:checkLicense', async (target, type, cb) => {
    checkLicense(target, type, cb);
});

alt.on('Core:getLicensesList', async (cb) => {
    getLicensesList(cb);
});

/**
 * This function will add a license to a player.
 * @param target - The player who is being targeted.
 * @param type - The type of license you want to add.
 * @returns The player's playerData.metadata.licences object.
 */
const addLicense = (target, type) => {
    if (!target || !target.valid) {
        return;
    }
    if (!target.playerData.metadata.licences[type]) {
        target.playerData.metadata.licences[type] = true;
        Core.Character.saveMetadata(target);
        Core.Functions.emitPlayerData(
            target,
            'metadata',
            target.playerData.metadata
        );
        alt.emitClient(
            target,
            'notify',
            'success',
            Core.Translate('LICENSE.LABEL'),
            Core.Translate('LICENSE.LICENSE_ISSUED', { licenseType: type })
        );
    }
};

/**
 * This function will remove a license from a player.
 * @param target - The player who is being affected
 * @param type - The type of license to remove.
 * @returns The player's license data.
 */
const removeLicense = (target, type) => {
    if (!target || !target.valid) {
        return;
    }
    if (target.playerData.metadata.licences[type]) {
        target.playerData.metadata.licences[type] = false;
        Core.Character.saveMetadata(target);
        Core.Functions.emitPlayerData(
            target,
            'metadata',
            target.playerData.metadata
        );
        alt.emitClient(
            target,
            'notify',
            'success',
            Core.Translate('LICENSE.LABEL'),
            Core.Translate('LICENSE.LICENSE_REVOKED', { licenseType: type })
        );
    }
};

const getLicense = (type, cb) => {
    if (!target || !target.valid) {
        return;
    }
};

const getLicenses = (target, type, cb) => {
    if (!target || !target.valid) {
        return;
    }
};

const checkLicense = (type, cb) => {
    if (!target || !target.valid) {
        return;
    }
};

const getLicensesList = (cb) => {
    if (!target || !target.valid) {
        return;
    }
};

export default { addLicense, removeLicense };
