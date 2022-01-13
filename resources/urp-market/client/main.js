import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false;

const openMarket = () => {
    Core.Browser.open(
        'http://resources/urp-market/client/html/ui.html',
        true,
        true
    );
    Core.Browser.on(`Market:close`, () => {
        closeMarket();
    });
    Core.Browser.on(`Market:purchase`, (quantidade, i, value) => {
        alt.emitServer('Market:purchase', quantidade, i, value);
    });
    Core.Browser.on('load', () => {
        alt.emitServer('Market:updateData');
    });

    alt.toggleGameControls(false);
    isOpen = true;
};

const closeMarket = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

alt.onServer('Market:updateData', RefreshData);

function RefreshData(data) {
    Core.Browser.emit('Market:updateData', data);
}

alt.onServer('Market:close', () => {
    if (!isOpen) return;
    closeMarket();
});

alt.onServer('Market:open', () => {
    if (isOpen) return;
    openMarket();
});
