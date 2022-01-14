/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import Core from 'urp-core';

alt.onClient('context:vehicle:engine', (source) => {
    Core.Vehicles.handleToggleEngine(source, source.vehicle);
});

alt.onClient('context:police:cuff', (source) => {
    targetPlayer = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Player.all],
        2
    );

    targetPlayer.setSyncedMeta('HasHandcuffs', true);
    targetPlayer.setClothes(7, 41, 0, 2);
    alt.emitClient(targetPlayer, 'police:setHandsCuff');
});

alt.onClient('context:police:uncuff', (source) => {
    targetPlayer = getClosestEntity(
        source.pos,
        source.rot,
        [...alt.Player.all],
        2
    );

    targetPlayer.setSyncedMeta('HasHandcuffs', false);
    targetPlayer.setClothes(7, 0, 0, 0);
    alt.emitClient(targetPlayer, 'police:uncuff');
});

function getClosestEntity(
    playerPosition,
    rot,
    entities,
    dist,
    checkBackwards = false
) {
    const fwdVector = getForwardVector(rot);
    let position;

    if (!checkBackwards) {
        position = new alt.Vector3(
            playerPosition.x + fwdVector.x * dist,
            playerPosition.y + fwdVector.y * dist,
            playerPosition.z
        );
    } else {
        position = new alt.Vector3(
            playerPosition.x - fwdVector.x * dist,
            playerPosition.y - fwdVector.y * dist,
            playerPosition.z
        );
    }

    let lastRange = 25;
    let closestEntity;

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];

        if (!entity || !entity.valid) {
            continue;
        }

        const dist = position.distanceTo(entity.pos);
        if (dist > lastRange) {
            continue;
        }

        closestEntity = entity;
        lastRange = dist;
    }

    return closestEntity;
}
