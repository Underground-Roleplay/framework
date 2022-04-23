/// <reference types="@altv/types-client" />
import alt from 'alt';
import Core from 'urp-core';
import * as native from 'natives';

const url = 'http://resource/client/html/index.html';
const menus = {};

// import {
//     VEHICLE_MENU,
//     POLICE_MENU,
//     PLAYER_MENU,
//     PERSONAL_MENU,
//     AMBULANCE_MENU,
//     MECHANIC_MENU,
// } from '../shared/config';

import { itemsList } from '../shared/config';

let view;
let data;

alt.on('context:Dismount', handleDismount);
alt.on('context:ParseInteraction', handleInteraction);
alt.on('context:CreateMenu', handleCreateMenu);
alt.on('context:AppendToMenu', handleAppendToMenu);

const openWheel = (data, entityDate) => {
    const items = itemsList.find((item) => {
        if (item.index === data) return item;
    });
    let menu = items.items;
    openWheelMenu(menu, entityDate);
};
let wheelnavOpen = false;
const openWheelMenu = (data, entityDate) => {
    if (wheelnavOpen != true) {
        view = new alt.WebView('http://resource/client/html/index.html');
        view.on('CEFLoaded', (e) => {
            alt.nextTick(() => {
                view.emit('createWheel', data, entityDate);
                view.focus();
                showCursor(true);
                wheelnavOpen = true;
                alt.everyTick(() => {
                    if (wheelnavOpen) {
                        disableActions();
                    }
                });
                native.freezeEntityPosition(alt.Player.local.scriptID, true);
                view.on('destroy', () => {
                    destroyMenu();
                });
                view.on('emitEvent', (data, entityDate) => {
                    handleSelect(data, entityDate);
                });
            });
        });
    }
};

const destroyMenu = () => {
    showCursor(false);

    wheelnavOpen = false;
    view.destroy();
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
};

const disableActions = () => {
    native.disableControlAction(0, 1, true); //Camera
    native.disableControlAction(0, 2, true); //Camera

    native.disableControlAction(0, 12, true); //Weapon
    native.disableControlAction(0, 13, true); //Weapon
    native.disableControlAction(0, 14, true); //Weapon
    native.disableControlAction(0, 15, true); //Weapon
    native.disableControlAction(0, 16, true); //Weapon
    native.disableControlAction(0, 17, true); //Weapon

    native.disableControlAction(0, 24, true); //Left Mouse
    native.disableControlAction(0, 25, true); //Right Mouse

    native.disableControlAction(0, 37, true); //TAB

    native.disableControlAction(0, 157, true); //Weapon Taste: 1
    native.disableControlAction(0, 158, true); //Weapon Taste: 2
    native.disableControlAction(0, 160, true); //Weapon Taste: 3
    native.disableControlAction(0, 164, true); //Weapon Taste: 4
    native.disableControlAction(0, 165, true); //Weapon Taste: 5
    native.disableControlAction(0, 159, true); //Weapon Taste: 6
    native.disableControlAction(0, 161, true); //Weapon Taste: 7
    native.disableControlAction(0, 162, true); //Weapon Taste: 8
    native.disableControlAction(0, 163, true); //Weapon Taste: 9

    native.disablePlayerFiring(alt.Player.local.scriptID, false);
};

alt.on('context:vehicle:trunk', (i, data) => {
    const targetVehicle = alt.Vehicle.getByScriptID(data);
    if (!targetVehicle) return;
    alt.emitServer('stash:inventory:dataRequest:vehicle', targetVehicle);
});

function handleInteraction(type, entity, model, coords) {
    if (alt.Player.local.getSyncedMeta('HasHandcuffs')) return;
    let job = Core.Functions.getJobInfo('name');

    alt.log(
        `[CONTEXT-INFO] Type: ${type} | ID: ${entity} | Model: ${model} | Coords: ${JSON.stringify(
            coords
        )}`
    );

    data = {
        type,
        entity,
        model,
        coords,
    };
    if (type === 'vehicle') {
        //view.focus();
        showCursor(true);

        if (job === 'mechanic') return openWheel('mechanic', entity);

        return openWheel('vehicle', entity);
    }
    if (type === 'player') {
        showCursor(true);

        if (job === 'police') return openWheel('police', entity);

        if (job === 'ambulance') return openWheel('ambulance', entity);
    }

    if (type === 'self') {
        showCursor(true);

        return openWheel('self', entity);
    }

    if (!menus[model]) {
        return;
    }

    showCursor(true);

    return openWheel(model, entity);
}

function handleCreateMenu(model, title) {
    if (menus[model]) {
        alt.log(
            `[CONTEXT-ERROR] Model ${model} is already in use for entity/model ${model}.`
        );
        return;
    }

    alt.log(`[CONTEXT-SUCCESS] Model ${model} is now bound. Title: ${title}`);
    menus[model] = {
        title,
        options: [],
    };
}

function handleAppendToMenu(
    model,
    contextOptionName,
    eventCallbackName,
    isServer = false
) {
    if (!menus[model]) {
        alt.log(`[CONTEXT-ERROR] Identifier ${identifier} not found.`);
        return;
    }

    alt.log(
        `[CONTEXT-SUCCESS] Appended ${contextOptionName} to model ${model}.`
    );
    menus[model].options.push({
        name: contextOptionName,
        eventName: eventCallbackName,
        isServer,
    });
}

function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) {
        return;
    }
}

function handleDismount() {
    if (!view) {
        return;
    }
    wheelnavOpen = false;

    // view.emit('context:Dismount');
    // view.unfocus();
    showCursor(false);
    alt.toggleGameControls(true);
}

const handleSelect = (data, entityDate) => {
    data = JSON.parse(decodeURIComponent(data));
    if (data.type === 'client') {
        alt.emit(data.name, data.params, entityDate);
    } else {
        alt.emitServer(data.name, data.params, entityDate);
    }
    handleDismount();
};

alt.emit('context:Ready');
