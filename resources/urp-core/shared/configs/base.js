export const URPConfig = {};

URPConfig.DefaultSpawn = { x: -1035.71, y: -2731.87, z: 12.86 };
URPConfig.DefaultModel = `mp_m_freemode_01`;

URPConfig.WhitelistOn = false;

//Vehicle
URPConfig.VehicleUpdate = 10000;
// URPConfig.VehicleFuelLost = 10
URPConfig.VehicleFuelLost = 0.01;

//CHARACTER
URPConfig.SaveInterval = 4950;
URPConfig.MaxCharacters = 3;
//Hunger and Thirst
URPConfig.HungerRate = 4.2;
URPConfig.ThirstRate = 3.8;
//Every 5 Min
URPConfig.HungerThirstTime = 1000 * 60 * 5;

URPConfig.DefaultMoney = { cash: 5000, bank: 5000, crypto: 0 };
URPConfig.DefaultInfo = {
    firstname: 'Firstname',
    lastname: 'Lastname',
    backstory: 'unknown',
    gender: 0,
    birthdate: '00-00-0000',
    nationality: 'American',
};
URPConfig.DefaultJob = {
    name: 'unemployed',
    label: 'Civilian',
    payment: 10,
    onDuty: true,
};
URPConfig.DefaultGang = {
    label: 'No affiliations',
    name: 'none',
};
URPConfig.DefaultMeta = {
    criminalrecord: {
        hasRecord: false,
    },
    licences: {
        business: false,
        weapon: false,
        driver: true,
        dmv: false,
        bike: false,
        truck: false,
        boat: false,
        pilot: false,
    },
    ishandcuffed: false,
    isdead: false,
    stress: 0,
    thirst: 100,
    hunger: 100,
    armour: 0,
    health: 200,
};
URPConfig.MaxInvSlots = 41;
URPConfig.MaxWeight = 120000; //120 kg in grams
//LANG
URPConfig.lang = 'en';
//URPConfig.lang = "pt-BR"
