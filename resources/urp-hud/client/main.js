import * as natives from 'natives';
import * as alt from 'alt-client';

import Core from 'urp-core';

let isLogged = false;

let hud;

let tank = 0 
const localPlayer = alt.Player.local;

const cameraTransition = () => {
    const playerCoords = natives.getEntityCoords(localPlayer.scriptID, true);
    const playerRotation = natives.getEntityRotation(localPlayer.scriptID, 2);
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
    natives.freezeEntityPosition(localPlayer.scriptID, true);
    natives.setEntityVisible(localPlayer.scriptID, true, true);
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
        natives.switchInPlayer(localPlayer.scriptID);
        natives.doScreenFadeIn(300);
        natives.freezeEntityPosition(localPlayer.scriptID, false);
        natives.clearFocus();
        
    }, cameraDecendTime);
}

alt.onServer('Core:Client:CharacterLoaded', () => {
    cameraTransition()
    hud = new alt.WebView('http://resource/client/html/ui.html');
    natives.freezeEntityPosition(localPlayer, false);
    isLogged = true;
})
let belt = false
alt.setInterval(()=> {
    if(!isLogged) return;
    let isVehicle = false
    let hudPos = 'left'
    let fuelPos = undefined
    let fuel = undefined
    let hours = natives.getClockHours()
    let minutes = natives.getClockMinutes()
    if(!localPlayer.vehicle){
        isVehicle = false;
        natives.displayRadar(false)
    } else {
        isVehicle = true;
        alt.emitServer('fuel:Percents')
        natives.displayRadar(true)
        fuel = localPlayer.vehicle.getStreamSyncedMeta('fuel')
    }
    alt.onServer('UpdateValues', (e)=>{tank = e})

    const data = {
        hud: true,
        pauseMenu: natives.isPauseMenuActive(),
        armour: localPlayer.armour,
        health: localPlayer.health,
        hunger: Core.Functions.getMetaData('hunger'),
        thirst: Core.Functions.getMetaData('thirst'),
        stress: Core.Functions.getMetaData('stress'),
        playerid: undefined,
        fuel: tank,
        hudPosition: hudPos,
        fuelPosition: fuelPos,
        vehicle: isVehicle,
        hour: hours,
        minute: minutes,
        belt: belt
    }
    hud.emit('hud:Tick', data)
}, 1000)

alt.everyTick(() => {
    natives.hideHudComponentThisFrame(1)  // Wanted Stars
    natives.hideHudComponentThisFrame(2)  // Weapon Icon
    natives.hideHudComponentThisFrame(3)  // Cash
    natives.hideHudComponentThisFrame(4)  // MP Cash
    natives.hideHudComponentThisFrame(6)  // Vehicle Name
    natives.hideHudComponentThisFrame(7)  // Area Name
    natives.hideHudComponentThisFrame(8)  // Vehicle Class
    natives.hideHudComponentThisFrame(9)  // Street Name
    natives.hideHudComponentThisFrame(13) // Cash Change
    natives.hideHudComponentThisFrame(17) // Save Game
    natives.hideHudComponentThisFrame(20) // Weapon Stats
})

/**
 * The code above is adding a watermark to the top right corner of the image.
 */
alt.setWatermarkPosition(3)
// set belt
/**
 * If the player presses G, toggle the seatbelt on or off.
 * @param key - The key that was pressed.
 * @returns The value of the flag.
 */
alt.on('keydown', (key) => {
    if (key === 71) { 
        if(!localPlayer.vehicle) return;
        if (!belt) {
            natives.setPedConfigFlag(alt.Player.local.scriptID, 32, false); 
            belt = true;        
        } else {
            natives.setPedConfigFlag(alt.Player.local.scriptID, 32, true);         
            belt = false;        
        }        
    }
})