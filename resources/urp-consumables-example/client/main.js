import * as alt from 'alt-client';
import Core from 'urp-core';

alt.onServer('consumables:drink', (item) => {
    const dict = 'amb@world_human_drinking@beer@male@idle_a';
    const anim = 'idle_a'
    let prop;
    switch (item.name) {
        case 'water_bottle':
            prop = 'ba_prop_club_water_bottle'
            break;
    }
    Core.Functions.playAnim(dict, anim, 5000, 49, { name: prop, hand: 28422 })
    alt.setTimeout(()=>{Core.Functions.stopAnim()}, 5000)
})

alt.onServer('consumables:eat', (item) => {
    const dict = 'amb@code_human_wander_eating_donut@male@idle_a';
    const anim = 'idle_c';
    let prop;
    switch (item.name) {
        case 'sandwich':
            prop = 'prop_sandwich_01'
            break;
    }
    Core.Functions.playAnim(dict, anim, 5000, 49, { name: prop, hand: 28422 })
    alt.setTimeout(()=>{Core.Functions.stopAnim()}, 5000)
})
