import Core from 'urp-core';
import * as alt from 'alt-server';

import { CLOTH_STORES } from '../shared/config';

Core.Interactions.createMultipleInteractions(CLOTH_STORES);

alt.onClient('Skinshop:refresh', (source) => {
    alt.emitClient(
        source,
        'Skinshop:UpdateClothes',
        JSON.stringify(Core.Character.getComponentVariations(source))
    );
});

alt.onClient('Skinshop:att', (source, i, component, color, type) => {
    if (type === 'prop') {
        return source.setProp(i, component, color);
    }
    source.setClothes(i, component, color);
});

alt.onClient('Skinshop:Closenobuy', (source, i, component, color) => {
    source.setClothes(i, component, color);
});
alt.onClient('Skinshop:Buy', (source, i, component, color, type) => {
    if (Core.Money.hasFullMoney(source, 250)) {
        source.setClothes(i, component, color);
        if (type === 'prop') {
            if (i === 6)
                return Core.Character.changeProps(
                    source,
                    3,
                    parseInt(component),
                    parseInt(color)
                );
            if (i === 7)
                return Core.Character.changeProps(
                    source,
                    4,
                    parseInt(component),
                    parseInt(color)
                );
            Core.Character.changeProps(
                source,
                i,
                parseInt(component),
                parseInt(color)
            );
        } else {
            Core.Character.changeCloth(source, i, component, color);
        }
        Core.Money.getPayment(source, 250);
        alt.emitClient(
            source,
            'Skinshop:UpdateClothes',
            JSON.stringify(Core.Character.getComponentVariations(source))
        );
        alt.emitClient(source, 'Skinshop:close');
    } else {
        alt.emitClient(source, 'Skinshop:close');
        alt.emitClient(source, 'notify', 'error', 'erro', 'don`t money');
    }
});
