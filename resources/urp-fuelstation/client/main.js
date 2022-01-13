import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false;

const openStation = () => {
    Core.Browser.open(
        'http://resources/urp-fuelstation/client/html/ui.html',
        true,
        true
    );
    Core.Browser.on('Station:close', () => {
        closeStation();
    });
    Core.Browser.on('Station:abastecer', (liters, price, fuelType) => {
        alt.emitServer('Station:abastecer', liters, price, fuelType);
    });
    Core.Browser.on('load', () => {
        alt.emitServer('Station:UpdateValues');
    });

    alt.toggleGameControls(false);
    isOpen = true;
};

const closeStation = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

alt.onServer('Station:UpdateValues', RefreshInfo);

function RefreshInfo(dataTank, dataPrice, porcentagem) {
    Core.Browser.emit(
        'Station:UpdateValues',
        Core.Functions.getPlayerData('money'),
        dataTank,
        dataPrice,
        porcentagem
    );
}

alt.onServer('Station:open', () => {
    if (isOpen) return;
    openStation();
});

alt.on('Station:open', () => {
    if (isOpen) return;
    openStation();
});

alt.on('keydown', (key) => {
    if (key === 27 && isOpen) {
        closeStation();
    }
});
