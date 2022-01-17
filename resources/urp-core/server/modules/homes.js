import * as alt from 'alt-server';
import { executeSync, requestPrompt } from '../libs/utils';
import Core from '../main';

const getOwnedHome = async (source) => {
    const { ssn } = source.playerData;
    const result = await executeSync(
        'SELECT * FROM characters_homes WHERE ssn = ?',
        [ssn]
    );
    return result;
};

const enterHome = async (source, home, entry) => {
    const ownedHome = await getOwnedHome(source);
    if (ownedHome.length <= 0) {
        alt.emitClient(
            source,
            'notify',
            'error',
            `HOME SYSTEM`,
            `You don't have an home`
        );
        return false;
    }

    if (ownedHome[0].name !== home) {
        alt.emitClient(
            source,
            'notify',
            'error',
            `HOME SYSTEM`,
            `You home ain't here fella`
        );
        return false;
    }

    source.playerData.metadata.atHome = {
        slot: ownedHome[0].slot,
        home: ownedHome[0].name,
        entry: entry,
    };

    const homeDim = source.id + 1;
    Core.Functions.setPosition(source, entry.x, entry.y, entry.z, homeDim);
    return true;
};

const requestAccess = async (source, home, slot, entry) => {
    const targetPlayer = alt.Player.all.find(
        (p) =>
            p.playerData.atHome.slot === slot &&
            p.playerData.atHome.home === home
    );
    if (!targetPlayer) {
        alt.emitClient(
            source,
            'notify',
            'error',
            `HOME SYSTEM`,
            `There's no one at home`
        );
        return false;
    }

    const res = await requestPrompt(
        source,
        `${source.playerData.charinfo.firstname} ${source.playerData.charinfo.lastname} wants to enter at your house! Do you want to allow it?`,
        5000
    );

    if (!res) {
        alt.emitClient(
            source,
            'notify',
            'error',
            `HOME SYSTEM`,
            `You're not authorizated to enter`
        );
        return false;
    }

    source.playerData.metadata.atHome = {
        slot: ownedHome[0].slot,
        home: ownedHome[0].name,
        entry: entry,
    };

    const homeDim = source.id + 1;
    Core.Functions.setPosition(source, entry.x, entry.y, entry.z, homeDim);
    return true;
};

//TODO
const leftHome = async (source) => {
    const { atHome } = source.playerData.metadata;
    if (!atHome) return;
    Core.Functions.setPosition(source, 0, 0, 0, 0);
    source.playerData.metadata.atHome = undefined;
    return true;
};

const getAvaliableSlot = async (home, max) => {
    const result = await executeSync(
        'SELECT COUNT(*) as count FROM characters_homes WHERE name = ?',
        [home]
    );
    if (result[0]['count'] <= max) {
        return result[0]['count'];
    }
    return undefined;
};

const buyHome = async (source, home, maxSlots, price) => {
    const slot = await getAvaliableSlot(home, maxSlots);
    console.log(slot);
    const { ssn } = source.playerData;
    if (!slot && slot !== 0) {
        alt.emitClient(
            source,
            'notify',
            'error',
            `HOME SYSTEM`,
            `There's no slots avaliable`
        );
        return false;
    }

    const owned = await getOwnedHome(source);
    if (owned.length > 0) {
        alt.emitClient(
            source,
            'notify',
            'error',
            `HOME SYSTEM`,
            `You have an house already`
        );
        return false;
    }

    if (!Core.Money.getFullPayment(source, price)) {
        alt.emitClient(
            source,
            'notify',
            'error',
            `HOME SYSTEM`,
            `You don't have enought money`
        );
        return false;
    }

    const createHome = await executeSync(
        'INSERT INTO characters_homes (ssn, name, chest, slot) VALUES (?,?,?,?)',
        [ssn, home, '[]', slot]
    );
    alt.emitClient(
        source,
        'notify',
        'success',
        `HOME SYSTEM`,
        `You have buyed a house`
    );
    return createHome;
};

export default {
    getOwnedHome,
    getAvaliableSlot,
    buyHome,
    enterHome,
    leftHome,
    requestAccess,
};