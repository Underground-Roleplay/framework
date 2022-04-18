import * as alt from 'alt-client';
import * as natives from 'natives';
import utils from './utils';
import Core from '../main';
import { VehList } from '../../shared/configs/vehicles';

let deathInterval;
let deathTime;

const startTicks = () => {
    alt.log('started ticks to server');
    alt.setInterval(() => {
        alt.emitServer('Core:Server:CharacterTick');
    }, 5000);
};

const getMetaData = (key) => {
    if (!alt.Player.local.playerData.metadata[key]) return undefined;
    return alt.Player.local.playerData.metadata[key];
};

const handleSetplayerData = (key, value) => {
    if (!alt.Player.local.playerData) {
        alt.Player.local.playerData = {};
    }

    alt.emit(
        'playerData:changed',
        key,
        value,
        alt.Player.local.playerData[key]
    );
    alt.Player.local.playerData[key] = value;
    alt.log('[DEBUG] player meta for', key, 'updated');
};

const getPlayerData = (key) => {
    if (!alt.Player.local.playerData[key]) return {};
    return alt.Player.local.playerData[key];
};

const getJobInfo = (key) => {
    if (!alt.Player.local.playerData.job[key]) return undefined;
    return alt.Player.local.playerData.job[key];
};

const handleDeath = (value) => {
    if (value) {
        if (!deathInterval) {
            deathInterval = alt.setInterval(handleDeathMovement, 0);
            deathTime = Date.now() + 25000;
        }
        return;
    }

    if (!deathInterval) {
        return;
    }

    natives.clearPedTasksImmediately(alt.Player.local.scriptID);
    alt.clearInterval(deathInterval);
    deathInterval = null;
};

const handleDeathMovement = () => {
    if (!natives.isPedRagdoll(alt.Player.local.scriptID)) {
        natives.setPedToRagdoll(
            alt.Player.local.scriptID,
            -1,
            -1,
            0,
            false,
            false,
            false
        );
    }
    const timeLeft = deathTime - Date.now();
    if (timeLeft > 0) {
        utils.drawText2D(
            `${(timeLeft / 1000).toFixed(2)}s até ser revivido`,
            { x: 0.5, y: 0.2 },
            0.5,
            new alt.RGBA(255, 255, 255, 255)
        );
    } else {
        utils.drawText2D(
            `Revivendo...`,
            { x: 0.5, y: 0.2 },
            0.5,
            new alt.RGBA(255, 255, 255, 255)
        );
    }
};

const RequestModel = async (modelHash, timeoutMs = 1000) => {
    return new Promise((resolve, reject) => {
        if (!natives.isModelValid(modelHash)) {
            reject(new Error(`Model does not exist: ${modelHash}`));
            return;
        }

        if (natives.hasModelLoaded(modelHash)) {
            resolve(true);
            return;
        }

        natives.requestModel(modelHash);

        const deadline = new Date().getTime() + timeoutMs;

        const inter = alt.setInterval(() => {
            if (natives.hasModelLoaded(modelHash)) {
                alt.clearInterval(inter);
                resolve(true);
            } else if (deadline < new Date().getTime()) {
                alt.clearInterval(inter);
                const error = `Error: Async loading failed for model: ${modelHash}`;
                alt.log(error);
                reject(new Error(error)); // probably better resolve(false)
            }
        }, 10);
    });
};

let isNoclip = false;
let noclip_speed = 1.0;

function getCamDirection() {
    let heading =
        natives.getGameplayCamRelativeHeading() +
        natives.getEntityHeading(alt.Player.local.scriptID);
    let pitch = natives.getGameplayCamRelativePitch();

    let x = -Math.sin(heading * (Math.PI / 180.0));
    let y = Math.cos(heading * (Math.PI / 180.0));
    let z = Math.sin((pitch * Math.PI) / 180.0);
    let len = Math.sqrt(x * x + y * y + z * z);

    if (len != 0) {
        x /= len;
        y /= len;
        z /= len;
    }

    return [x, y, z];
}

