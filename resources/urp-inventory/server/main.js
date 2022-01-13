import Core from 'urp-core';
import * as alt from 'alt-server';

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

// TODO
alt.onClient(
    'inventory:setInventoryData',
    (
        source,
        fromInventory,
        toInventory,
        fromSlot,
        toSlot,
        fromAmount,
        toAmount
    ) => {
        const fromItem = Core.Inventory.getItemBySlot(source, fromSlot);
        const toItem = Core.Inventory.getItemBySlot(source, toSlot);
        //Change Slot from same inventory
        if (fromInventory === toInventory && toInventory !== 'dropzone') {
            // console.log(fromItem, toItem)
            if (toItem) {
                // Remove item from target slot
                Core.Inventory.removeItem(source, toItem.name, toItem.amount);
                // Adds item to target slot
                Core.Inventory.addItem(
                    source,
                    fromItem.name,
                    fromItem.amount,
                    toSlot,
                    fromItem.info
                );
                // Remove to from slot
                Core.Inventory.removeItem(
                    source,
                    fromItem.name,
                    fromItem.amount
                );
                // Adds item to from slot
                Core.Inventory.addItem(
                    source,
                    toItem.name,
                    toItem.amount,
                    fromSlot,
                    toItem.info
                );
                return;
            }
            Core.Inventory.removeItem(source, fromItem.name, fromItem.amount);
            Core.Inventory.addItem(
                source,
                fromItem.name,
                fromItem.amount,
                toSlot,
                fromItem.info
            );
            return;
        }
        //Drop item
        if (fromInventory !== toInventory && toInventory === 'dropzone') {
            Core.Inventory.dropItem(source, fromItem, fromAmount);
        }
        // multiple inventory types such as = player, dropzone, stash
        // if from = to, only removeAdd in same place
    }
);

alt.onClient(
    'inventory:pickupItem',
    (source, droppedItem, toSlot, fromAmount) => {
        Core.Inventory.pickupItem(source, droppedItem, toSlot, fromAmount);
    }
);

alt.onClient('inventory:getInventoryData', (source) => {
    const iData = Core.Functions.getCurrentInventory(source);
    alt.emitClient(source, 'inventory:open', iData);
});

// Ugly code
//    const fromItemData =  Core.Inventory.GetItemBySlot(fromSlot)
//    const fromAmountParsed = parseInt(fromAmount)
//    if (fromInventory === "player" ||  fromInventory === "hotbar" &&
//       toInventory.split('-')[1] == "itemshop" || toInventory == "crafting") return;
//         if (fromInventory == "player"  || fromInventory == "hotbar"){
//             const toItemData =  Core.Inventory.getItemBySlot(source, toSlot)
//             Core.Inventory.removeItem(source, fromItemData.name, fromAmountParsed)
//             // If is a weapon and its equipped unequip
//             // TriggerClientEvent("inventory:client:CheckWeapon", src, fromItemData.name)
//             if(!toItemData){
//                const toAmountParsed = parseInt(toAmount)
//                if (toItemData.name !== fromItemData.name) {
//                   Core.Inventory.removeItem(source, toItemData.name, toAmountParsed)
//                   Core.Inventory.addItem(source, toItemData.name, toAmountParsed, fromSlot, toItemData.info)
//                }
//             }

//         }
