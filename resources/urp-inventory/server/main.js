import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('inventory:getInventoryData', (source) => {
   const iData = Core.Functions.getCurrentInventory(source)
   alt.emitClient(source, 'inventory:open', iData)
})