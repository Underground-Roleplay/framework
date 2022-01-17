import * as alt from 'alt';

export const HOMES_INTERACTIONS = [
    {
        name: 'HLM Little Vinewood',
        type: 'basic_flat',
        x: -598.892333984375,
        y: 147.23077392578125,
        z: 61.6651611328125,
        maxSlots: 250,
        isServer: false,
        eventName: 'homes:enter',
        entry: { x: -782.171, y: 324.589, z: 223.258 },
        blip: {
            name: 'HLM Little Vinewood',
            sprite: 40,
            color: 4,
        },
        marker: {
            type: 1,
            color: new alt.RGBA(0, 181, 204, 200),
        },
    },
    {
        name: 'HLM Little Seoul',
        type: 'basic_flat',
        x: -766.7340698242188,
        y: -751.7670288085938,
        z: 27.864501953125,
        maxSlots: 250,
        isServer: false,
        eventName: 'homes:enter',
        entry: { x: -774.171, y: 333.589, z: 207.621 },
        blip: {
            name: 'HLM Little Seoul',
            sprite: 40,
            color: 4,
        },
        marker: {
            type: 1,
            color: new alt.RGBA(0, 181, 204, 200),
        },
    },
];

export const HOMES_PRICES = {
    Default: {
        buy_price: 1000000,
        sell_price: 10000,
    },
    'HLM Little Vinewood': {
        buy_price: 5000,
        sell_price: 1000,
    },
    'HLM Little Seoul': {
        buy_price: 5000,
        sell_price: 1000,
    },
};
