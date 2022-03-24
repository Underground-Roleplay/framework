import * as alt from 'alt-server';
import Core from 'urp-core';

import { CHESTS_INTERACTIONS, CHESTS_PRICES } from '../shared/chests';

Core.Interactions.createMultipleInteractions(CHESTS_INTERACTIONS);

const getClosestHome = (source) => {
    for (let i = 0; i < CHESTS_INTERACTIONS.length; i++) {
        const homePos = new alt.Vector3(
            CHESTS_INTERACTIONS[i].x,
            CHESTS_INTERACTIONS[i].y,
            CHESTS_INTERACTIONS[i].z
        );
        const distanceToHome = source.pos.distanceTo(homePos);
        if (distanceToHome <= 6) {
            return i;
        }
    }
    return false;
};

alt.on('storage:open', (source) => {
    const closestHome = getClosestHome(source);
    if (!closestHome && closestHome !== 0) {
        return;
    }
    const { name } = CHESTS_INTERACTIONS[closestHome];
    const { buy_price } = CHESTS_PRICES[name];

    Core.Inventory.tryOpenChest(source, name, buy_price);
});

alt.onClient('storage:buy', (source) => {
    const closestHome = getClosestHome(source);
    if (!closestHome && closestHome !== 0) {
        return;
    }
    const { name } = CHESTS_INTERACTIONS[closestHome];
    const { buy_price } = CHESTS_PRICES[name];
    if (Core.Money.hasFullMoney(source, buy_price)) {
        Core.Money.getFullPayment(source, buy_price);
        Core.Inventory.buyStorage(source, name);
    }
});
