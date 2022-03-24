import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false;

let inventory = [];
let stash = [];
let name;

const openInvy = () => {
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

    Core.Browser.on(
        'stash:inventory:transferChest',
        (item, amount, chestType) => {
            alt.emitServer(
                'stash:inventory:transferChest',
                item,
                amount,
                chestType,
                name
            );
        }
    );
    Core.Browser.on(
        'stash:inventory:transferInventory',
        (item, amount, chestType) => {
            alt.emitServer(
                'stash:inventory:transferInventory',
                item,
                amount,
                chestType,
                name
            );
        }
    );

    Core.Browser.on('stash:inventory:close', () => {
        closeInv();
    });

    alt.toggleGameControls(false);
    isOpen = true;
};

const closeInv = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
    inventory = [];
    stash = [];
};

alt.onServer('homes:chest', () => {
    alt.log('homes:chest');
    alt.emitServer('inventory:requestHomeInventory');
});

alt.on('keydown', (key) => {
    if (key === 186) {
        alt.emitServer('inventory:requestHomeInventory');
    }
});

alt.onServer('inventory:updateChest', (inv, stashHome, cname) => {
    openInvy();
    itemsMap(inv, stashHome);
    name = cname;
    alt.log(name);
    alt.setTimeout(() => {
        Core.Browser.emit(
            'stash:inventory:dataRequest',
            inventory,
            stash,
            'chest'
        );
    }, 150);
});

alt.onServer('inventory:updateHomeInventory', (inv, stashHome) => {
    openInvy();
    itemsMap(inv, stashHome);
    alt.setTimeout(() => {
        Core.Browser.emit(
            'stash:inventory:dataRequest',
            inventory,
            stash,
            'home'
        );
    }, 150);
});
alt.onServer('inventory:updateVehicleInventory', (inv, stashVehice) => {
    openInvy();
    itemsMap(inv, stashVehice);
    alt.setTimeout(() => {
        Core.Browser.emit(
            'stash:inventory:dataRequest',
            inventory,
            stash,
            'vehicle'
        );
    }, 150);
});

const itemsMap = (inv, stashInv) => {
    inventory = [];
    stash = [];
    inv.map((item) => {
        if (item != null || item != undefined) {
            if (item.unique) {
                for (let i = 0; i < item.amount; i++) {
                    inventory.push(item);
                }
            } else {
                inventory.push(item);
            }
        }
    });
    stashInv.map((item) => {
        if (item != null || item != undefined) {
            if (item.unique) {
                for (let i = 0; i < item.amount; i++) {
                    stash.push(item);
                }
            } else {
                stash.push(item);
            }
        }
    });
};
alt.onServer('inventory:updateVehicleInventory', (inv, stashVehice) => {
    itemsMap(inv, stashVehice);
    Core.Browser.emit(
        'stash:inventory:dataRequest',
        inventory,
        stash,
        'vehicle'
    );
});

alt.on('context:vehicle:trunk', (data) => {
    const targetVehicle = alt.Vehicle.getByScriptID(data.entity);
    if (!targetVehicle) return;
    alt.emitServer('stash:inventory:dataRequest:vehicle', targetVehicle);
});
