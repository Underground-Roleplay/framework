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
            eventName: 'context:player:cuff',
            isServer: true,
            name: 'Start/Stop',
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
