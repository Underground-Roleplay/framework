import * as alt from 'alt';

export const CHESTS_INTERACTIONS = [
    {
        name: 'STORAGE 1',
        type: 'storage',
        x: 39.863739013671875,
        y: -1022.4527587890625,
        z: 29.5157470703125,
        isServer: true,
        size: 500,
        eventName: 'storage:open',
        marker: {
            type: 1,
            color: new alt.RGBA(0, 181, 204, 200),
        },
    },
    {
        name: 'STORAGE 2',
        type: 'storage',
        x: 55.92527389526367,
        y: -1045.4241943359375,
        z: 29.4146728515625,
        size: 1000,
        isServer: true,
        eventName: 'storage:open',
        marker: {
            type: 1,
            color: new alt.RGBA(0, 181, 204, 200),
        },
    },
];

export const CHESTS_PRICES = {
    Default: {
        buy_price: 1000000,
    },
    'STORAGE 1': {
        buy_price: 8000,
    },
    'STORAGE 2': {
        buy_price: 15000,
    },
};