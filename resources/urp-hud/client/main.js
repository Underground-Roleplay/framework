import * as natives from 'natives';
import * as alt from 'alt-client';

import Core from 'urp-core';

let isLogged = false;

let hud;

const localPlayer = alt.Player.local;

alt.onServer('Core:Client:CharacterLoaded', () => {
    const playerPed = alt.Player.local.scriptID;
    const playerCoords = natives.getEntityCoords(playerPed, true);
    const playerRotation = natives.getEntityRotation(playerPed, 2);
    const cameraDecendTime = 4000;
    natives.destroyAllCams(true);
    natives.renderScriptCams(false, false, 0, false, true, 0);
    natives.doScreenFadeIn(300);

    let cam1 = natives.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", playerCoords.x, playerCoords.y, playerCoords.z + 200.0, 270.00, 0.00, 0.00, 80.00, 0, 0)
    let cam2 = natives.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", playerCoords.x, playerCoords.y, playerCoords.z, 270.00, 0.00, 0.00, 80.00, 0, 0)
    natives.setCamActive(cam1, true);
    
    natives.setCamRot(cam2, playerRotation.x, playerRotation.y, playerRotation.z, 2);
    natives.renderScriptCams(true, true, 0, true, true, 0);
    natives.setCamActiveWithInterp(cam2, cam1, cameraDecendTime, 0, 0); 
    natives.freezeEntityPosition(playerPed, true);
    natives.setEntityVisible(playerPed, true, true);
    alt.setTimeout(() => {
        natives.doScreenFadeOut(300);
    }, cameraDecendTime - 300);
    natives.setEntityHeading(alt.Player.local.scriptID, alt.Player.local.rot.z)
    alt.setTimeout(() => {
        natives.renderScriptCams(false, false, 0, true, true, 0)
        natives.setCamActive(cam1, false);
        natives.destroyCam(cam1, true);
        natives.setCamActive(cam2, false);
        natives.destroyCam(cam2, true);
        natives.switchInPlayer(playerPed);
        natives.doScreenFadeIn(300);
        natives.freezeEntityPosition(playerPed, false);
        natives.clearFocus();
        
    }, cameraDecendTime);
    
    hud = new alt.WebView('http://resource/client/html/ui.html');
    natives.freezeEntityPosition(localPlayer, false);
    isLogged = true;
})

alt.setInterval(()=> {
    if(!isLogged) return;
    let hudPos = 'left'
    let fuelPos = undefined
    let fuel = undefined
    if(!localPlayer.vehicle){
        natives.displayRadar(false)
        hudPos = 'left'
    }else{
        natives.displayRadar(true)
        fuelPos = 'right'
        hudPos = 'right'
        fuel = localPlayer.vehicle.getStreamSyncedMeta('fuel')
    }
    const data = {
        hud: true,
        pauseMenu: natives.isPauseMenuActive(),
        armour: localPlayer.armour,
        health: localPlayer.health,
        food: Core.Functions.getMetaData('hunger'),
        thirst: Core.Functions.getMetaData('thirst'),
        stress: Core.Functions.getMetaData('stress'),
        playerid: undefined,
        fuel: fuel,
        hudPosition: hudPos,
        fuelPosition: fuelPos
    }
    hud.emit('hud:Tick', data)
}, 1000)