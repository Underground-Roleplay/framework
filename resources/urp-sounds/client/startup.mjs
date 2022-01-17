import * as alt from 'alt';

var audioengine = new alt.WebView('http://resource/client/index.html');
audioengine.unfocus();

alt.onServer('playHowl2d', (audiopath, volume) => {
    //from server
    audioengine.emit('playHowl2d', audiopath, volume);
});

alt.on('playHowl2d', (audiopath, volume) => {
    //from client
    audioengine.emit('playHowl2d', audiopath, volume);
});
