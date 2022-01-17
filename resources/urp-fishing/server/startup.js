import * as alt from 'alt';
import * as chat from 'urp-chat';
import { FISH_LIST } from '../shared/config';

alt.on('playerConnect', (player) => {
    player.getFishLoot = false;
    player.claimedLoot = false;
});

alt.onClient('fishing:caughtFish', (player) => {
    if (!player.getFishLoot) return;
    player.claimedLoot = true;

    alt.emitClient(player, 'playHowl2d', './audio/item_pickup.wav', 0.2);
});

alt.onClient('fishing:reqLootDiff', (player, random) => {
    let select = null;
    if (random <= 5) select = 0;
    if (random > 5 && random <= 15) select = 1;
    if (random > 15 && random <= 45) select = 2;
    if (random > 45) select = 3;

    let diff = 4; //based on selected fish and its rarity. max 11 //0-10

    if (FISH_LIST[select].rarity == 'trash') {
        diff = 4;
    } else if (FISH_LIST[select].rarity == 'rare') {
        diff = 11;
    } else if (FISH_LIST[select].rarity == 'big') {
        diff = 9;
    } else if (FISH_LIST[select].rarity == 'common') {
        diff = 7;
    }

    alt.emitClient(player, 'fishing:minigame', FISH_LIST[select].name, diff);

    player.claimedLoot = false;
    player.getFishLoot = true;
    alt.emitClient(
        player,
        'progress:new',
        'Solve puzzle',
        'puzzle',
        5000,
        'anim-cdsmooth'
    );

    setTimeout(() => {
        player.getFishLoot = false;
        if (!player.claimedLoot) {
            alt.emitClient(player, 'fishing:ranoutoftime');
        }
    }, 5000);
});

chat.registerCmd('fish', (player) => {
    alt.emitClient(player, 'fishing:tryFish');
});
