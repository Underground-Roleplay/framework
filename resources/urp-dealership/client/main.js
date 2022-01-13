import Core from 'urp-core';
import chat from 'urp-chat';
import * as alt from 'alt-client';

let isOpen = false;

const openDealership = (data) => {
    Core.Browser.open(
        'http://resources/urp-dealership/client/html/ui.html',
        true,
        true
    );
    Core.Browser.on('Dealership:close', () => {
        closeDealership();
    });
    Core.Browser.on('load', () => {
        alt.emitServer('Dealership:RefreshEstoque');
    });

    Core.Browser.on('Dealership:FinishBuy', (data) => {
        alt.emitServer('Dealership:FinishBuy', data);
    });
    Core.Browser.on('Dealership:notify', (type, title, msg) => {
        alt.emit('notify', type, title, msg);
    });

    alt.toggleGameControls(false);
    isOpen = true;
};
alt.onServer('Dealership:UpdateVeh', RefreshVeh);

function RefreshVeh(data) {
    Core.Browser.emit('Dealership:UpdateVeh', data);
}

const closeDealership = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};
alt.onServer('Dealership:close', closeDealership);

alt.onServer('dealership:open', () => {
    if (isOpen) return;
    openDealership();
});

alt.on('keydown', (key) => {
    if (key === 27 && isOpen) {
        closeDealership();
    }
});
