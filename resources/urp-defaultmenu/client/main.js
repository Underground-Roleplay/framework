import * as alt from 'alt-client';
import Core from 'urp-core';
let isOpen = false;
import { Menu } from '../shared/config';

const closeMenu = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

const openMenu = () => {
    Core.Browser.open(
        'http://resources/urp-defaultmenu/client/html/index.html',
        true,
        true
    );
    Core.Browser.on('defaultMenu:event', (data) => {
        initEvent(data);
    });

    Core.Browser.on('defaultMenu:closeMenu', () => {
        closeMenu();
    });
    alt.toggleGameControls(false);
    isOpen = true;
};

alt.on('keydown', (key) => {
    if (key === 27 && isOpen) {
        closeMenu();
    }
});

alt.on('load:defaultmenu', (menu) => {
    loadMenu(menu);
});

alt.onServer('load:defaultmenu', (menu) => {
    loadMenu(menu);
});
const initEvent = (data) => {
    if (data.isServer) {
        return alt.emitServer(data.eventName, data.value);
    }
    alt.emit(data.eventName, data.value);
};
const loadMenu = (menu) => {
    let data = Menu.find((item) => {
        if (item.identifier == menu) return item;
    });
    if (!isOpen) openMenu();
    alt.setTimeout(() => {
        Core.Browser.emit('load:data', data.options);
    }, 100);
};
