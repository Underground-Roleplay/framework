import Core from 'urp-core';
import chat from 'urp-chat';
import * as alt from 'alt-client';

let isOpen = false;

const openGarage = (data) => {
    Core.Browser.open(
        'http://resources/urp-garage/client/html/ui.html',
        true,
        true
    );
    Core.Browser.on('Garage:close', () => {
        closeGarage();
    });
    Core.Browser.on('load', () => {
        alt.emitServer('Garage:Refresh');
    });

    Core.Browser.on('Garage:Save', (data) => {
        alt.emitServer('Garage:Save', data);
    });
    Core.Browser.on('Garage:Withdraw', (data) => {
        alt.emitServer('Garage:Withdraw', data);
    });
    Core.Browser.on('Garage:notify', (type, title, msg) => {
        alt.emit('notify', type, title, msg);
    });

    alt.toggleGameControls(false);
    isOpen = true;
};
alt.onServer('Garage:UpdateVeh', RefreshVeh);

function RefreshVeh(data) {
    Core.Browser.emit('Garage:UpdateVeh', data);
}

const closeGarage = () => {
    Core.Browser.close();
    alt.toggleGameControls(true);
    isOpen = false;
};

alt.onServer('garages:open', () => {
    // alt.log('is interaction', alt.Player.local.playerData.inInteraction)
    openGarage();
});

alt.on('keydown', (key) => {
    // if (key === 75) {
    //     openGarage()
    // }
    if (key === 27 && isOpen) {
        closeGarage();
    }
});
