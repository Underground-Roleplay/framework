import Core from 'urp-core';
import * as alt from 'alt-server';


alt.onClient('inventory:useItem', (source, item) => {
   if(item.type === 'weapon'){
      Core.Inventory.useWeapon(source, item.name)
      return;
   }
   if(Core.Inventory.isUseableItem(item.name)){
      Core.Inventory.triggerItemEvent(source, item)
   }
   Core.Inventory.removeItem(source, item.name, 1)
})

// TODO
alt.onClient('inventory:setInventoryData', (source, fromInventory, toInventory, fromSlot, toSlot, 
   fromAmount, toAmount) => {
      //Change Slot from same inventory
      if(fromInventory === toInventory && toInventory !== 'dropzone'){

      }
      // multiple inventory types such as = player, dropzone, stash
      // if from = to, only removeAdd in same place
})

alt.onClient('inventory:dropItem', (source, item, amount) => {
   console.log('drop', item)
   Core.Inventory.removeItem(source, item, amount)
})

alt.onClient('inventory:getInventoryData', (source) => {
   const iData = Core.Functions.getCurrentInventory(source)
   alt.emitClient(source, 'inventory:open', iData)
})


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