var loop;
alt.onServer('admin:Noclip', () => {
    if (isNoclip == false) {
        isNoclip = true;
        alt.emitServer('Core:Server:toggleSourceVisible', false);
        natives.freezeEntityPosition(alt.Player.local.scriptID, true);
        natives.setEntityCollision(alt.Player.local.scriptID, false, false);
        loop = alt.everyTick(() => {
            if (isNoclip) {
                natives.setEntityInvincible(alt.Player.local.scriptID, true);
                noclip_speed = 0.5;
                if (natives.isControlPressed(0, 21)) {
                    noclip_speed = 2.5;
                }
                if (natives.isControlPressed(0, 32)) {
                    let { x, y, z } = natives.getEntityCoords(
                        alt.Player.local.scriptID,
                        true
                    );
                    let [dx, dy, dz] = getCamDirection();
                    natives.setEntityVelocity(
                        alt.Player.local.scriptID,
                        0.0001,
                        0.0001,
                        0.0001
                    );
                    x += noclip_speed * dx;
                    y += noclip_speed * dy;
                    z += noclip_speed * dz;
                    natives.setEntityCoordsNoOffset(
                        alt.Player.local.scriptID,
                        x,
                        y,
                        z,
                        true,
                        true,
                        true
                    );
                }
                if (natives.isControlPressed(0, 269)) {
                    let { x, y, z } = natives.getEntityCoords(
                        alt.Player.local.scriptID,
                        true
                    );
                    let [dx, dy, dz] = getCamDirection();
                    natives.setEntityVelocity(
                        alt.Player.local.scriptID,
                        0.0001,
                        0.0001,
                        0.0001
                    );
                    x -= noclip_speed * dx;
                    y -= noclip_speed * dy;
                    z -= noclip_speed * dz;
                    natives.setEntityCoordsNoOffset(
                        alt.Player.local.scriptID,
                        x,
                        y,
                        z,
                        true,
                        true,
                        true
                    );
                }
            }
        });
    } else {
        isNoclip = false;
        alt.emitServer('Core:Server:toggleSourceVisible', true);
        natives.setEntityInvincible(alt.Player.local.scriptID, false);
        natives.freezeEntityPosition(alt.Player.local.scriptID, false);
        natives.setEntityCollision(alt.Player.local.scriptID, true, true);
        alt.clearEveryTick(loop);
    }
});

alt.onServer(`admin:tpwp`, () => {
    let blip = natives.getFirstBlipInfoId(8);

    if (blip != 0) {
        let tpEnt = alt.Player.local.scriptID;

        if (natives.isPedInAnyVehicle(tpEnt, true)) {
            tpEnt = natives.getVehiclePedIsIn(myPed, false);
        }

        let { x, y } = natives.getBlipInfoIdCoord(blip);
        let z = 0.1;

        natives.freezeEntityPosition(tpEnt, true);
        natives.requestCollisionAtCoord(x, y, z);
        natives.setEntityCoords(tpEnt, x, y, z, true, true, true, true);

        const interval = alt.setInterval(() => {
            let tpEntCoord = natives.getEntityCoords(tpEnt, true);
            let loaded, ground;

            if (z > 1999.0) {
                z = 0.1;
            } else {
                z += 15.1;
            }

            natives.requestCollisionAtCoord(tpEntCoord.x, tpEntCoord.y, z);
            natives.setEntityCoords(tpEnt, x, y, z, true, true, true, true);

            [loaded, ground] = natives.getGroundZFor3dCoord(
                tpEntCoord.x,
                tpEntCoord.y,
                tpEntCoord.z,
                z,
                0,
                true
            );

            if (loaded) {
                z = ground;

                natives.setEntityCoords(tpEnt, x, y, z, true, true, true, true);
                natives.freezeEntityPosition(tpEnt, false);
                alt.clearInterval(interval);
            }
        }, 0);
    } else if (blip === 0) {
        return;
    }
});

const loadAnim = (dict) => {
    return new Promise((res) => {
        natives.requestAnimDict(dict);

        let count = 0;
        const inter = alt.setInterval(() => {
            if (count > 255) {
                alt.clearInterval(inter);
                return;
            }
            if (natives.hasAnimDictLoaded(dict)) {
                res(true);
                alt.clearInterval(inter);
                return;
            }
            count += 1;
        }, 5);
    });
};

