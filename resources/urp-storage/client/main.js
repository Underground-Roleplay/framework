import * as alt from 'alt-client';
import Core from 'urp-core';
let isOpen = false;
let data = {};
alt.onServer('storage:buyStorage', (name, size, price) => {
    data.name = name;
    data.size = size;
    data.price = price;

    Core.Browser.open(
        'http://resources/urp-storage/client/html/index.html',
        true,
        false
    );
    Core.Browser.on('load', () => {
        Core.Browser.emit('storage:load', data);
    });

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
