/// <reference types="@altv/types-client" />
import alt from 'alt';

const url = 'http://resource/client/html/index.html';
const menus = {};

let view;
let data;

alt.on('context:Dismount', handleDismount);
alt.on('context:ParseInteraction', handleInteraction);
alt.on('context:CreateMenu', handleCreateMenu);
alt.on('context:AppendToMenu', handleAppendToMenu);

if (!view) {
    view = new alt.WebView(url);
    view.on('context:Select', handleSelect);
}
const vehicleMenu = {
    identifier: 'vehicle Menu',
        options: [
            { eventName: 'trashcan:engine', isServer: true, name: 'Ligar Motor' },
            { eventName: 'trashcan:Dig', isServer: true, name: 'Tancar' },
            { eventName: 'trashcan:Dig', isServer: true, name: 'Abrir porta-malas' },
        ],
        title: 'Vehicle Options'
            
}
function handleInteraction(type, entity, model, coords) {
    alt.log(`[CONTEXT-INFO] Type: ${type} | ID: ${entity} | Model: ${model} | Coords: ${JSON.stringify(coords)}`);

    data = {
        type,
        entity,
        model,
        coords
    };
    if(type === "vehicle"){
        view.focus();
        showCursor(true);
        const cursor = alt.getCursorPos();
        view.emit('context:Mount', vehicleMenu, cursor.x, cursor.y)
        return;
    }

    if (!menus[model]) {
        return;
    }
    
    
    view.focus();
    showCursor(true);
    const cursor = alt.getCursorPos();
    view.emit('context:Mount', menus[model], cursor.x, cursor.y);
    return;
}

function handleCreateMenu(model, title) {
    if (menus[model]) {
        alt.log(`[CONTEXT-ERROR] Model ${model} is already in use for entity/model ${model}.`);
        return;
    }

    alt.log(`[CONTEXT-SUCCESS] Model ${model} is now bound. Title: ${title}`);
    menus[model] = {
        title,
        options: []
    };
}

function handleAppendToMenu(model, contextOptionName, eventCallbackName, isServer = false) {
    if (!menus[model]) {
        alt.log(`[CONTEXT-ERROR] Identifier ${identifier} not found.`);
        return;
    }

    alt.log(`[CONTEXT-SUCCESS] Appended ${contextOptionName} to model ${model}.`);
    menus[model].options.push({ name: contextOptionName, eventName: eventCallbackName, isServer });
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

    view.emit('context:Dismount');
    view.unfocus();
    showCursor(false);
}

function handleSelect(eventName, isServer) {
    handleDismount();
    if (isServer) {
        alt.emitServer(eventName, data);
        return;
    }

    alt.emit(eventName, data);
}

alt.emit('context:Ready');
