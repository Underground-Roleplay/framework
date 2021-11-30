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
    const data = {
        hud: true,
        pauseMenu: natives.isPauseMenuActive(),
        armour: localPlayer.armour,
        health: localPlayer.health,
        food: Core.Functions.getMetaData('food'),
        thirst: Core.Functions.getMetaData('thirst'),
        stress: Core.Functions.getMetaData('localStress'),
        playerid: 0,
        fuel: 100,
        hudPosition: 'right',
        fuelPosition: undefined
    }
    hud.emit('hud:Tick', data)
}, 1000)