import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false;
let activedSlots = [];
const hotKeys = [49, 50, 51];

alt.onServer('Core:Client:UpdateIdentity', () => {
    openIdentity();
});

const openInvy = (type) => {
    Core.Browser.open(
        'http://resources/urp-inventory/client/html/ui.html',
        true,
        true
    );

    Core.Browser.on('load', () => {
        alt.emitServer('inventory:requestData');
    });

    Core.Browser.on('inventory:requestDataInvetory', () => {
        alt.emitServer('inventory:requestData');
    });

    Core.Browser.on('inventory:useItem', (data) => {
        alt.emitServer('inventory:useItem', data);
    });
    Core.Browser.on('inventory:dropItem', (data) => {
        alt.emitServer('inventory:dropItem', data);
    });
    Core.Browser.on('inventory:sendItem', (data) => {
        alt.emitServer('inventory:sendItem', data);
    });
    Core.Browser.on('inventory:removeItemChest', (item, amount) => {
        alt.emitServer('inventory:removeItemChest', item, amount);
    });

    Core.Browser.on('inventory:transferChest', (item, amount, chestType) => {
        alt.emitServer('inventory:transferChest', item, amount, chestType);
        console.log('inventory:transferChest', item, amount, chestType);
    });
    Core.Browser.on(
        'inventory:transferInventory',
        (item, amount, chestType) => {
            alt.emitServer(
                'inventory:transferInventory',
                item,
                amount,
                chestType
            );
            console.log('inventory:transferInventory', item, amount, chestType);
        }
    );
    Core.Browser.on('inventory:transferActived', (item, slot) => {
        alt.emitServer('inventory:transferActived', item, slot);
    });
    Core.Browser.on('inventory:transfer:activedInventory', (item, slot) => {
        alt.emitServer('inventory:transfer:activedInventory', item, slot);
    });

    alt.toggleGameControls(false);
    isOpen = true;
};

const closeInv = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

const requetData = (inventory, actived) => {
    Core.Browser.emit('inventory:dataRequest', inventory, actived);
    activedSlots = actived;
};

alt.onServer('inventory:requestData', requetData);

const requetDataHome = (data) => {
    console.log('load: ', 'dataHomeRequest');
    Core.Browser.emit('inventory:dataHomeRequest', data);
};

alt.onServer('inventory:updateHomeInventory', requetDataHome);

const requetDataVehice = (data) => {
    openInvy('vehicle');
    setTimeout(() => {
        Core.Browser.emit('inventory:dataVehiceRequest', data);
    }, 150);
};

alt.onServer('inventory:updateVehicleInventory', requetDataVehice);

const requetDataChest = (data) => {
    console.log('load: ', 'dataChestRequest');
    Core.Browser.emit('inventory:dataChestRequest', data);
};

alt.onServer('inventory:updateChest', requetDataChest);

alt.on('keydown', (key) => {
    if (key === 186) {
        openInvy();
    }
    if (key === 27 && isOpen) {
        closeInv();
    }
    if (key === 221) {
        openInvy();
        setTimeout(() => {
            alt.emitServer('inventory:requestHomeInventory', 1);
        }, 150);
    }
    if (key === 220) {
        openInvy();
        setTimeout(() => {
            alt.emitServer('inventory:requestChest', 1);
        }, 150);
    }
    if (hotKeys.includes(key) && !isOpen) {
        const keyIndex = hotKeys.indexOf(key);
        const item = activedSlots[keyIndex];
        if (!item) return;
        alt.emitServer('inventory:useItem', item);
    }
});

alt.on('context:vehicle:trunk', (data) => {
    const targetVehicle = alt.Vehicle.getByScriptID(data.entity);
    alt.emitServer('inventory:accessVehTrunk', targetVehicle);
});
