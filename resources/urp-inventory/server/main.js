import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('inventory:requestData', (source) => {
    alt.emitClient(
        source,
        'inventory:requestData',
        Core.Inventory.getCurrentInventory(source)
    );
});

alt.onClient('inventory:CurrentWeight', (source) => {
    alt.emitClient(
        source,
        'inventory:CurrentWeight',
        Core.Inventory.getCurrentWeight(
            Core.Inventory.getCurrentInventory(source)
        )
    );
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

alt.onClient('inventory:dropItem', (source, item) => {
    Core.Inventory.dropItem(source, item.name, item.amount);
});

alt.onClient('inventory:sendItem', (source, item) => {
    Core.Inventory.sendItem(source, item.name, item.amount);
});
