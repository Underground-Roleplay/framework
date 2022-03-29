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
    if (!targetPlayer || targetPlayer === source) return;

    targetPlayer.setSyncedMeta('HasHandcuffs', true);
    targetPlayer.setClothes(7, 41, 0, 2);
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

    alt.emitClient(targetPlayer, 'police:uncuff');
};

export default {
    setHandcuffs,
    removeHandcuffs,
};
