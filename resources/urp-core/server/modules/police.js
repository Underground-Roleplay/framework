import * as alt from 'alt-server';
import db from 'mysql2-wrapper';
import Core from '../main';
import { getClosestEntity } from '../libs/utils';

const setHandcuffs = (source) => {
    let targetPlayer = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Player.all],
        5
    );
    //if (!targetPlayer || targetPlayer === source) return;
    targetPlayer.setSyncedMeta('HasHandcuffs', true);
    targetPlayer.setClothes(7, 41, 0, 2);
    targetPlayer.playerData.metadata.ishandcuffed = true;
    saveMetadata(targetPlayer);
    alt.emitClient(targetPlayer, 'police:setHandsCuff');
};

const removeHandcuffs = (source) => {
    let targetPlayer = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Player.all],
        5
    );
    if (!targetPlayer || targetPlayer === source) return;
    targetPlayer.setSyncedMeta('HasHandcuffs', false);
    targetPlayer.setClothes(7, 0, 0, 2);
    targetPlayer.playerData.metadata.ishandcuffed = false;
    saveMetadata(targetPlayer);
    alt.emitClient(targetPlayer, 'police:uncuff');
};

const putInPrison = (source, time = 5) => {
    let targetPlayer = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Player.all],
        5
    );
    if (!targetPlayer || targetPlayer === source) return;
    targetPlayer.playerData.metadata.isInJail = true;
    targetPlayer.playerData.metadata.jailTime = time;
    targetPlayer.setSyncedMeta('HasHandcuffs', false);
    targetPlayer.setClothes(7, 0, 0, 2);
    saveMetadata(targetPlayer);
    Core.Functions.setPosition(
        targetPlayer,
        1680.896728515625,
        2513.024169921875,
        45.5567626953125
    );
};

alt.setInterval(() => {
    alt.Player.all.forEach((targetPlayer) => {
        if (!targetPlayer.playerData) return;
        if (!targetPlayer.hasSyncedMeta('HasHandcuffs')) return;
        if (targetPlayer.playerData.metadata.isInJail) {
            targetPlayer.playerData.metadata.jailTime -= 1;
            if (targetPlayer.playerData.metadata.jailTime <= 0) {
                targetPlayer.playerData.metadata.isInJail = false;
                targetPlayer.playerData.metadata.jailTime = 0;
                saveMetadata(targetPlayer);
                Core.Functions.setPosition(
                    targetPlayer,
                    1851.6527099609375,
                    2606.017578125,
                    45.6578369140625
                );
            }
            saveMetadata(targetPlayer);
        }
    });
}, 60000);

const saveMetadata = (source) => {
    let { ssn, id, metadata } = source.playerData;
    db.execute(
        'UPDATE characters SET metadata = ? WHERE ssn = ? AND id = ?',
        [JSON.stringify(metadata), ssn, id],
        undefined,
        alt.resourceName
    );
};

export default {
    setHandcuffs,
    removeHandcuffs,
    putInPrison,
};
