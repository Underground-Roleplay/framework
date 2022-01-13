import * as alt from 'alt-client';

let progressBar;

const drawProgress = (label, time, event) => {
    if (progressBar) return;
    progressBar = new alt.WebView('http://resource/client/html/index.html');
    progressBar.on('ready', () => {
        progressBar.emit('progressBar:start', label, time);
    });
    progressBar.on('progressBar:finished', () => {
        progressBar.destroy();
        progressBar = undefined;
    });
};

alt.on('progressBar:start', drawProgress);
alt.onServer('progressBar:start', drawProgress);
