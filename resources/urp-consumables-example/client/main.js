import * as alt from 'alt-client';
import Core from 'urp-core';

alt.onServer('consumables:drink', (item) => {
    let dict;
    let anim;
    let prop;
    switch (item.name) {
        case 'water_bottle':
            dict = 'amb@world_human_drinking@beer@male@idle_a'
            anim = 'idle_a'
            prop = 'ba_prop_club_water_bottle'
            break;
    }
    Core.Functions.playAnim(dict, anim, 5000, 49, { name: prop, hand: 28422 })
    alt.setTimeout(()=>{Core.Functions.stopAnim()}, 5000)
})