import Core from 'urp-core';
import * as alt from 'alt-client';

const inventoryView = new alt.WebView('http://resource/client/html/ui.html', false)
let isOpen = false

inventoryView.on('load', () => {
    inventoryView.on('inventory:useItem', (inventory, item) => {
        alt.log('use', inventory, item)
    })
    inventoryView.on('inventory:Notify', (msg, type) => {
        alt.log('notify', msg, type)
    })
    inventoryView.on('inventory:dropItem', (inventory, item, amount) => {
        alt.log('drop', inventory, item, amount)
    })
    inventoryView.on('inventory:close', (inventory, item, amount) => {
        inventoryView.unfocus()
        alt.toggleGameControls(true);
        alt.showCursor(false)
        isOpen = false
    })
})

alt.onServer('inventory:open' , (iData) => {
    const data = {
        inventory: iData,
        slots: Core.Config.MaxInvSlots,
        other: undefined,
        maxWeight: Core.Config.MaxWeight,
        ammo: {},
        maxAmmo: 100
    }
    inventoryView.emit('inventory:open', data)
    inventoryView.focus()
    alt.toggleGameControls(false);
    alt.showCursor(true)
    isOpen = true
})


alt.on('keydown', (key) => {
    if(key === 73 && !isOpen) {
        alt.emitServer('inventory:getInventoryData')
    }
    if(key === 27 && isOpen){
        inventoryView.emit('inventory:close')
        inventoryView.unfocus()
        alt.toggleGameControls(true);
        alt.showCursor(false)
        isOpen = false
    }
})