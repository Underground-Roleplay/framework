import Core from 'urp-core';
import chat from 'urp-chat';
import * as alt from 'alt-client';

let isOpen = false

const openInventory = (data) => {
    Core.Browser.open('http://resources/urp-inventory/client/html/ui.html', true, true)
    Core.Browser.on('inventory:useItem', (inventory, item) => {
        alt.log('use')
        alt.emitServer('inventory:useItem', item)
    })
    Core.Browser.on('inventory:Notify', (msg, type) => {
        alt.log('notify', msg, type)
    })
    Core.Browser.on('inventory:dropItem', (inventory, item, amount) => {
        alt.log('drop')
        alt.emitServer('inventory:dropItem', item.name, amount)
    })
    Core.Browser.on('inventory:close', () => {
        closeInventory()
    })
    Core.Browser.on('load', () => {
        Core.Browser.emit('inventory:open', data)
     })
    alt.toggleGameControls(false)
    isOpen = true
}

const closeInventory = () => {
    Core.Browser.close()
    alt.toggleGameControls(true)
    isOpen = false
}

const updateInventory = (iData, isError) => {
    const data = {
        inventory: iData,
        slots: Core.Config.MaxInvSlots,
        maxWeight: Core.Config.MaxWeight,
        error: isError
    }
    Core.Browser.emit('inventory:update', data)
}


alt.on('keydown', (key) => {
    if(key === 73 && !isOpen && !alt.Player.local.webViewOpen && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        const inventory = Core.Functions.getPlayerData('inventory')
        const data = {
            inventory: inventory,
            slots: Core.Config.MaxInvSlots,
            other: undefined,
            maxWeight: Core.Config.MaxWeight,
            ammo: {},
            maxAmmo: 100
        }
        openInventory(data)
    }
    if(key === 27 && isOpen){
        closeInventory()
    }
})