const playAnim = (dict, anim, duration, flags, prop = false) => {
    if (alt.Player.local['objProp']) {
        natives.setEntityAsMissionEntity(
            alt.Player.local['objProp'],
            false,
            true
        );
        natives.detachEntity(alt.Player.local['objProp'], true, true);
        alt.Player.local['objProp'] = undefined;
        //Retira o attachment SYNC se for iniciar uma nova anim
        alt.emitServer('character:destroyAttachment');
    }
    if (prop) {
        if (!alt.Player.local['objProp']) {
            alt.Player.local['objProp'] = natives.createObject(
                natives.getHashKey(prop.name),
                0,
                0,
                0,
                true,
                true,
                true
            );
            natives.attachEntityToEntity(
                alt.Player.local['objProp'],
                alt.Player.local.scriptID,
                natives.getPedBoneIndex(alt.Player.local.scriptID, prop.hand),
                0,
                0,
                0,
                0,
                0,
                0,
                false,
                true,
                true,
                false,
                1,
                true
            );
            natives.setEntityAsMissionEntity(
                alt.Player.local['objProp'],
                true,
                true
            );
            //Adiciona o attachment SYNC
            alt.emitServer(
                'character:addAttachment',
                natives.getHashKey(prop.name),
                prop.hand
            );
        }
    }
    natives.clearPedTasks(alt.Player.local.scriptID);
    if (natives.hasAnimDictLoaded(dict)) {
        natives.taskPlayAnim(
            alt.Player.local.scriptID,
            dict,
            anim,
            1,
            -1,
            duration,
            flags,
            1.0,
            false,
            false,
            false
        );
    } else {
        const load = loadAnim(dict);
        load.then(() => {
            natives.taskPlayAnim(
                alt.Player.local.scriptID,
                dict,
                anim,
                1,
                -1,
                duration,
                flags,
                1.0,
                false,
                false,
                false
            );
        }).catch(() => {
            alt.log('ERROR: Promise returned reject');
        });
    }
};

const stopAnim = () => {
    if (alt.Player.local['objProp']) {
        //Retira o attachment SYNC se a animação for parada
        alt.emitServer('character:destroyAttachment');
        natives.detachEntity(alt.Player.local['objProp'], true, true);
        alt.Player.local['objProp'] = undefined;
    }
    natives.clearPedTasks(alt.Player.local.scriptID);
};

const disableConfigFlags = () => {
    natives.setPedConfigFlag(alt.Player.local.scriptID, 184, true);
    //  Keep engine running
    natives.setPedConfigFlag(alt.Player.local.scriptID, 241, true);
};

const disableBehaviours = () => {
    alt.everyTick(() => {
        disableConfigFlags();
        //  Disable engine auto start
        natives.setPedConfigFlag(alt.Player.local.scriptID, 429, true);
        // Fix webview
        natives.drawRect(0, 0, 0, 0, 0, 0, 0, 0, false);
        //  Disable default weapon switch
        for (let i = 157; i < 164; i++) {
            natives.disableControlAction(0, i, true);
        }

        //  Disable Weapon Wheel
        // natives.disableControlAction(0, 12, true);
        // natives.disableControlAction(0, 13, true);
        // natives.disableControlAction(0, 14, true);
        // natives.disableControlAction(0, 15, true);

        // if (
        //     natives.isPedTryingToEnterALockedVehicle(alt.Player.local.scriptID)
        // ) {
        //     natives.clearPedTasks(alt.Player.local.scriptID);
        //     natives.clearPedSecondaryTask(alt.Player.local.scriptID);
        // }
    });
};

const setVehicleEngine = (vehicle, state) => {
    if (!state) {
        natives.setVehicleEngineOn(vehicle.scriptID, state, true, true);
    } else {
        natives.setVehicleEngineOn(vehicle.scriptID, state, false, true);
    }
};

const handleVehicleStates = (vehicle, key, value, oldValue) => {
    if (vehicle instanceof alt.Vehicle) {
        if (key === 'engine') {
            setVehicleEngine(vehicle, value);
            alt.log('ENGINE', value);
            return;
        }
    }
};

const getCloseItems = () => {
    if (Core.Entities.nearItems.length <= 0) return undefined;
    return Core.Entities.nearItems;
};

const setHandcuffs = () => {
    const targetPed = alt.Player.all.find(
        (targetPed) => alt.Player.local.pos.distanceTo(targetPed.pos) < 1.5
    );
    if (!targetPed) return;
    natives.setEnableHandcuffs(targetPed, true);
};

const removeHandcuffs = () => {
    const hasCuff = hasHandcuffs();
    const targetPed = alt.Player.all.find(
        (targetPed) => alt.Player.local.pos.distanceTo(targetPed.pos) < 1.5
    );
    if (!targetPed) return;
    if (hasCuff) natives.uncuffPed(targetPed);
};

const hasHandcuffs = () => {
    const targetPed = alt.Player.all.find(
        (targetPed) => alt.Player.local.pos.distanceTo(targetPed.pos) < 1.5
    );
    if (!targetPed) return;
    return natives.isPedCuffed(targetPed);
};

const getDistance = (vector1, vector2) => {
    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) +
            Math.pow(vector1.y - vector2.y, 2) +
            Math.pow(vector1.z - vector2.z, 2)
    );
};

