import * as alt from 'alt-client';
import * as natives from 'natives';

import Core from 'urp-core';

import { Doors } from '../shared/config';

const localPlayer = alt.Player.local;

let doorFound;

alt.onServer('doorLock:client:setState', (doorID, state) => {
    if (!Doors[doorID]) return;
    Doors[doorID].locked = state;
});

const getAuthorization = (accessList) => {
    const currentJob = Core.Functions.getJobInfo('name');
    if (accessList.includes(currentJob)) return true;
    return false;
};

const toggleDoorLock = (doorState, index) => {
    Doors[index].locking = true;
    Core.Functions.playAnim('anim@heists@keycard@', 'exit', 1000, 49);
    natives.freezeEntityPosition(localPlayer, true);
    alt.emit(
        'progressBar:start',
        `${doorState ? 'Unlocking' : 'Locking'}`,
        1000
    );
    alt.setTimeout(() => {
        Doors[index].locking = false;
        natives.clearPedTasks(localPlayer);
        natives.freezeEntityPosition(localPlayer, false);
        alt.emitServer('doorLock:server:updateState', index, !doorState);
    }, 1000);
};

const doorManager = () => {
    Doors.map((current, i) => {
        let distance;
        let maxDistance;
        let awayFromDoors = true;

        // Check distance between doors
        if (current.doors) {
            distance = localPlayer.pos.distanceTo(current.doors[0].objCoords);
        } else {
            distance = localPlayer.pos.distanceTo(current.objCoords);
        }

        if (current.distance) {
            maxDistance = current.distance;
        }

        if (distance > 3 && !doorFound) return;

        // See if has multiple doors
        if (current.doors) {
            for (let j = 0; j < current.doors.length; j++) {
                const currentDoor = current.doors[j];
                const doorHash =
                    currentDoor.objName === typeof Number
                        ? currentDoor.objName
                        : alt.hash(currentDoor.objName);
                if (
                    !currentDoor.object ||
                    natives.doesEntityExist(currentDoor.object)
                ) {
                    currentDoor.object = natives.getClosestObjectOfType(
                        currentDoor.objCoords.x,
                        currentDoor.objCoords.y,
                        currentDoor.objCoords.z,
                        1.0,
                        doorHash,
                        false,
                        false,
                        false
                    );
                }
                natives.freezeEntityPosition(
                    currentDoor.object,
                    current.locked
                );
                if (
                    current.locked &&
                    currentDoor.objYaw &&
                    natives.getEntityRotation(currentDoor.object, 2).z !==
                        currentDoor.objYaw
                ) {
                    natives.setEntityRotation(
                        currentDoor.object,
                        0,
                        0,
                        currentDoor.objYaw,
                        2,
                        true
                    );
                }
            }
        } else {
            const doorHash =
                current.objName === typeof Number
                    ? current.objName
                    : alt.hash(current.objName);
            if (!current.object || natives.doesEntityExist(current.object)) {
                current.object = natives.getClosestObjectOfType(
                    current.objCoords.x,
                    current.objCoords.y,
                    current.objCoords.z,
                    1.0,
                    doorHash,
                    false,
                    false,
                    false
                );
            }
            natives.freezeEntityPosition(current.object, current.locked);
            if (
                current.locked &&
                current.objYaw &&
                natives.getEntityRotation(current.object, 2).z !==
                    current.objYaw
            ) {
                natives.setEntityRotation(
                    current.object,
                    0,
                    0,
                    current.objYaw,
                    2,
                    true
                );
            }
        }

        if (distance < maxDistance) {
            awayFromDoors = false;
            doorFound = true;

            let displayText;
            const isAuthorized = getAuthorization(current.authorizedJobs);

            if (isAuthorized) {
                if (current.locked) {
                    displayText = '[~g~E~w~] - Locked';
                } else {
                    displayText = '[~g~E~w~] - Unlocked';
                }
            } else {
                if (current.locked) {
                    displayText = '~r~Locked';
                } else {
                    displayText = '~g~Unlocked';
                }
            }

            if (current.locking) {
                if (current.locked) {
                    displayText = '~r~Unlocking...';
                } else {
                    displayText = '~r~Locking...';
                }
            }

            if (!current.objCoords) {
                current.objCoords = current.textCoords;
            }

            Core.Utils.drawText3D(
                current.objCoords.x,
                current.objCoords.y,
                current.objCoords.z,
                displayText
            );
            if (natives.isControlJustReleased(0, 38)) {
                if (isAuthorized) {
                    toggleDoorLock(current.locked, i);
                } else {
                    alt.emit(
                        'notify',
                        'error',
                        `Doorlock`,
                        `You aren't authorizated to do this`
                    );
                }
            }
        }

        if (awayFromDoors) {
            doorFound = false;
        }
    });
};

//Thread
alt.everyTick(() => {
    doorManager();
});
