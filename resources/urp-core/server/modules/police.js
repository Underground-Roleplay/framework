import * as alt from 'alt-server';
import db from 'mysql2-wrapper';
import Core from '../main';

const cuffsState = (source, targetPlayer) => {
    if (targetPlayer.playerData.metadata.ishandcuffed)
        return removeHandcuffs(source, targetPlayer);

    setHandcuffs(source, targetPlayer);
};

const setHandcuffs = (source, targetPlayer) => {
    if (!targetPlayer) return;
    targetPlayer.setSyncedMeta('HasHandcuffs', true);
    alt.emitClient(source, 'playHowl2d', 'cuff.ogg', 0.6);
    alt.emitClient(targetPlayer, 'playHowl2d', 'cuff.ogg', 0.6);
    targetPlayer.setClothes(7, 41, 0, 2);
    targetPlayer.playerData.metadata.ishandcuffed = true;
    alt.emitClient(targetPlayer, 'police:setHandsCuff');
};

const removeHandcuffs = (source, targetPlayer) => {
    if (!targetPlayer) return;
    targetPlayer.setSyncedMeta('HasHandcuffs', false);
    alt.emitClient(source, 'playHowl2d', 'uncuff.ogg', 0.6);
    alt.emitClient(targetPlayer, 'playHowl2d', 'uncuff.ogg', 0.6);
    targetPlayer.setClothes(7, 0, 0, 2);
    targetPlayer.playerData.metadata.ishandcuffed = false;
    alt.emitClient(targetPlayer, 'police:uncuff');
};

const putInPrison = (source, targetPlayer, time = 5) => {
    if (!targetPlayer) return;
    targetPlayer.playerData.metadata.isInJail = true;
    targetPlayer.playerData.metadata.jailTime = time;
    targetPlayer.setSyncedMeta('HasHandcuffs', false);
    targetPlayer.setClothes(7, 0, 0, 2);
    alt.emitClient(targetPlayer, 'playHowl2d', 'jaildoor.ogg', 0.6);
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
    cuffsState,
};
