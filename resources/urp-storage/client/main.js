import * as alt from 'alt-client';
import Core from 'urp-core';
let isOpen = false;
alt.onServer('storage:buyStorage', () => {
    alt.log('aqui');
    Core.Browser.open(
        'http://resources/urp-storage/client/html/index.html',
        true,
        false
    );
    Core.Browser.on('storage:closeMenu', () => {
        closeMenu();
    });
    Core.Browser.on('storage:buy', () => {
        closeMenu();
        alt.emitServer('storage:buy');
    });

    alt.toggleGameControls(false);
    isOpen = true;
});

const closeMenu = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};
