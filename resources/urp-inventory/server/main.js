import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('inventory:requestHomeInventory', async (source, id) => {
    Core.Inventory.getHomeInventory(source, id);
});
alt.onClient('inventory:requestChest', async (source, id) => {
    Core.Inventory.getChest(source, id);
});

alt.onClient('inventory:requestData', (source) => {
    alt.emitClient(
        source,
        'inventory:requestData',
        Core.Inventory.getCurrentInventory(source),
        Core.Inventory.getInventoryActived(source)
    );
});

alt.onClient('context:vehicle:trunk', async (source, data) => {
    Core.Inventory.getVehicleInventory(source, data);
});

alt.onClient('inventory:sendItem', (source, item) => {
    Core.Inventory.sendItem(source, item.name, 1);
});

alt.onClient('inventory:dropItem', (source, item) => {
    Core.Inventory.dropItem(source, item.name, item.amount);
});
alt.onClient('inventory:useItem', (source, item) => {
    if (item.type === 'weapon') {
        Core.Inventory.useWeapon(source, item.name);
        return;
    }
    if (Core.Inventory.isUseableItem(item.name)) {
        Core.Inventory.triggerItemEvent(source, item);
    }
    Core.Inventory.removeItem(source, item.name, 1);
});

alt.onClient('inventory:transfer:activedInventory', (source, item, slot) => {
    if (Core.Inventory.removeItemActived(source, item, slot)) {
        Core.Inventory.addItem(source, item, 1);
    }
});

alt.onClient('inventory:transferActived', (source, item, slot) => {
    console.log('inventory:transferActived');
    if (Core.Inventory.removeItem(source, item, 1)) {
        Core.Inventory.addItemActived(source, item, slot);
    }
});

alt.onClient('inventory:transferChest', (source, item, amount, chestType) => {
    console.log('inventory:transferChest', item, amount, chestType);
    switch (chestType) {
        case 'home':
            if (Core.Inventory.removeItem(source, item, amount)) {
                Core.Inventory.transferChest(source, item, amount);
            }
            break;
        case 'chest':
            if (Core.Inventory.removeItem(source, item, amount)) {
                Core.Inventory.transferChest(source, item, amount);
            }
            break;
        case 'vehicle':
            if (Core.Inventory.removeItem(source, item, amount)) {
                Core.Inventory.transferVehicle(source, item, amount);
            }
            break;
        default:
            break;
    }
});

alt.onClient(
    'inventory:transferInventory',
    (source, item, amount, chestType) => {
        console.log('inventory:transferInventory', item, amount, chestType);
        switch (chestType) {
            case 'home':
                if (Core.Inventory.removeItemChest(source, item, amount)) {
                    Core.Inventory.addItem(source, item, amount);
                }
                break;
            case 'chest':
                if (Core.Inventory.removeItemChest(source, item, amount)) {
                    Core.Inventory.addItem(source, item, amount);
                }
                break;
            case 'vehicle':
                if (Core.Inventory.removeItemVehicle(source, item, amount)) {
                    Core.Inventory.addItem(source, item, amount);
                }
                break;
            default:
                break;
        }
    }
);
