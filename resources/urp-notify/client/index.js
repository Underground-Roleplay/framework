import * as alt from 'alt';
import * as natives from 'natives';

const view = new alt.WebView('http://resource/client/html/index.html');

alt.on('notify', (type, tittle, message) => {
    view.emit('notify', type, tittle, message);
    natives.playSoundFrontend(
        -1,
        'Menu_Accept',
        'Phone_SoundSet_Default',
        false
    );
});

alt.onServer('notify', (type, tittle, message) => {
    view.emit('notify', type, tittle, message);
    natives.playSoundFrontend(
        -1,
        'Menu_Accept',
        'Phone_SoundSet_Default',
        false
    );
});

alt.on('alert', () => {
    natives.playSoundFrontend(
        -1,
        'Menu_Accept',
        'Phone_SoundSet_Default',
        false
    );
});

alt.onServer('alert', () => {
    natives.playSoundFrontend(
        -1,
        'Menu_Accept',
        'Phone_SoundSet_Default',
        false
    );
});

let activePrompts = [];
alt.onServer('notifyCenter', (id, type, message, time) => {
    const timer = alt.setTimeout(() => {
        activePrompts.splice(0, 1);
        //    alt.emitServer('notifyCenter:resolve', id, false)
    }, time);
    const newPrompt = { id: id, deleteTimer: timer };
    const pid = activePrompts.push(newPrompt) - 1;

    view.emit('notifyCenter', type, message, time);
    natives.playSoundFrontend(
        -1,
        'Menu_Accept',
        'Phone_SoundSet_Default',
        false
    );
});

alt.on('notifyCenter', (id, type, message, time) => {
    const timer = alt.setTimeout(() => {
        activePrompts.splice(0, 1);
        // alt.emitServer('notifyCenter:resolve', id, false)
    }, time);
    const newPrompt = { id: id, deleteTimer: timer };
    const pid = activePrompts.push(newPrompt) - 1;

    view.emit('notifyCenter', type, message, time);
    natives.playSoundFrontend(
        -1,
        'Menu_Accept',
        'Phone_SoundSet_Default',
        false
    );
});

alt.on('keydown', (key) => {
    if (activePrompts.length - 1 < 0) return;
    if (key === 89) {
        const id = activePrompts.length - 1;
        console.log(id, 'true');
        if (activePrompts[id] && activePrompts[id].deleteTimer) {
            alt.clearTimeout(activePrompts[id].deleteTimer);
        }
        alt.emitServer('notifyCenter:resolve', activePrompts[id].id, true);
        delete activePrompts[id];
    }
    if (key === 85) {
        const id = activePrompts.length - 1;
        console.log(id, 'false');
        if (activePrompts[id] && activePrompts[id].deleteTimer) {
            alt.clearTimeout(activePrompts[id].deleteTimer);
        }
        alt.emitServer('notifyCenter:resolve', activePrompts[id].id, false);
        delete activePrompts[id];
    }
});
