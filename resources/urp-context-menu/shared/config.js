export const itemsList = [
    // usando png ou svg local ou web, sem texto
    {
        index: 'vehicle',
        items: [
            {
                title: 'Seat Belt',
                image: './img/seatbelt.png',
                event: {
                    name: 'context:vehicle:seatbelt',
                    type: 'client',
                    params: '',
                },
            },
            {
                title: 'Start Engine',
                image: './img/startengine.png',
                event: {
                    name: 'context:vehicle:engine',
                    type: 'client',
                    params: '',
                },
            },
            {
                title: 'Lock',
                image: './img/carlock.png',
                event: {
                    name: 'context:vehicle:lock',
                    type: 'client',
                    params: '',
                },
            },
            {
                title: 'Trunk',
                image: './img/trunk.png',
                event: {
                    name: 'context:vehicle:trunk',
                    type: 'client',
                    params: '',
                },
            },
            {
                title: 'Repair',
                image: './img/repair_3.png',
                event: {
                    name: 'whellmenu:mechanic:repair',
                    type: 'server',
                    params: '',
                },
            },
        ],
    },

    // usando https://fontawesome.com/icons/   \u{icon id}\n
    // texto + icone
    {
        index: 'self',
        items: [
            {
                title: 'personal',
                image: './img/police_search.png',
                event: {
                    name: 'splayer',
                    type: 'client',
                    params: '',
                },
            },
        ],
    },

    {
        index: 'police',
        items: [
            {
                title: 'Cuff',
                image: './img/handcuffs_3.png',
                event: {
                    name: 'context:police:cuff',
                    type: 'client',
                    params: '',
                },
            },
            {
                title: 'MDT',
                image: './img/police-mdt.png',
                event: { name: 'lockdoor', type: 'client', params: '' },
            },
            {
                title: 'Invoice',
                image: './img/invoice.png',
                event: { name: 'truck', type: 'client', params: '' },
            },
            {
                title: 'Search',
                image: './img/police_search.png',
                event: {
                    name: 'search:inventory:player',
                    type: 'client',
                    params: '',
                },
            },
            {
                title: 'Drag',
                image: './img/drag.png',
                event: { name: 'police_drag', type: 'client', params: '' },
            },
            {
                title: 'Put Inside Vehicle',
                image: './img/put_in_car.png',
                event: { name: 'police_putinveh', type: 'client', params: '' },
            },
            {
                title: 'Put Outside Vehicle',
                image: './img/put_out_car.png',
                event: { name: 'police_putoutveh', type: 'client', params: '' },
            },
            {
                title: 'Jail',
                image: './img/jail.png',
                event: {
                    name: 'context:police:putinprison',
                    type: 'client',
                    params: '',
                },
            },
            {
                title: 'Community Service',
                image: './img/penalty.png',
                event: { name: 'police_comnser', type: 'client', params: '' },
            },
        ],
    },

    {
        index: 'ambulance',
        items: [
            {
                title: 'Drag',
                image: './img/drag.png',
                event: { name: 'ems_drag', type: 'client', params: '' },
            },
            {
                title: 'Invoice',
                image: './img/invoice.png',
                event: { name: 'ems_invoice', type: 'client', params: '' },
            },
            {
                title: 'Put Inside Vehicle',
                image: './img/put_in_car.png',
                event: { name: 'ems_putinveh', type: 'client', params: '' },
            },
            {
                title: 'Put Outside Vehicle',
                image: './img/put_out_car.png',
                event: { name: 'ems_putoutveh', type: 'client', params: '' },
            },
            {
                title: 'Heal',
                image: './img/heal.png',
                event: { name: 'ems_heal', type: 'client', params: '' },
            },
            {
                title: 'Revive',
                image: './img/revive.png',
                event: { name: 'ems_revive', type: 'client', params: '' },
            },
        ],
    },

    {
        index: 'mechanic',
        items: [
            {
                title: 'Drag',
                image: './img/drag.png',
                event: { name: 'custom', type: 'client', params: '' },
            },
            {
                title: 'Invoice',
                image: './img/invoice.png',
                event: { name: 'truck', type: 'client', params: '' },
            },
            {
                title: 'Put Inside Vehicle',
                image: './img/put_in_car.png',
                event: { name: 'custom', type: 'client', params: '' },
            },
            {
                title: 'Put Outside Vehicle',
                image: './img/put_out_car.png',
                event: { name: 'custom', type: 'client', params: '' },
            },
            {
                title: 'Heal',
                image: './img/heal.png',
                event: { name: 'custom', type: 'client', params: '' },
            },
            {
                title: 'Revive',
                image: './img/revive.png',
                event: { name: 'custom', type: 'client', params: '' },
            },
        ],
    },

    //pump gas start

    {
        index: 'GAS_STATION',
        items: [
            {
                title: 'Drag',
                image: './img/drag.png',
                event: { name: 'Station:open', type: 'client', params: '' },
            },
        ],
    },
    //pump gas end
];

//prop
export const PROPS_LIST_EVENT = {
    3832150195: 'GAS_STATION',
    4130089803: 'GAS_STATION',
    '-164877493': 'GAS_STATION',
    '-469694731': 'GAS_STATION',
    '-462817101': 'GAS_STATION',
    1933174915: 'GAS_STATION',
    1694452750: 'GAS_STATION',
    1339433404: 'GAS_STATION',
    '-2007231801': 'GAS_STATION',
    2287735495: 'GAS_STATION',
};
