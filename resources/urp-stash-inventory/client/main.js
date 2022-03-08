import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false;

alt.onServer('Core:Client:UpdateIdentity', () => {
    openIdentity();
});

const openInvy = (type) => {
    Core.Browser.open(
        'http://resources/urp-stash-inventory/client/html/index.html',
        true,
        true
    );
    Core.Browser.on('stash:inventory:requestDataInvetory', () => {
        alt.emitServer('stash:inventory:requestData');
    });

    Core.Browser.on('load', () => {
        alt.emitServer('stash:inventory:requestData');
    });

    Core.Browser.on('stash:inventory:useItem', (data) => {
        alt.emitServer('stash:inventory:useItem', data);
        closeInv();
    });

    Core.Browser.on('stash:inventory:dropItem', (data) => {
        alt.emitServer('stash:inventory:dropItem', data);
    });
    Core.Browser.on('stash:inventory:sendItem', (data) => {
        alt.emitServer('stash:inventory:sendItem', data);
    });
    Core.Browser.on('stash:inventory:transferChest', (item, amount) => {
        alt.emitServer('stash:inventory:transferChest', item, amount);
    });
    Core.Browser.on('stash:inventory:transferInventory', (item, amount) => {
        alt.emitServer('stash:inventory:transferInventory', item, amount);
    });

    alt.toggleGameControls(false);
    isOpen = true;
};

const closeInv = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

let trunk;

alt.onServer('inventory:updateVehicleInventory', (data) => {
    trunk = data;
});

alt.onServer('stash:inventory:requestData', (inventory) => {
    alt.log(inventory, trunk);
    let inv = [];
    let invStash = [];
    inventory.map((item) => {
        if (item != null || item != undefined) {
            if (item.unique) {
                for (let i = 0; i < item.amount; i++) {
                    inv.push(item);
                }
            } else {
                inv.push(item);
            }
        }
    });
    trunk.map((item) => {
        if (item != null || item != undefined) {
            if (item.unique) {
                for (let i = 0; i < item.amount; i++) {
                    invStash.push(item);
                }
            } else {
                invStash.push(item);
            }
        }
    });
    Core.Browser.emit('stash:inventory:dataRequest', inv, invStash);
});

alt.on('keydown', (key) => {
    if (key === 186) {
        openInvy();
        Core.Browser.emit('stash:inventory:open');
    }
    if (key === 27 && isOpen) {
        closeInv();
    }
});
