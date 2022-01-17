import * as alt from 'alt-server';
import Core from 'urp-core';

import { HOMES_INTERACTIONS, HOMES_PRICES } from '../shared/homes';

Core.Interactions.createMultipleInteractions(HOMES_INTERACTIONS);

const getClosestHome = (source) => {
    for (let i = 0; i < HOMES_INTERACTIONS.length; i++) {
        const homePos = new alt.Vector3(
            HOMES_INTERACTIONS[i].x,
            HOMES_INTERACTIONS[i].y,
            HOMES_INTERACTIONS[i].z
        );
        const distanceToHome = source.pos.distanceTo(homePos);
        if (distanceToHome <= 10) {
            return i;
        }
    }
    return false;
};

const tryBuyHome = async (source) => {
    const closestHome = getClosestHome(source);
    if (!closestHome && closestHome !== 0) {
        console.log('you need to be near a home');
        return;
    }
    const { name, maxSlots } = HOMES_INTERACTIONS[closestHome];
    const { buy_price } = HOMES_PRICES[name];
    Core.Homes.buyHome(source, name, maxSlots, buy_price);
};

const enterOwnedHome = async (source) => {
    const closestHome = getClosestHome(source);
    if (!closestHome && closestHome !== 0) {
        console.log('you need to be near a home');
        return;
    }
    const { name, entry } = HOMES_INTERACTIONS[closestHome];
    Core.Homes.enterHome(source, name, entry);
};

const requestAccess = async (source, slot) => {
    const closestHome = getClosestHome(source);
    if (!closestHome && closestHome !== 0) {
        console.log('you need to be near a home');
        return;
    }
    const { name, entry } = HOMES_INTERACTIONS[closestHome];
    Core.Homes.requestAccess(source, name, slot, entry);
};

alt.onClient('homes:buy', tryBuyHome);
alt.onClient('homes:enter', enterOwnedHome);
alt.onClient('homes:request', requestAccess);
