import Core from 'urp-core';
import * as alt from 'alt-server';


alt.onClient('inventory:useItem', (source, item) => {
   console.log('used', item)
   Core.Inventory.removeItem(source, item, 1)
})

alt.onClient('inventory:dropItem', (source, item, amount) => {
   console.log('drop', item)
   Core.Inventory.removeItem(source, item, amount)
})


alt.onClient('inventory:getInventoryData', (source) => {
   const iData = Core.Functions.getCurrentInventory(source)
   alt.emitClient(source, 'inventory:open', iData)
})