import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('stash:inventory:dataRequest:vehicle', async (source, vehicle) => {
    Core.Inventory.getVehicleInventory(source, vehicle);
});

alt.onClient(
    'stash:inventory:transferChest',
    (source, item, amount, chestType, name) => {
        switch (chestType) {
            case 'home':
                if (Core.Inventory.removeItem(source, item, amount)) {
                    Core.Inventory.transferChest(source, item, amount);
                    break;
                }
            case 'chest':
                if (Core.Inventory.removeItem(source, item, amount, name)) {
                    Core.Inventory.transferChest(source, item, amount, name);
                    break;
                }
            case 'vehicle':
                if (Core.Inventory.removeItem(source, item, amount)) {
                    Core.Inventory.transferVehicle(source, item, amount);
                    break;
                }
            default:
                break;
        }
    }
);

alt.onClient(
    'stash:inventory:transferInventory',
    (source, item, amount, chestType, name) => {
        switch (chestType) {
            case 'home':
                if (Core.Inventory.addItem(source, item, amount)) {
                    Core.Inventory.removeItemChest(source, item, amount);
                }
                break;
            case 'chest':
                if (Core.Inventory.addItem(source, item, amount, name)) {
                    Core.Inventory.removeItemChest(source, item, amount, name);
                }
                break;
            case 'vehicle':
                if (Core.Inventory.addItem(source, item, amount)) {
                    Core.Inventory.removeItemVehicle(source, item, amount);
                }
                break;
            default:
                break;
        }
    }
);
alt.onClient('inventory:requestHomeInventory', (source) => {
    Core.Inventory.getHomeInventory(source);
});

alt.onClient('inventory:requestHomeInventory', (source) => {
    Core.Inventory.getHomeInventory(source);
});

//Core.Inventory.getItemInfos
