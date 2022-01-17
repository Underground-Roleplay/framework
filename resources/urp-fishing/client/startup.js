/* client startup */
import * as alt from 'alt-client';
import * as natives from 'natives';
import {
    FISH_ZONE,
    ANIMSDICT_CAST,
    ANIMS_CAST,
    ANIMSDICT_HOOKF,
    ANIMS_HOOKF,
    ANIMSDICT_FAILH,
    ANIMS_FAILH,
} from '../shared/config';
import Core from 'urp-core';

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

let fishingui = new alt.WebView('http://resource/client/html/index.html');

let fishing = false;
let hasCasted = false;
let isFishHooked = false;
let isFishBiting = false;
let fishBobObj = null;
let biteTime = 0;
let canKey = true;
let minigame = false;
let minigame_keys = null;
let minigame_index = null;

Core.Functions.loadAnim('mini@tennis');
Core.Functions.loadAnim('amb@lo_res_idles@');
Core.Functions.loadAnim('missminuteman_1ig_2');
Core.Functions.loadAnim('pickup_object');

const runRandomAnim = (action) => {
    if (action == 'cast') {
        const rando = generateRandomInteger(0, 4);
        return natives.taskPlayAnim(
            alt.Player.local.scriptID,
            ANIMSDICT_CAST[rando],
            ANIMS_CAST[rando],
            8.0,
            4.0,
            -1,
            48,
            0,
            0,
            0,
            0
        );
    }
    if (action == 'fishOnHook') {
        return natives.taskPlayAnim(
            alt.Player.local.scriptID,
            'mini@tennis',
            'runstart_cw_0',
            8.0,
            6.0,
            -1,
            48,
            0,
            0,
            0,
            0
        );
    }
    if (action == 'hookFish') {
        const rando = generateRandomInteger(0, 2);
        return natives.taskPlayAnim(
            alt.Player.local.scriptID,
            ANIMSDICT_HOOKF[rando],
            ANIMS_HOOKF[rando],
            8.0,
            1.0,
            -1,
            48,
            0,
            0,
            0,
            0
        );
    }
    if (action == 'failedHook') {
        const rando = generateRandomInteger(0, 1);
        return natives.taskPlayAnim(
            alt.Player.local.scriptID,
            ANIMSDICT_FAILH[rando],
            ANIMS_FAILH[rando],
            8.0,
            1.0,
            -1,
            48,
            0,
            0,
            0,
            0
        );
    }
    if (action == 'caughtFish') {
        return natives.taskPlayAnim(
            alt.Player.local.scriptID,
            'pickup_object',
            'pickup_low',
            8.0,
            1.0,
            -1,
            48,
            0,
            0,
            0,
            0
        );
    }
};

function attemptCast() {
    let fvec = natives.getEntityForwardVector(alt.Player.local.scriptID);
    let area = alt.Player.local.pos.distanceTo(FISH_ZONE) < 50;
    let distance = generateRandomInteger(9, 12);
    let ppos = alt.Player.local.pos;
    let pos = {
        x: ppos.x + fvec.x * distance,
        y: ppos.y + fvec.y * distance,
        z: ppos.z + fvec.z * distance,
    };
    const [_isWater, _wZ] = natives.testVerticalProbeAgainstAllWater(
        pos.x,
        pos.y,
        pos.z,
        0,
        true
    );

    if (!_isWater) {
        return [false, false, false];
    }

    const [_isZaboveG, _gZ] = natives.getGroundZFor3dCoord(
        pos.x,
        pos.y,
        _wZ,
        0,
        true
    );

    if (!_isZaboveG) {
        return [false, false, false];
    }

    return [area, pos, _wZ];
}

function cancelCasted() {
    if (fishBobObj != null) {
        natives.deleteObject(fishBobObj);
        fishBobObj = null;
    }
    hasCasted = false;
    isFishHooked = false;
    isFishBiting = false;
    fishBobObj = null;
    biteTime = 0;

    minigame = false;
    minigame_keys = null;
    minigame_index = null;

    alt.log('canceled cast, want to recast? press E. or X to stop fishing.');
    fishingui.emit('showMSG', 'fishMessage1');
}

alt.onServer('fishing:ranoutoftime', () => {
    cancelCasted();
    runRandomAnim('failedHook');
});

function fishingCast() {
    const [_canFish, _pos, _wZ] = attemptCast();

    if (!_canFish) {
        return;
    }

    runRandomAnim('cast');
    alt.emit('playHowl2d', './audio/fishing_cast.wav', 0.6);

    let inter = alt.setInterval(() => {
        fishBobObj = natives.createObject(
            natives.getHashKey('prop_dock_float_1b'),
            _pos.x,
            _pos.y,
            _wZ - 0.4,
            false,
            false,
            false
        );
        alt.emit('playHowl2d', './audio/fishing_castDone2.wav', 0.6);

        isFishHooked = false;
        isFishBiting = false;
        biteTime = 0;
        hasCasted = true;
        fishingui.emit('showMSG', 'fishMessage2');

        alt.clearInterval(inter);
    }, 1500);
}

