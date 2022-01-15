import * as alt from 'alt-server';
import db from 'mysql2-wrapper';
import Core from '../main';
import { getClosestEntity } from '../libs/utils';

const setHandcuffs = () => {
    let targetPlayer = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Player.all],
        5
    );
    if (!targetPlayer) return;

    targetPlayer.setSyncedMeta('HasHandcuffs', true);
    targetPlayer.setClothes(7, 41, 0, 2);
    alt.emitClient(targetPlayer, 'police:setHandsCuff');
};

const removeHandcuffs = () => {
    let targetPlayer = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Player.all],
        5
    );
    if (!targetPlayer) return;
    targetPlayer.setSyncedMeta('HasHandcuffs', false);
    targetPlayer.setClothes(7, -1, -1, 0);
    alt.emitClient(targetPlayer, 'police:uncuff');
};

export default {
    setHandcuffs,
    removeHandcuffs,
};
