import * as natives from 'natives';
import * as alt from 'alt-client';

import Core from 'urp-core';

let isLogged = false;

let hud;

let tank = 0;
const localPlayer = alt.Player.local;

const cameraTransition = () => {
    const playerCoords = natives.getEntityCoords(localPlayer.scriptID, true);
    const playerRotation = natives.getEntityRotation(localPlayer.scriptID, 2);
    const cameraDecendTime = 4000;
    natives.destroyAllCams(true);
    natives.renderScriptCams(false, false, 0, false, true, 0);
    natives.doScreenFadeIn(300);

    let cam1 = natives.createCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        playerCoords.x,
        playerCoords.y,
        playerCoords.z + 200.0,
        270.0,
        0.0,
        0.0,
        80.0,
        0,
        0
    );
    let cam2 = natives.createCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        playerCoords.x,
        playerCoords.y,
        playerCoords.z,
        270.0,
        0.0,
        0.0,
        80.0,
        0,
        0
    );
    natives.setCamActive(cam1, true);

    natives.setCamRot(
        cam2,
        playerRotation.x,
        playerRotation.y,
        playerRotation.z,
        2
    );
    natives.renderScriptCams(true, true, 0, true, true, 0);
    natives.setCamActiveWithInterp(cam2, cam1, cameraDecendTime, 0, 0);
    natives.freezeEntityPosition(localPlayer.scriptID, true);
    natives.setEntityVisible(localPlayer.scriptID, true, true);
    alt.setTimeout(() => {
        natives.doScreenFadeOut(300);
    }, cameraDecendTime - 300);
    natives.setEntityHeading(alt.Player.local.scriptID, alt.Player.local.rot.z);
    alt.setTimeout(() => {
        natives.renderScriptCams(false, false, 0, true, true, 0);
        natives.setCamActive(cam1, false);
        natives.destroyCam(cam1, true);
        natives.setCamActive(cam2, false);
        natives.destroyCam(cam2, true);
        natives.switchInPlayer(localPlayer.scriptID);
        natives.doScreenFadeIn(300);
        natives.freezeEntityPosition(localPlayer.scriptID, false);
        natives.clearFocus();
    }, cameraDecendTime);
};

alt.onServer('Core:Client:CharacterLoaded', () => {
    cameraTransition();
    hud = new alt.WebView('http://resource/client/html/index.html');
    natives.freezeEntityPosition(localPlayer, false);
    isLogged = true;
});
let belt = false;
let fuel = undefined;
alt.setInterval(() => {
    if (!isLogged) return;
    let hudPos = 'left';
    let fuelPos = undefined;
    let hours = natives.getClockHours();
    let minutes = natives.getClockMinutes();
    if (!localPlayer.vehicle) {
        natives.displayRadar(false);
    } else {
        alt.emitServer('fuel:Percents');
        natives.displayRadar(true);
        fuel = localPlayer.vehicle.getStreamSyncedMeta('fuel');
    }
    alt.onServer('UpdateValues', (e) => {
        tank = e;
    });

    const data = {
        hud: true,
        pauseMenu: natives.isPauseMenuActive(),
        armour: localPlayer.armour / 2.6,
        health: (localPlayer.health - 100) / 2.6,
        hunger: ((Core.Functions.getMetaData('hunger') / 100) * 100) / 2.6,
        thirst: ((Core.Functions.getMetaData('thirst') / 100) * 100) / 2.6,
        stress: Core.Functions.getMetaData('stress'),
        money: Core.Functions.getPlayerData('money'),
        ssn: Core.Functions.getPlayerData('ssn'),
        playerid: undefined,
        fuel: tank,
        hudPosition: hudPos,
        fuelPosition: fuelPos,
        vehicle: isVehicle,
        hour: hours,
        minute: minutes,
        isTalking: localPlayer.isTalking,
    };
    hud.emit('hud:Tick', data);
}, 1000);

let isVehicle = false;

alt.on('enteredVehicle', (_vehicle, seat) => {
    if (seat === 1) {
        isVehicle = true;
    }
});

alt.everyTick(() => {
    natives.hideHudComponentThisFrame(1); // Wanted Stars
    natives.hideHudComponentThisFrame(2); // Weapon Icon
    natives.hideHudComponentThisFrame(3); // Cash
    natives.hideHudComponentThisFrame(4); // MP Cash
    natives.hideHudComponentThisFrame(6); // Vehicle Name
    natives.hideHudComponentThisFrame(7); // Area Name
    natives.hideHudComponentThisFrame(8); // Vehicle Class
    natives.hideHudComponentThisFrame(9); // Street Name
    natives.hideHudComponentThisFrame(13); // Cash Change
    natives.hideHudComponentThisFrame(17); // Save Game
    natives.hideHudComponentThisFrame(20); // Weapon Stats

    if (belt) {
        natives.setPedConfigFlag(alt.Player.local.scriptID, 32, false);
        natives.disableControlAction(0, 75, true);
    } else {
        natives.setPedConfigFlag(alt.Player.local.scriptID, 32, true);
        natives.enableControlAction(0, 75, true);
    }

    if (!localPlayer.vehicle) {
        natives.displayRadar(false);
        isVehicle = false;
        belt = false;
        return;
    } else {
        isVehicle = true;

        natives.displayRadar(true);
    }

    let CarRPM = alt.Player.local.vehicle.rpm;
    let CarSpeed = alt.Player.local.vehicle.speed;
    let CarGear = alt.Player.local.vehicle.gear;
    let CarMph = (CarSpeed * 2.236936).toFixed();
    let CarKmh = CarSpeed * 3.6;
    let CalcRpm = CarRPM * 9;
    let engine = natives.getIsVehicleEngineRunning(
        localPlayer.vehicle.scriptID
    );
    let lights = natives.getVehicleLightsState(localPlayer.vehicle.scriptID);
    let lightOn = lights[2];
    const data = {
        ShowHud: true,
        CurrentCarRPM: CarRPM,
        CurrentCarSpeed: CarSpeed * 3.6,
        CurrentCarGear: CarGear,
        CurrentCarMph: CarMph,
        CurrentCarKmh: CarKmh,
        CurrentCalcRpm: CalcRpm,
        CurrentFuel: tank / 2.6,
        vehicle: isVehicle,
        belt: belt,
        engine,
        lightOn,
    };
    hud.emit('speedometer:data', data);
});

alt.on('keydown', (key) => {
    if (key === 71) {
        seatBelt();
    }
});

alt.on('context:vehicle:seatbelt', () => {
    seatBelt();
});

const seatBelt = () => {
    if (!localPlayer.vehicle) return;

    belt = !belt;

    belt ? alt.emit('playHowl2d', 'belt.ogg', 0.6) : alt.emit('playHowl2d', 'unbelt.ogg', 0.6);
};
