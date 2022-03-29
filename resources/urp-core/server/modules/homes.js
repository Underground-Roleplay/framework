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
            Core.Translate('HOMES.LABEL'),
            Core.Translate('HOMES.NO_HOME')
        );
        return false;
    }

    if (ownedHome[0].name !== home) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('HOMES.LABEL'),
            Core.Translate('HOMES.NOT_HERE')
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
            p.playerData.metadata.atHome &&
            p.playerData.metadata.atHome.slot === slot &&
            p.playerData.metadata.atHome.home === home
    );
    if (!targetPlayer) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('HOMES.LABEL'),
            Core.Translate('HOMES.NOT_AVAILABLE')
        );
        return false;
    }

    const res = await requestPrompt(
        targetPlayer,
        Core.Translate('HOMES.REQUEST', {
            name: `${source.playerData.charinfo.firstname} ${source.playerData.charinfo.lastname}`,
        }),
        5000
    );

    if (!res) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('HOMES.LABEL'),
            Core.Translate('HOMES.REFUSED')
        );
        return false;
    }

    source.playerData.metadata.atHome = {
        slot: slot,
        home: home,
        entry: entry,
    };

    const homeDim = targetPlayer.dimension;
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
    const { ssn } = source.playerData;
    if (!slot && slot !== 0) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('HOMES.LABEL'),
            Core.Translate('HOMES.NO_VACANCY')
        );
        return false;
    }

    const owned = await getOwnedHome(source);
    if (owned.length > 0) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('HOMES.LABEL'),
            Core.Translate('HOMES.ALREADY_HAVE')
        );
        return false;
    }

    if (!Core.Money.getFullPayment(source, price)) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('HOMES.LABEL'),
            Core.Translate('MONEY.DONT_HAVE_ENOUGH')
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
        Core.Translate('HOMES.LABEL'),
        Core.Translate('HOMES.SUCCESS_PURCHASE')
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
