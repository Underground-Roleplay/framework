import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('stash:inventory:requestData', (source) => {
    const closestVeh = alt.Vehicle.all.find(
        (targetVehicle) => source.pos.distanceTo(targetVehicle.pos) < 3.5
    );
    Core.Inventory.getVehicleInventory(source, closestVeh);
    alt.emitClient(
        source,
        'stash:inventory:requestData',
        Core.Inventory.getCurrentInventory(source)
    );
});

alt.onClient('stash:inventory:useItem', (source, item) => {
    if (item.type === 'weapon') {
        Core.Inventory.useWeapon(source, item.name);
        return;
    }
    if (Core.Inventory.isUseableItem(item.name)) {
        Core.Inventory.triggerItemEvent(source, item);
    }
    Core.Inventory.removeItem(source, item.name, 1);
});

alt.onClient('stash:inventory:dropItem', (source, item) => {
    Core.Inventory.dropItem(source, item.name, item.amount);
});
alt.onClient('stash:inventory:sendItem', (source, item) => {
    Core.Inventory.sendItem(source, item.name, item.amount);
});

alt.onClient('stash:inventory:transferChest', (source, item, amount) => {
    alt.log(item, amount);

    if (Core.Inventory.removeItem(source, item, amount)) {
        Core.Inventory.transferVehicle(source, item, amount);
    }
});

alt.onClient('stash:inventory:transferInventory', (source, item, amount) => {
    alt.log(item, amount);
    if (Core.Inventory.removeItemVehicle(source, item, amount)) {
        Core.Inventory.addItem(source, item, amount);
    }
});
