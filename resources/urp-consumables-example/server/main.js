import * as alt from 'alt-server';
import Core from 'urp-core';

Core.Inventory.createUseableItem('water_bottle', 'consumables:drink', false)
Core.Inventory.createUseableItem('sandwich', 'consumables:eat', false)

Core.Inventory.createUseableItem('armor', 'consumables:useArmor', true)

alt.on('consumables:useArmor', (source, item) => {
    source.armour = 100
})