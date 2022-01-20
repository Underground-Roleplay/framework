import fetch from 'node-fetch';
import alt from 'alt-server';

const debug = alt.debug;
const [major] = alt.version.split('.');
const DEBUG_PORT = 9223;

const getClientStatus = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/status`);
        return Promise.resolve(response.text());
    } catch (error) {
        return Promise.resolve('ERROR');
    }
};

const tryReconnection = async () => {
    try {
        await fetch(`http://127.0.0.1:${DEBUG_PORT}/reconnect`, {
            method: 'POST',
            //body: "serverPassword" - only needed when a password is set in the server.cfg
        });
    } catch (e) {
        console.log(e);
    }
};

const enableAutoReconnect = async () => {
    if (!debug) {
        console.log(
            'In order to use alt:V reconnect debug must be enable at server.cfg'
        );
        return;
    }

    if (parseInt(major) < 9) {
        console.log(
            'In order to use alt:V reconnect you need to use version 9.0 or higher'
        );
        return;
    }

    console.log('[AUTO RECONNECT] Has been enabled');
    const status = await getClientStatus();
    if (status == 'MAIN_MENU' || status == 'IN_GAME') {
        tryReconnection();
    } else {
        alt.setTimeout(tryReconnection, 3000);
    }
};

enableAutoReconnect();
