import Core from 'urp-core';
import chat from 'urp-chat';
import * as alt from 'alt-client';

let isOpen = false;

const openInventory = (data) => {
    Core.Browser.open(
        'http://resources/urp-inventory/client/html/ui.html',
        true,
        true
    );
    Core.Browser.on('inventory:useItem', (inventory, item) => {
        alt.log('use');
        alt.emitServer('inventory:useItem', item);
    });
    Core.Browser.on('inventory:Notify', (msg, type) => {
        alt.log('notify', msg, type);
    });
    Core.Browser.on('inventory:dropItem', (inventory, item, amount) => {
        alt.log('drop');
        alt.emitServer('inventory:dropItem', item.name, amount);
    });
    Core.Browser.on('inventory:close', () => {
        closeInventory();
    });
    Core.Browser.on(
        'inventory:setInventoryData',
        (
            fromInventory,
            toInventory,
            fromSlot,
            toSlot,
            fromAmount,
            toAmount
        ) => {
            if (fromInventory === 'dropzone') {
                const nearItems = Core.Functions.getCloseItems();
                const droppedItem = nearItems.inventory.find(
                    (i) => i.slot === parseInt(fromSlot)
                );
                if (!droppedItem) return;
                alt.emitServer(
                    'inventory:pickupItem',
                    droppedItem,
                    toSlot,
                    fromAmount
                );
                return;
            }
            alt.emitServer(
                'inventory:setInventoryData',
                fromInventory,
                toInventory,
                fromSlot,
                toSlot,
                fromAmount,
                toAmount
            );
        }
    );
    Core.Browser.on('load', () => {
        Core.Browser.emit('inventory:open', data);
    });
    alt.toggleGameControls(false);
    isOpen = true;
};

const closeInventory = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

const updateInventory = (iData, isError) => {
    const data = {
        inventory: iData,
        slots: Core.Config.MaxInvSlots,
        maxWeight: Core.Config.MaxWeight,
        error: isError,
    };
    Core.Browser.emit('inventory:update', data);
};

const hotKeys = [49, 50, 51, 52, 53];

alt.on('keydown', (key) => {
    if (
        key === 73 &&
        !isOpen &&
        !Core.Browser.getCurrentViewState() &&
        !alt.Player.local.isDead &&
        !alt.isMenuOpen() &&
        !chat.isChatOpen()
    ) {
        const inventory = Core.Functions.getPlayerData('inventory');
        const nearItems = Core.Functions.getCloseItems();
        console.log('dropped???', nearItems);
        const data = {
            inventory: inventory,
            slots: Core.Config.MaxInvSlots,
            other: nearItems,
            maxWeight: Core.Config.MaxWeight,
            ammo: {},
            maxAmmo: 100,
        };
        openInventory(data);
    }
    if (key === 27 && isOpen) {
        closeInventory();
    }
    //Inventory hotkeys setup
    if (hotKeys.includes(key)) {
        const inventory = Core.Functions.getPlayerData('inventory');
        const keyIndex = hotKeys.indexOf(key);
        const item = inventory[keyIndex];
        if (!item) return;
        alt.emitServer('inventory:useItem', item);
    }
});