alt.on('keydown', (key) => {
    if (key == 'G'.charCodeAt(0)) {
        const playerPed = alt.Player.local.scriptID;
        if (!natives.isPedSittingInAnyVehicle(playerPed)) {
            const coords = natives.getEntityCoords(playerPed, true);
            const offset = natives.getOffsetFromEntityInWorldCoords(
                playerPed,
                0.0,
                1.0,
                0.0
            );
            const rayHandle = natives.startShapeTestCapsule(
                coords.x,
                coords.y,
                coords.z - 0.5,
                offset.x,
                offset.y,
                offset.z,
                0.8,
                10,
                playerPed,
                7
            );
            const result = natives.getShapeTestResult(rayHandle)[4];
            if (!result) return;
            if (natives.doesEntityExist(result)) {
                const seatBones = [
                    'seat_pside_f',
                    'seat_dside_r',
                    'seat_pside_r',
                ];
                let closestSeat = [null, 3.0];
                seatBones.forEach((item, i) => {
                    if (
                        natives.getEntityBoneIndexByName(result, item) != -1 &&
                        !natives.getPedInVehicleSeat(result, i, true)
                    ) {
                        const boneIndex = natives.getEntityBoneIndexByName(
                            result,
                            item
                        );
                        const boneCoords = natives.getWorldPositionOfEntityBone(
                            result,
                            boneIndex
                        );
                        const distance = getDistance(coords, boneCoords);
                        if (distance < closestSeat[1]) {
                            closestSeat = [i, distance];
                        }
                    }
                });
                if (closestSeat[0] !== null) {
                    natives.setPedConfigFlag(playerPed, 184, true);
                    natives.taskEnterVehicle(
                        playerPed,
                        result,
                        -1,
                        closestSeat[0],
                        1.0,
                        1,
                        0
                    );
                }
            }
        }
    }
});

let rotateInterval;

const rotateCharacter = (data) => {
    if (data === 'left') {
        if (rotateInterval) alt.clearInterval(rotateInterval);
        rotateInterval = alt.setInterval(() => {
            natives.setEntityHeading(
                alt.Player.local.scriptID,
                natives.getEntityHeading(alt.Player.local.scriptID) - 1
            );
        }, 10);
    } else if (data === 'right') {
        if (rotateInterval) alt.clearInterval(rotateInterval);
        rotateInterval = alt.setInterval(() => {
            natives.setEntityHeading(
                alt.Player.local.scriptID,
                natives.getEntityHeading(alt.Player.local.scriptID) + 1
            );
        }, 10);
    } else if (data === 'keyup') {
        alt.clearInterval(rotateInterval);
    }
};

const generateBlip = (cds, name) => {
    let pointBlip = new alt.PointBlip(cds.x, cds.y, cds.z);
    pointBlip.name = name || 'called';
    pointBlip.sprite = 66;
    pointBlip.color = 4;
    pointBlip.routeColor = 4;
    pointBlip.shortRange = true;
    pointBlip.route = true;
    pointBlip.pulse = true;
    return pointBlip;
};

const fuelTankSize = (vehicle) => {
    if (!vehicle) return undefined;
    const vehicleModel = Object.keys(VehList).find(
        (v) => alt.hash(v) === vehicle.model
    );
    return VehList[vehicleModel].fuelTank;
};