let fishBitingInter = alt.setInterval(() => {
    if (hasCasted && !isFishHooked) {
        if (biteTime >= 11) {
            isFishBiting = false;
            biteTime = 0;
        } else if (biteTime >= 10) {
            isFishBiting = true;
            runRandomAnim('fishOnHook');
            alt.emit('playHowl2d', './audio/fishing_bitingFish.wav', 0.6);
            alt.emit('playHowl2d', './audio/fishing_reelBiting.wav', 0.5);
        }
        biteTime += 1;
    }
}, 1000);

function requestFishLootFromServer() {
    let inter = alt.setInterval(() => {
        let random = Math.floor(Math.random() * 100);
        alt.emitServer('fishing:reqLootDiff', random);
        alt.clearInterval(inter);
    }, 1000);
}

alt.onServer('fishing:minigame', (loot, diff) => {
    var keylist = ['W', 'A', 'S', 'D'];
    let keys = [];
    for (let index = 0; index < diff; index++) {
        keys.push(keylist[generateRandomInteger(0, 3)]);
    }

    minigame = true;
    minigame_keys = keys;
    minigame_index = 0;

    fishingui.emit('showMSG', 'fishMessage3', diff, keys);
});

function hookFish() {
    if (isFishBiting) {
        isFishBiting = false;
        isFishHooked = true;

        let inter2 = alt.setInterval(() => {
            natives.deleteObject(fishBobObj);
            fishBobObj = null;
            runRandomAnim('hookFish');
            alt.emit('playHowl2d', './audio/fishing_hooked.wav', 0.4);
            requestFishLootFromServer();

            alt.clearInterval(inter2);
        }, 1100);
    }
}

function cancelFishing() {
    let delshit = alt.setInterval(() => {
        if (fishBobObj != null) {
            natives.deleteObject(fishBobObj);
            fishBobObj = null;
        }

        alt.clearInterval(delshit);
    }, 2000);

    natives.clearPedTasks(alt.Player.local.scriptID);

    fishing = false;
    hasCasted = false;
    isFishHooked = false;
    minigame = false;
    minigame_keys = null;
    minigame_index = null;

    fishingui.emit('toggleGUI', false);
}

function freezeKey() {
    canKey = false;

    let inter = alt.setInterval(() => {
        canKey = true;

        alt.clearInterval(inter);
    }, 3000);
}

function didWeCompleteMiniGame() {
    if (minigame_index == minigame_keys.length) {
        cancelCasted();
        natives.taskPlayAnim(
            alt.Player.local.scriptID,
            'pickup_object',
            'pickup_low',
            8.0,
            1.0,
            -1,
            48,
            0,
            0,
            0,
            0
        );

        alt.emitServer('fishing:caughtFish');
    }
}

alt.on('keyup', (key) => {
    if (canKey && key == 0x45 && fishing && !hasCasted) {
        fishingCast();
    } else if (canKey && key == 0x45 && fishing && hasCasted) {
        cancelCasted();
    }
    if (
        canKey &&
        key == 0x20 &&
        fishing &&
        hasCasted &&
        isFishBiting &&
        !isFishHooked
    ) {
        hookFish();
    }
    if (canKey && key == 0x58 && fishing) {
        cancelFishing();
    }

    if (key != 0x57 || key != 0x41 || key != 0x53 || key != 0x44) {
        if (fishing) {
            freezeKey();
        }
    }

    if (minigame) {
        if (key == 0x57 || key == 0x41 || key == 0x53 || key == 0x44) {
            let currentKey = minigame_keys[minigame_index];

            if (currentKey == 'W' && key == 0x57) {
                fishingui.emit('setSolved', minigame_index);
                minigame_index += 1;
                didWeCompleteMiniGame();
            } else if (currentKey == 'A' && key == 0x41) {
                fishingui.emit('setSolved', minigame_index);
                minigame_index += 1;
                didWeCompleteMiniGame();
            } else if (currentKey == 'S' && key == 0x53) {
                fishingui.emit('setSolved', minigame_index);
                minigame_index += 1;
                didWeCompleteMiniGame();
            } else if (currentKey == 'D' && key == 0x44) {
                fishingui.emit('setSolved', minigame_index);
                minigame_index += 1;
                didWeCompleteMiniGame();
            } else {
                natives.taskPlayAnim(
                    alt.Player.local.scriptID,
                    'mini@tennis',
                    'react_lose_03',
                    8.0,
                    1.0,
                    -1,
                    48,
                    0,
                    0,
                    0,
                    0
                );
                cancelCasted();
            }
        }
    }
});

alt.onServer('fishing:tryFish', () => {
    const _canFish = attemptCast();

    if (!_canFish) {
        return;
    }

    let ped = alt.Player.local.scriptID;
    let delay = 0;
    let playEnterAnim = true;
    natives.taskStartScenarioInPlace(
        ped,
        'WORLD_HUMAN_STAND_FISHING',
        delay,
        playEnterAnim
    );

    fishingui.emit('toggleGUI', true);

    fishingui.emit('showMSG', 'fishMessage1');
    fishing = true;
});
