
import * as alt from 'alt';
import * as natives from 'natives';

const view = new alt.WebView('http://resource/client/html/index.html');

alt.on('notify', (type, tittle, message) => {
    view.emit('notify', type, tittle, message);
    natives.playSoundFrontend(-1,"Menu_Accept","Phone_SoundSet_Default",false);
});

alt.onServer('notify', (type, tittle, message) => {
    view.emit('notify', type, tittle, message);
    natives.playSoundFrontend(-1,"Menu_Accept","Phone_SoundSet_Default",false);
});

alt.on('alert', () => {
    natives.playSoundFrontend(-1,"Menu_Accept","Phone_SoundSet_Default",false);
});

alt.onServer('alert', () => {
    natives.playSoundFrontend(-1,"Menu_Accept","Phone_SoundSet_Default",false);
});

alt.onServer('notifyCenter', (type, message , time) => {
    view.emit('notifyCenter', type, message, time);
    natives.playSoundFrontend(-1,"Menu_Accept","Phone_SoundSet_Default",false);
});
alt.on('notifyCenter', (type, message , time) => {
    view.emit('notifyCenter', type, message, time);
    natives.playSoundFrontend(-1,"Menu_Accept","Phone_SoundSet_Default",false);
});