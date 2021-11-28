
import * as alt from 'alt';
import * as natives from 'natives';

const view = new alt.WebView('http://resource/client/html/index.html');

alt.on('notify', (type, tittle, message) => {
    alt.log('aqui')
    view.emit('notify', type, tittle, message);
    natives.playSoundFrontend(-1,"Menu_Accept","Phone_SoundSet_Default",false);
});

alt.onServer('notify', (type, tittle, message) => {
    view.emit('notify', type, tittle, message);
    natives.playSoundFrontend(-1,"Menu_Accept","Phone_SoundSet_Default",false);
});