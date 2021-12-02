import Core from 'urp-core';
import * as alt from 'alt-server';


alt.onClient('inventory:useItem', (source, item) => {
   if(Core.Inventory.isUseableItem(item.name)){
      Core.Inventory.triggerItemEvent(source, item)
   }
   Core.Inventory.removeItem(source, item.name, 1)
})

alt.onClient('inventory:dropItem', (source, item, amount) => {
   console.log('drop', item)
   Core.Inventory.removeItem(source, item, amount)
})


alt.onClient('inventory:getInventoryData', (source) => {
   const iData = Core.Functions.getCurrentInventory(source)
   alt.emitClient(source, 'inventory:open', iData)
})