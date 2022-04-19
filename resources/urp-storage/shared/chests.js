import * as alt from 'alt';

export const CHESTS_INTERACTIONS = [
    {
        name: 'STORAGE 1',
        type: 'storage',
        perm: null,
        x: 39.863739013671875,
        y: -1022.4527587890625,
        z: 29.5157470703125,
        isServer: true,
        size: 200000,
        eventName: 'storage:open',
        marker: {
            type: 1,
            color: new alt.RGBA(0, 181, 204, 200),
        },
    },
    {
        name: 'STORAGE 2',
        type: 'storage',
        perm: null,
        x: 55.92527389526367,
        y: -1045.4241943359375,
        z: 29.4146728515625,
        size: 100000,
        isServer: true,
        eventName: 'storage:open',
        marker: {
            type: 1,
            color: new alt.RGBA(0, 181, 204, 200),
        },
    },
    {
        name: 'POLICE 1',
        type: 'staticStorage',
        perm: 'police',
        x: 451.0945129394531,
        y: -975.3758544921875,
        z: 30.6783447265625,
        size: 1000000,
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
        buy_price: 18000,
    },
    'STORAGE 2': {
        buy_price: 10000,
    },
    'POLICE 1': {
        buy_price: 0,
    },
};
