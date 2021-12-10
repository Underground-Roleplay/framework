import db from 'mysql2-wrapper';
import Core from 'urp-core';
import * as alt from 'alt-server';
import * as chat from 'urp-chat';

import { DEALERSHIP_LIST } from '../shared/config';
Core.Interactions.createMultipleInteractions(DEALERSHIP_LIST)

alt.onClient('Skinshop:refresh', (source, ) => {
    alt.emitClient(source, 'Skinshop:UpdateClothes', JSON.stringify(Core.Character.getComponentVariations(source)))
})

alt.onClient('Skinshop:att', (source, i, component, color) => {
    source.setClothes(i, component, color)
})

alt.onClient('Skinshop:Closenobuy', (source, i, component, color) => {
    source.setClothes(i, component, color)
})
alt.onClient('Skinshop:Buy', (source, i, component, color) => {
    let money = Core.Character.getMoney(source)

    if (money.cash > 2750) {
        source.setClothes(i, component, color)
        Core.Character.changeCloth(source, i, component, color)
        Core.Character.getPayment(source, 250)
        alt.emitClient(source, 'Skinshop:UpdateClothes', JSON.stringify(Core.Character.getComponentVariations(source)))
        alt.emitClient(source, 'Skinshop:close')

    } else {
        alt.emitClient(source, 'Skinshop:close')
        alt.emitClient(source, 'notify', 'error', 'erro', 'don`t money')
    }

})