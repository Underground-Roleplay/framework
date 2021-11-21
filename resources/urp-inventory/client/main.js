import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false

alt.onServer('inventory:open' , (iData) => {
    const data = {
        inventory: iData,
        slots: Core.Config.MaxInvSlots,
        other: undefined,
        maxWeight: Core.Config.MaxWeight,
        ammo: {},
        maxAmmo: 100
    }
    openInventory(data)
})

const openInventory = (data) => {
    Core.Browser.open('http://resources/urp-inventory/client/html/ui.html', true, true)
    Core.Browser.on('inventory:useItem', (inventory, item) => {
        alt.log('use', inventory, item)
    })
    Core.Browser.on('inventory:Notify', (msg, type) => {
        alt.log('notify', msg, type)
    })
    Core.Browser.on('inventory:dropItem', (inventory, item, amount) => {
        alt.log('drop', inventory, item, amount)
    })
    Core.Browser.on('inventory:close', () => {
        closeInventory()
    })
    Core.Browser.on('load', () => {
        Core.Browser.emit('inventory:open', data)
     })
    isOpen = true
}

const closeInventory = () => {
    Core.Browser.close()
    isOpen = false
}


alt.on('keydown', (key) => {
    if(key === 73 && !isOpen) {
        alt.emitServer('inventory:getInventoryData')
    }
    if(key === 27 && isOpen){
        closeInventory()
    }
})