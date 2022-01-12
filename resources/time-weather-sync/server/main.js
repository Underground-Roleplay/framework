import * as alt from 'alt-server';
import * as chat from 'urp-chat';
import Core from 'urp-core';
import { config } from './config';

chat.registerCmd('changeTime', (source, [hours, minutes]) => {
    if (!hours || !minutes) {
        alt.emitClient(
            source,
            'notify',
            'error',
            'Error',
            'USE /changeTime [hours minutes]'
        );
        return;
    }
    const isAllowed = Core.Functions.hasPermission(source, 'admin');
    if (isAllowed) {
        time.hour = parseInt(hours);
        time.minute = parseInt(minutes);
        alt.Player.all.forEach((player) => {
            updateTime(player);
        });
    } else {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('PERMISSIONS.LABEL'),
            Core.Translate('PERMISSIONS.DONT_HAVE_PERM')
        );
    }
});

chat.registerCmd('changeWeather', (source, [weather]) => {
    if (!weather) {
        alt.emitClient(
            source,
            'notify',
            'error',
            'COMANDOS',
            'USE /changeWeather [weather]'
        );
        return;
    }
    const isAllowed = Core.Functions.hasPermission(source, 'admin');
    if (isAllowed) {
        alt.Player.all.forEach((player) => {
            player.setWeather(weather);
        });
    } else {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('PERMISSIONS.LABEL'),
            Core.Translate('PERMISSIONS.DONT_HAVE_PERM')
        );
    }
});

const minutesPerMinute = config.minutesPerMinute;
const hoursPerSixtyMinutes = config.hoursPerSixtyMinutes;
const time = {
    hour: 10,
    minute: 0,
};

const today = new Date();

console.log(
    `[SYNC] Data/Hora iniciada, agora são ${time.hour} Horas e ${time.minute} Minutos`
);

// 1 Minutes = 1 Hour NATIVE CLOCK
let lastUpdate = Date.now() + 30000;

setInterval(async () => {
    const now = Date.now();
    if (now < lastUpdate) {
        return;
    }
    lastUpdate = now + 30000;
    time.minute += minutesPerMinute;
    if (alt.Player.all.length !== 0) {
        alt.Player.all.forEach((player) => {
            updateTime(player);
        });
    }

    if (time.minute >= 60) {
        time.minute = 0;
        time.hour += hoursPerSixtyMinutes;
        /*
            mysql.query(`UPDATE server_time SET startHour = ${time.hour}`, function (err, result) {
                if (err) throw err;
            });
            */
        if (alt.Player.all.length !== 0) {
            alt.Player.all.forEach((player) => {
                updateTime(player);
            });
        }
    }
    if (time.hour >= 24) {
        time.hour = 0;
    }
}, 0);

let randomWeather;
let startWeather;

setInterval(function () {
    randomWeather = Math.floor(Math.random() * config.weatherCycle.length);
    startWeather = config.weatherCycle[randomWeather];
    if (alt.Player.all.length !== 0) {
        alt.Player.all.forEach((player) => {
            player.setWeather(startWeather);
        });
    }
}, config.weatherCycleTime);

alt.on('playerConnect', (player) => {
    updateTime(player);
    alt.emitClient(player, 'time:SetTime', time.hour, time.minute);
});

function updateTime(player) {
    player.setDateTime(
        today.getDate(),
        today.getMonth(),
        today.getFullYear(),
        time.hour,
        time.minute,
        0
    );
}
