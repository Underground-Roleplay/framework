/// <reference types="@altv/types-client" />
import * as alt from 'alt';
import * as native from 'natives';
import * as utilityScreen2World from '/client/utility/screen2world.js';
import { distance } from '/client/utility/vector.js';

const raycastFlags = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256;

let hasSelected = false;
let clickCooldown = Date.now();
let rayCastInfo;
let lastRayCast = Date.now();
let endPoint;

let interactionTypes = {
    0: () => {},
    1: 'player',
    2: 'vehicle',
    3: 'object'
};

alt.setInterval(useMenu, 0);

function useMenu() {
    let markedAsInvalid = false;

    // if (alt.Player.local.getSyncedMeta('STOP_DRAWS')) {
    //     markedAsInvalid = true;
    // }

    // if (alt.Player.local.getSyncedMeta('CHATTING')) {
    //     markedAsInvalid = true;
    // }

    if (native.isEntityDead(alt.Player.local.scriptID, false)) {
        markedAsInvalid = true;
    }

    if (markedAsInvalid) {
        rayCastInfo = null;
        endPoint = null;
        hasSelected = false;
        return;
    }

    // Left go of left alt.
    native.disableControlAction(0, 19, true); // Left Alt
    if (native.isDisabledControlJustReleased(0, 19)) {
        alt.emit('context:Dismount');
        rayCastInfo = null;
        endPoint = null;
        hasSelected = false;
        return;
    }

    if (native.isDisabledControlReleased(0, 19)) {
        rayCastInfo = null;
        endPoint = null;
        hasSelected = false;
        return;
    }

    // Alt is now pressed.
    // Disable other controls temporarily.
    native.disableControlAction(0, 24, true); // Left Mouse
    native.disableControlAction(0, 25, true); // Right Mouse
    native.disableControlAction(0, 63, true); // Vehicle Left
    native.disableControlAction(0, 64, true); // Vehicle Right
    native.disableControlAction(0, 68, true);
    native.disableControlAction(0, 1, true);
    native.disableControlAction(0, 2, true);
    native.disablePlayerFiring(alt.Player.local.scriptID, true);

    if (!hasSelected) {
        native.setMouseCursorActiveThisFrame();
    }

    if (Date.now() > lastRayCast) {
        lastRayCast = Date.now() + 25;
        const [_, hit, endCoords, surfaceNormal, entity] = utilityScreen2World.screenToWorld(raycastFlags, -1);

        if (!hit) {
            rayCastInfo = null;
            endPoint = null;
            return;
        }
        
        const entityType = native.getEntityType(entity);

        if (entityType === 0) {
            rayCastInfo = null;
            endPoint = null;
            return;
        }

        rayCastInfo = {
            hit,
            endCoords,
            surfaceNormal,
            entity,
            entityType
        };

        endPoint = endCoords;
    }

    if (!rayCastInfo) {
        return;
    }

    const playerPos = alt.Player.local.vehicle ? alt.Player.local.vehicle.pos : alt.Player.local.pos;

    if (endPoint && !hasSelected) {
        const dist = distance(playerPos, rayCastInfo.endCoords);
        const color = dist <= 5 ? { r: 255, g: 255, b: 255 } : { r: 255, g: 0, b: 0 };
        native.drawLine(
            playerPos.x,
            playerPos.y,
            playerPos.z,
            endPoint.x,
            endPoint.y,
            endPoint.z,
            color.r,
            color.g,
            color.b,
            100
        );
    }

    // Rightclick
    if (native.isDisabledControlJustReleased(0, 25)) {
        if (Date.now() < clickCooldown) {
            return;
        }

        clickCooldown = Date.now() + 100;
        if (distance(playerPos, rayCastInfo.endCoords) > 5) {
            return;
        }

        const model = native.getEntityModel(rayCastInfo.entity);
        if (!interactionTypes[rayCastInfo.entityType]) {
            return;
        }
    
        if (rayCastInfo.entity === alt.Player.local.scriptID) {
            alt.emit('context:ParseInteraction', 'self', rayCastInfo.entity, model, rayCastInfo.endCoords);
            return;
        }

        const interactionType = interactionTypes[rayCastInfo.entityType];
        alt.emit('context:Dismount');
        alt.emit('context:ParseInteraction', interactionType, rayCastInfo.entity, model, rayCastInfo.endCoords);

        hasSelected = true;
        rayCastInfo = null;
    }
}
