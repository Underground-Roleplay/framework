import * as natives from 'natives';
import * as alt from 'alt-client';

import Core from 'urp-core';

let isLogged = false;

let hud;

const localPlayer = alt.Player.local;

alt.onServer('Core:Client:CharacterLoaded', () => {
    hud = new alt.WebView('http://resource/client/html/ui.html');
    isLogged = true;
})

alt.setInterval(()=> {
    if(!isLogged) return;
    let hudPos = 'left'
    if(!localPlayer.vehicle){
        natives.displayRadar(false)
        hudPos = 'left'
    }else{
        natives.displayRadar(true)
        hudPos = 'right'
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
        fuel: undefined,
        hudPosition: hudPos,
        fuelPosition: undefined
    }
    hud.emit('hud:Tick', data)
}, 1000)