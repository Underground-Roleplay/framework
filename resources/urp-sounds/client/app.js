'use strict';

function playHowl2d(soundfile, volume) {
    var sound = new Howl({
        src: `./audio/${soundfile}`, //   './audio/fillup_start.wav' `./audio/${soundfile}`
        autoplay: true,
        loop: false,
        volume: volume, //        0.4
    });
    //sound.play();
    return sound;
}

if ('alt' in window) {
    alt.on('playHowl2d', playHowl2d);
}