let point = false;
let pointInterval;
alt.on('keydown', async (key) => {
    if (key == '66') {
        if (alt.Player.local.getSyncedMeta('HasHandcuffs')) return;
        if (!natives.isPedInAnyVehicle(alt.Player.local.scriptID, true)) {
            await loadAnim('anim@mp_point');
            if (!point) {
                natives.setPedCurrentWeaponVisible(
                    alt.Player.local.scriptID,
                    0,
                    1,
                    1,
                    1
                );
                natives.setPedConfigFlag(alt.Player.local.scriptID, 36, true);
                natives.taskMoveNetworkByName(
                    alt.Player.local.scriptID,
                    'task_mp_pointing',
                    0.5,
                    false,
                    'anim@mp_point',
                    24
                );
                point = true;
                pointInterval = alt.everyTick(() => {
                    let camRot = natives.getGameplayCamRot(2);

                    natives.isTaskMoveNetworkActive(alt.Player.local.scriptID);

                    let camPitch =
                        camRot.x -
                        natives.getEntityPitch(alt.Player.local.scriptID);

                    if (camPitch < -70.0) {
                        camPitch = -70.0;
                    } else if (camPitch > 42.0) {
                        camPitch = 42.0;
                    }
                    camPitch = (camPitch + 70.0) / 112.0;

                    let camHeading = natives.getGameplayCamRelativeHeading();

                    let cosCamHeading = Math.cos(camHeading);
                    let sinCamHeading = Math.sin(camHeading);

                    if (camHeading < -180.0) {
                        camHeading = -180.0;
                    } else if (camHeading > 180.0) {
                        camHeading = 180.0;
                    }
                    camHeading = (camHeading + 180.0) / 360.0;

                    let coords = natives.getOffsetFromEntityInWorldCoords(
                        alt.Player.local.scriptID,
                        cosCamHeading * -0.2 -
                            sinCamHeading * (0.4 * camHeading + 0.3),
                        sinCamHeading * -0.2 +
                            cosCamHeading * (0.4 * camHeading + 0.3),
                        0.6
                    );

                    let ray = natives.startShapeTestCapsule(
                        coords.x,
                        coords.y,
                        coords.z - 0.2,
                        coords.x,
                        coords.y,
                        coords.z + 0.2,
                        1.0,
                        95,
                        alt.Player.local.scriptID,
                        7
                    );
                    let [_, blocked, coords1, coords2, entity] =
                        natives.getShapeTestResult(
                            ray,
                            false,
                            null,
                            null,
                            null
                        );
                    natives.setTaskMoveNetworkSignalFloat(
                        alt.Player.local.scriptID,
                        'Pitch',
                        camPitch
                    );
                    natives.setTaskMoveNetworkSignalFloat(
                        alt.Player.local.scriptID,
                        'Heading',
                        camHeading * -1.0 + 1.0
                    );
                    natives.setTaskMoveNetworkSignalBool(
                        alt.Player.local.scriptID,
                        'isBlocked',
                        blocked
                    );
                    natives.setTaskMoveNetworkSignalBool(
                        alt.Player.local.scriptID,
                        'isFirstPerson',
                        natives.getCamViewModeForContext(
                            natives.getCamActiveViewModeContext()
                        ) === 4
                    );
                });
            }
        }
    }
});

alt.on('keyup', (key) => {
    if (key == '66') {
        if (point) {
            natives.requestTaskMoveNetworkStateTransition(
                alt.Player.local.scriptID,
                'Stop'
            );
            if (!natives.isPedInjured(alt.Player.local.scriptID)) {
                natives.clearPedSecondaryTask(alt.Player.local.scriptID);
            }
            if (!natives.isPedInAnyVehicle(alt.Player.local.scriptID, true)) {
                natives.setPedCurrentWeaponVisible(
                    alt.Player.local.scriptID,
                    1,
                    1,
                    1,
                    1
                );
            }
            natives.setPedConfigFlag(alt.Player.local.scriptID, 36, 0);
            natives.clearPedSecondaryTask(alt.Player.local.scriptID);
            point = false;
            natives.removeAnimDict('anim@mp_point');
            alt.clearEveryTick(pointInterval);
        }
    }
});

let hurt = false;
alt.setInterval(() => {
    if (!natives.isEntityInWater(alt.Player.local.scriptID)) {
        if (alt.Player.local.health <= 150 && !hurt) {
            setHurt();
            return;
        }
        if (alt.Player.local.health >= 151 && hurt) {
            setNotHurt();
            return;
        }
    }
}, 5000);

const setHurt = () => {
    hurt = true;
    natives.requestAnimSet('move_m@injured');
    natives.setPedMovementClipset(
        alt.Player.local.scriptID,
        'move_m@injured',
        1.0
    );
    natives.setPlayerHealthRechargeMultiplier(alt.Player.local.scriptID, 0.0);
    natives.disableControlAction(0, 21, true);
    natives.disableControlAction(0, 22, true);
};

const setNotHurt = () => {
    hurt = false;
    natives.setPlayerHealthRechargeMultiplier(alt.Player.local.scriptID, 0.0);
    natives.resetPedMovementClipset(alt.Player.local.scriptID, 0.0);
    natives.resetPedWeaponMovementClipset(alt.Player.local.scriptID);
    natives.resetPedStrafeClipset(alt.Player.local.scriptID);
};

alt.everyTick(() => {
    if (
        natives.isPedShooting(alt.Player.local.scriptID) &&
        Core.Functions.getJobInfo('name') !== 'police'
    ) {
        let random = Math.floor(0 + Math.random() * (100 + 1));
        if (random <= 20) {
            alt.emitServer('Core:Emergency:Alert', 'police', 'bora bnora');
        }
    }
});

export default {
    startTicks,
    handleSetplayerData,
    getPlayerData,
    handleDeath,
    RequestModel,
    getMetaData,
    playAnim,
    stopAnim,
    loadAnim,
    disableBehaviours,
    handleVehicleStates,
    disableConfigFlags,
    getJobInfo,
    getCloseItems,
    setHandcuffs,
    removeHandcuffs,
    hasHandcuffs,
    rotateCharacter,
    generateBlip,
    fuelTankSize,
};
