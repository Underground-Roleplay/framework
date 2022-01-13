import * as alt from 'alt-client';
import Core from 'urp-core';

alt.onServer('consumables:drink', (item) => {
    const dict = 'amb@world_human_drinking@beer@male@idle_a';
    const anim = 'idle_a';
    let prop;
    let value;
    let itemtype;
    switch (item.name) {
        case 'water_bottle':
            prop = 'ba_prop_club_water_bottle';
            value = 20;
            itemtype = 'drinking';
            break;
    }
    Core.Functions.playAnim(dict, anim, 5000, 49, { name: prop, hand: 28422 });
    alt.emit('progressBar:start', itemtype, 5000);
    alt.setTimeout(() => {
        Core.Functions.stopAnim();
        alt.emitServer('consumable:addHungerThirst', itemtype, value);
    }, 5000);
});

alt.onServer('consumables:eat', (item) => {
    const dict = 'amb@code_human_wander_eating_donut@male@idle_a';
    const anim = 'idle_c';
    let prop;
    let value;
    let itemtype;
    switch (item.name) {
        case 'sandwich':
            prop = 'prop_sandwich_01';
            value = 50;
            itemtype = 'eating';
            break;
    }
    Core.Functions.playAnim(dict, anim, 5000, 49, { name: prop, hand: 28422 });
    alt.emit('progressBar:start', itemtype, 5000);
    alt.setTimeout(() => {
        Core.Functions.stopAnim();
        alt.emitServer('consumable:addHungerThirst', itemtype, value);
    }, 5000);
});
