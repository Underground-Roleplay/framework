import Core from 'urp-core';
import * as natives from 'natives';
import * as alt from 'alt-client';

import { bennysCoords } from '../shared/config';

const localPlayer = alt.Player.local;

let isOpen = false;

const RefreshMod = (i) => {
    Core.Browser.emit('Bennys:loadMod', i);
};

const openbennys = () => {
    Core.Browser.open(
        'http://resources/urp-bennys/client/html/ui.html',
        true,
        false
    );
    Core.Browser.on('Bennys:close', () => {
        closeSkinshop();
    });
    Core.Browser.on('load', () => {
        console.log('webview loaded');
        alt.emitServer('Bennys:load');
    });
    Core.Browser.on('Bennys:att', (index, id) => {
        alt.emitServer('Bennys:att', index, id);
    });
    Core.Browser.on('Bennys:instalar', () => {
        alt.emitServer('Bennys:install');
    });
    Core.Browser.on('Bennys:reload', () => {
        alt.emitServer('Bennys:reload');
    });
    Core.Browser.on('Bennys:color', (type, color) => {
        alt.emitServer('Bennys:color', type, color);
    });
    Core.Browser.on('Bennys:InstallColor', () => {
        alt.emitServer('Bennys:InstallColor');
    });

    alt.toggleGameControls(false);
    isOpen = true;
};

alt.onServer('Bennys:loadMod', RefreshMod);

const closebennys = () => {
    alt.emitServer('Bennys:reload');
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

const isSourceAtBennys = () => {
    const playerInterior = natives.getInteriorFromEntity(localPlayer.scriptID);
    if (!playerInterior) {
        alt.emit('notify', 'error', `Benny's`, `You need to be at benny's`);
        return false;
    }
    const bennysInterior = natives.getInteriorAtCoords(
        bennysCoords.x,
        bennysCoords.y,
        bennysCoords.z
    );
    if (bennysInterior !== playerInterior) {
        alt.emit('notify', 'error', `Benny's`, `You need to be at benny's`);
        return false;
    }
    return true;
};

const isSourceAMechanic = () => {
    const currentJob = Core.Functions.getJobInfo('name');
    const onDuty = Core.Functions.getJobInfo('onDuty');
    if (currentJob !== 'mechanic') {
        alt.emit('notify', 'error', `Benny's`, `You need to be a mechanic`);
        return false;
    }
    if (!onDuty) {
        alt.emit('notify', 'error', `Benny's`, `You need to be on duty`);
        return false;
    }
    return true;
};

alt.on('keydown', (key) => {
    if (key === 27 && isOpen) {
        closebennys();
    }
    if (
        key === 187 &&
        !isOpen &&
        localPlayer.vehicle &&
        isSourceAMechanic() &&
        isSourceAtBennys()
    ) {
        openbennys();
    }
});
