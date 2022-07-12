export const Menu = [
    {
        identifier: 'vehicle',
        title: 'Vehicle',
        options: [
            {
                id: 1,
                eventName: 'defaultMenu:vehicle:engine',
                isServer: true,
                name: 'Start/Stop Engine',
                type: 'button',
            },
            {
                id: 2,
                eventName: 'defaultMenu:vehicle:lock',
                isServer: true,
                name: 'Lock/Unlock',
                type: 'button',
            },
            {
                id: 3,
                eventName: 'defaultMenu:vehicle:trunk',
                isServer: false,
                name: 'Trunk',
                type: 'button',
            },
        ],
    },
    {
        identifier: 'mechanic',
        title: 'Mechanic',
        options: [
            {
                id: 1,
                eventName: 'defaultMenu:vehicle:engine',
                isServer: true,
                name: 'Start/Stop Engine',
                type: 'button',
            },
            {
                id: 2,
                eventName: 'defaultMenu:vehicle:lock',
                isServer: true,
                name: 'Lock/Unlock',
                type: 'button',
            },
            {
                id: 3,
                eventName: 'defaultMenu:vehicle:trunk',
                isServer: false,
                name: 'Trunk',
                type: 'button',
            },
            {
                id: 4,
                eventName: 'defaultMenu:mechanic:repair',
                isServer: true,
                name: 'Repair Vehicle',
                type: 'button',
                state: 'inMenu'
            },
        ],
    },
];
