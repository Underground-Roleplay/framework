import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false;

alt.onServer('Core:Client:UpdateIdentity', () => {
    openIdentity();
});

const openInvy = () => {
    Core.Browser.open(
        'http://resources/urp-inventory/client/html/index.html',
        true,
        true
    );
    Core.Browser.on('inventory:requestDataInvetory', () => {
        alt.emitServer('inventory:requestData');
    });

    Core.Browser.on('load', () => {
        alt.emitServer('inventory:requestData');
    });

    Core.Browser.on('inventory:useItem', (data) => {
        alt.emitServer('inventory:useItem', data);
        closeInv();
    });

    Core.Browser.on('inventory:dropItem', (data) => {
        alt.emitServer('inventory:dropItem', data);
    });
    Core.Browser.on('inventory:sendItem', (data) => {
        alt.emitServer('inventory:sendItem', data);
    });

    alt.toggleGameControls(false);
    isOpen = true;
};

const closeInv = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

const requetData = (inventory) => {
    let data = [];
    inventory.map((item) => {
        if (item != null || item != undefined) {
            if (item.unique) {
                for (let i = 0; i < item.amount; i++) {
                    data.push(item);
                }
            } else {
                data.push(item);
            }
        }
    });
    Core.Browser.emit('inventory:dataRequest', data);
};

alt.onServer('inventory:requestData', requetData);

alt.on('keydown', (key) => {
    if (key === 192) {
        openInvy();
        Core.Browser.emit('inventory:open');
    }
    if (key === 27 && isOpen) {
        closeInv();
    }
});
