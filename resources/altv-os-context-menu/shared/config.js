export const VEHICLE_MENU = {
    identifier: 'Vehicle Menu',
    options: [
        {
            eventName: 'context:vehicle:engine',
            isServer: true,
            name: 'Start/Stop Engine',
        },
        {
            eventName: 'context:vehicle:lock',
            isServer: true,
            name: 'Lock/Unlock',
        },
        {
            eventName: 'context:vehicle:trunk',
            isServer: true,
            name: 'Trunk',
        },
    ],
    title: 'Vehicle Options',
};

export const POLICE_MENU = {
    identifier: 'Player Menu',
    options: [
        {
            eventName: 'context:police:cuff',
            isServer: true,
            name: 'Hands Cuffs',
        },
        {
            eventName: 'context:police:uncuff',
            isServer: true,
            name: 'UnCuffs',
        },
    ],
    title: 'Player Options',
};

export const PLAYER_MENU = {
    identifier: 'Player Menu',
    options: [
        {
            eventName: 'context:player:cuff',
            isServer: true,
            name: 'Start/Stop',
        },
        {
            eventName: 'context:player:cuff',
            isServer: true,
            name: 'Manga',
        },
    ],
    title: 'Player Options',
};

export const PERSONAL_MENU = {
    identifier: 'Personal Menu',
    options: [
        {
            eventName: 'context:player:showid',
            isServer: false,
            name: 'Show ID',
        },
        {
            eventName: 'context:player:showssn',
            isServer: false,
            name: 'Show SSN',
        },
        {
            eventName: 'context:player:status',
            isServer: false,
            name: 'Status',
        },
    ],
    title: 'Personal Options',
};

export const AMBULANCE_MENU = {
    identifier: 'Ambulance Menu',
    options: [
        {
            eventName: 'context:ambulance:revive',
            isServer: true,
            name: 'Revive',
        },
    ],
    title: 'Ambulance Options',
};
