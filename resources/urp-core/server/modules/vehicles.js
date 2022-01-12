import * as alt from 'alt-server';

import db from 'mysql2-wrapper';

import Core from '../main';

import { executeSync, insertSync } from '../libs/utils';

import { VehList, modType, indexVehicle } from '../../shared/configs/vehicles';

const pool = [];

const getVehicleData = (veh, key) => {
    return veh.data[key];
};

const generatePlate = async () => {
    let uniqueFound = false;
    let plate = undefined;
    while (!uniqueFound) {
        plate = `${Math.floor(Math.random() * 1000)}-${Math.floor(
            Math.random() * 10000
        )}`;
        const result = await executeSync(
            'SELECT COUNT(*) as count from characters_vehicles WHERE plate = ?',
            [plate]
        );
        if (result[0]['count'] == 0) {
            uniqueFound = true;
        }
    }
    return plate;
};

const loadSourceGarage = async (source) => {
    const vehList = [];
    const result = await executeSync(
        'SELECT * from characters_vehicles WHERE ssn = ?',
        [source.playerData.ssn]
    );
    for (let i = 0; i < result.length; i++) {
        const vehicleData = result[i];
        if (vehicleData) {
            vehicleData.position = JSON.parse(vehicleData.position);
            vehicleData.model = JSON.parse(vehicleData.model);
            vehicleData.status = JSON.parse(vehicleData.status);
            vehicleData.metadata = JSON.parse(vehicleData.metadata);
            vehicleData.customizations = JSON.parse(vehicleData.customizations);
            vehList.push(vehicleData);
        }
        //alt.log(`id: ${vehicleData.id} model: ${vehicleData.model} plate: ${vehicleData.plate}`)
    }
    return vehList;
};

const addToSource = async (
    source,
    model,
    initialPosition = { x: 0, y: 0, z: 0 },
    spawn = false
) => {
    const { ssn } = source.playerData;
    if (!VehList[model]) return false;
    const hasVehicle = await executeSync(
        'SELECT * FROM characters_vehicles WHERE ssn = ? AND model = ?',
        [ssn, model]
    );
    if (hasVehicle[0]) return false;
    //New vehicle DATA
    const newVehicle = {};
    newVehicle.model = model;
    newVehicle.position = initialPosition;
    newVehicle.plate = await generatePlate();
    newVehicle.status = { bodyHealth: 1000 };
    newVehicle.metadata = { fuel: 15 };
    newVehicle.customizations = {};
    const id = await insertSync(
        'INSERT INTO characters_vehicles (ssn, model, position, plate, status, metadata, customizations) VALUES (?,?,?,?,?,?,?)',
        [
            ssn,
            newVehicle.model,
            JSON.stringify(newVehicle.position),
            newVehicle.plate,
            JSON.stringify(newVehicle.status),
            JSON.stringify(newVehicle.metadata),
            JSON.stringify(newVehicle.customizations),
        ]
    );

    newVehicle.id = id;

    if (!spawn) {
        return id;
    }

    spawn(newVehicle);
};

const putInGarage = (source, vehicle) => {
    if (!pool[vehicle.data.id]) {
        vehicle.destroy();
        return;
    }
    if (source.playerData.ssn !== vehicle.data.ssn) return;
    if (vehicle.timeoutTicker) {
        alt.clearTimeout(vehicle.timeoutTicker);
    }
    saveVehicleMetadata(vehicle);
    saveMods(vehicle);
    saveStatus(vehicle);
    delete pool[vehicle.data.id];
    vehicle.destroy();
};

const spawn = (source, vehicleData, pos, rot) => {
    if (vehicleData.status.destroyed) {
        alt.emitClient(
            source,
            'notify',
            'error',
            Core.Translate('VEHICLES.LABEL'),
            'o carro deu pt'
        );
        return;
    }
    if (pool[vehicleData.id]) {
        alt.emitClient(
            source,
            'notify',
            'error',
            'GARAGE',
            'VEHICLE ALREADY SPAWNED'
        );
        return;
    }
    if (pos) {
        vehicleData.position = pos;
    }

    if (rot) {
        vehicleData.rotation = rot;
    }

    const vehicle = new alt.Vehicle(
        vehicleData.model,
        vehicleData.position.x,
        vehicleData.position.y,
        vehicleData.position.z,
        vehicleData.rotation.x || 0,
        vehicleData.rotation.y || 0,
        vehicleData.rotation.z || 0
    );

    pool[vehicleData.id] = vehicle;

    vehicle.data = vehicleData;

    vehicle.numberPlateText = vehicleData.plate;

    vehicle.engineOn = false;

    if (
        vehicleData.customizations.customPrimaryColor &&
        vehicleData.customizations.customSecondaryColor
    ) {
        loadMods(vehicle, vehicleData.customizations);
    }

    if (vehicleData.status) {
        loadStatus(vehicle, vehicleData.status);
    }

    if (vehicleData.metadata.trunk) {
        vehicle.setStreamSyncedMeta('trunk', vehicleData.trunk);
    }

    vehicle.setStreamSyncedMeta('fuel', vehicleData.metadata.fuel);
    vehicle.setStreamSyncedMeta('owner', vehicleData.ssn);
    vehicle.setStreamSyncedMeta('engine', false);
    vehicleTick(vehicle);

    return vehicle;
};

const spawnById = async (source, id, pos, rot) => {
    const vehicleData = await executeSync(
        'SELECT * from characters_vehicles WHERE ssn = ? AND id = ?',
        [source.playerData.ssn, id]
    );
    if (!vehicleData[0]) return undefined;
    vehicleData[0].position = JSON.parse(vehicleData[0].position);
    vehicleData[0].status = JSON.parse(vehicleData[0].status);
    vehicleData[0].metadata = JSON.parse(vehicleData[0].metadata);
    vehicleData[0].model = vehicleData[0].model;
    vehicleData[0].customizations = JSON.parse(vehicleData[0].customizations);
    spawn(source, vehicleData[0], pos, rot);
};

const sourceEnteredInVehicle = (source, vehicle, seat) => {
    if (!vehicle.data) return;
    if (!pool[vehicle.data.id]) return;
    if (seat === 1) {
        if (vehicle.data.ssn === source.playerData.ssn) {
            console.info(
                '(' +
                    source.playerData.ssn +
                    ') entrou do seu veiculo em x:' +
                    vehicle.pos.x +
                    ' y:' +
                    vehicle.pos.y +
                    ' z:' +
                    vehicle.pos.z
            );
        } else {
            console.info(
                '(' +
                    source.playerData.ssn +
                    ') entrou num veiculo registrado para o ssn' +
                    vehicle.data.ssn +
                    ' em x:' +
                    vehicle.pos.x +
                    ' y:' +
                    vehicle.pos.y +
                    ' z:' +
                    vehicle.pos.z
            );
        }
        // alt.emitClient(player, 'vehicle:carData', vehicle.data.info)
    }
};

const sourceLeavesVehicle = (source, vehicle, seat) => {
    if (!vehicle.data) return;
    if (!pool[vehicle.data.id]) return;
    if (seat === 1) {
        if (vehicle.data.ssn === source.playerData.ssn) {
            console.info(
                '(' +
                    source.playerData.ssn +
                    ') saiu de seu veiculo em x:' +
                    vehicle.pos.x +
                    ' y:' +
                    vehicle.pos.y +
                    ' z:' +
                    vehicle.pos.z
            );
        } else {
            console.info(
                '(' +
                    source.playerData.ssn +
                    ') saiu de um veiculo registrado para o ssn' +
                    vehicle.data.ssn +
                    ' em x:' +
                    vehicle.pos.x +
                    ' y:' +
                    vehicle.pos.y +
                    ' z:' +
                    vehicle.pos.z
            );
        }

        // If car in future will stay spawned
        // updateVehiclePosition(vehicle)
    }
};

const vehicleTick = (vehicle) => {
    vehicle.timeoutTicker = setTimeout(() => {
        vehicleTick(vehicle);
    }, 10000);

    if (!vehicle.nextUpdate) {
        vehicle.nextUpdate = Date.now() + Core.Config.VehicleUpdate;
    }

    if (Date.now() > vehicle.nextUpdate) {
        vehicle.nextUpdate = Date.now() + Core.Config.VehicleUpdate;
        updateFuel(vehicle);
    }
};

const handleToggleEngine = (source, vehicle) => {
    if (!vehicle || !vehicle.valid) {
        return;
    }

    if (source !== vehicle.driver) return;

    if (vehicle.data.metadata.fuel <= 0) {
        vehicle.engineOn = false;
        vehicle.setStreamSyncedMeta('engine', vehicle.engineOn);
        if (source) {
            alt.emitClient(
                source,
                'notify',
                'error',
                Core.Translate('VEHICLES.LABEL'),
                Core.Translate('VEHICLES.NO_FUEL')
            );
        }
        return;
    }

    if (vehicle.engineOn) {
        vehicle.engineOn = false;
        if (source) {
            alt.emitClient(
                source,
                'notify',
                'success',
                Core.Translate('VEHICLES.LABEL'),
                Core.Translate('VEHICLES.ENGINE_OFF')
            );
        }
        vehicle.setStreamSyncedMeta('engine', vehicle.engineOn);
    } else {
        vehicle.engineOn = true;
        if (source) {
            alt.emitClient(
                source,
                'notify',
                'success',
                Core.Translate('VEHICLES.LABEL'),
                Core.Translate('VEHICLES.ENGINE_ON')
            );
        }
        vehicle.setStreamSyncedMeta('engine', vehicle.engineOn);
    }
};

const updateFuel = (vehicle) => {
    if (!vehicle || !vehicle.valid || !vehicle.engineOn) return;
    if (!isNaN(vehicle.data.metadata.fuel)) {
        vehicle.data.metadata.fuel = vehicle.data.metadata.fuel;
    } else {
        vehicle.data.metadata.fuel = 100;
        vehicle.data.metadata.fuel = 100;
    }

    vehicle.data.metadata.fuel -= Core.Config.VehicleFuelLost;

    if (vehicle.data.metadata.fuel < 0) {
        vehicle.data.metadata.fuel = 0;
        if (vehicle.engineOn) {
            vehicle.engineOn = false;
            vehicle.setStreamSyncedMeta('engine', vehicle.engineOn);
            if (vehicle.driver) {
                alt.emitClient(
                    vehicle.driver,
                    'notify',
                    'error',
                    Core.Translate('VEHICLES.LABEL'),
                    Core.Translate('VEHICLES.NO_FUEL')
                );
            }
        }
    }

    vehicle.data.metadata.fuel = vehicle.data.metadata.fuel.toFixed(2);
    vehicle.setStreamSyncedMeta('fuel', vehicle.data.metadata.fuel);
    saveVehicleMetadata(vehicle);
};

const saveVehicleMetadata = (vehicle) => {
    const { metadata, id } = vehicle.data;
    db.execute(
        'UPDATE characters_vehicles SET metadata = ? WHERE ssn = ? AND id = ?',
        [JSON.stringify(metadata), vehicle.data.ssn, id],
        undefined,
        alt.resourceName
    );
};

const setMod = (source, index, id) => {
    console.log(source.vehicle);
    if (source.vehicle === null) return;
    if (source.vehicle.modKit != 1 || source.vehicle.modKit == 1) {
        source.vehicle.modKit = 1;
        source.vehicle.setMod(parseInt(index), parseInt(id));
        alt.log(source.vehicle.getModsCount(parseInt(index)));
    }
};

const setColor = (source, index, r, g, b, a) => {
    if (source.vehicle === null) return;
    if (index == `primary`) {
        source.vehicle.customPrimaryColor = { r, g, b, a };
    }
    if (index == `secondary`) {
        source.vehicle.customSecondaryColor = { r, g, b, a };
    }
};

const setNeon = (source, r, g, b) => {
    if (source.vehicle === null) return;
    source.vehicle.neon = {
        front: true,
        back: true,
        left: true,
        right: true,
    };
    source.vehicle.neonColor = {
        r: r,
        g: g,
        b: b,
        a: 255,
    };
};

const hasFuel = (source) => {
    const closestVeh = alt.Vehicle.all.find(
        (targetVehicle) => source.pos.distanceTo(targetVehicle.pos) < 3.5
    );
    if (!closestVeh) return alt.log(`nao tem carro perto`);
    if (!closestVeh.data) return;
    return closestVeh.data.metadata.fuel;
};
const fuelTankSize = (source) => {
    const closestVeh = alt.Vehicle.all.find(
        (targetVehicle) => source.pos.distanceTo(targetVehicle.pos) < 3.5
    );
    if (!closestVeh) return alt.log(`nao tem carro perto`);
    if (!closestVeh.data) return;
    let model = closestVeh.data.model;
    if (!VehList[model]) return 50;
    return VehList[model].fuelTank;
};
const fuelType = (source) => {
    const closestVeh = alt.Vehicle.all.find(
        (targetVehicle) => source.pos.distanceTo(targetVehicle.pos) < 3.5
    );
    if (!closestVeh) return alt.log(`nao tem carro perto`);
    if (!closestVeh.data) return;
    let model = closestVeh.data.model;
    return VehList[model].fuelType;
};
const reFuel = (source, value) => {
    const closestVeh = alt.Vehicle.all.find(
        (targetVehicle) => source.pos.distanceTo(targetVehicle.pos) < 3.5
    );
    if (!closestVeh) return alt.log(`nao tem carro perto`);
    if (!closestVeh.data) return;
    closestVeh.data.metadata.fuel =
        parseInt(closestVeh.data.metadata.fuel) + parseInt(value);
    db.execute(
        'UPDATE characters_vehicles SET metadata = ? WHERE ssn = ? AND id = ?',
        [
            JSON.stringify(closestVeh.data.metadata),
            closestVeh.data.ssn,
            closestVeh.data.id,
        ],
        undefined,
        alt.resourceName
    );
};

const saveMods = (vehicle) => {
    if (!vehicle.data) return;
    console.log(vehicle.data);
    vehicle.data.customizations = getMods(vehicle, vehicle.data.model);
    db.execute(
        'UPDATE characters_vehicles SET customizations = ? WHERE ssn = ? AND id = ?',
        [
            JSON.stringify(vehicle.data.customizations),
            vehicle.data.ssn,
            vehicle.data.id,
        ],
        undefined,
        alt.resourceName
    );
};

const saveStatus = (vehicle) => {
    if (!vehicle.data) return;
    vehicle.data.status = getStatus(vehicle);
    db.execute(
        'UPDATE characters_vehicles SET status = ? WHERE ssn = ? AND id = ?',
        [
            JSON.stringify(vehicle.data.status),
            vehicle.data.ssn,
            vehicle.data.id,
        ],
        undefined,
        alt.resourceName
    );
};

const getMods = (vehicle) => {
    const data = {
        modKit: (vehicle.modKit = 1),
        customPrimaryColor: vehicle.customPrimaryColor,
        customSecondaryColor: vehicle.customSecondaryColor,
        neon: vehicle.neon,
        neonColor: vehicle.neonColor,
        interiorColor: vehicle.interiorColor,
        dashboardColor: vehicle.dashboardColor,
        windowTint: vehicle.windowTint,
        Back_Wheels: vehicle.getMod(modType.Back_Wheels), // only for motorcycles
        Spoilers: vehicle.getMod(modType.Spoilers),
        Front_Bumper: vehicle.getMod(modType.Front_Bumper),
        Rear_Bumper: vehicle.getMod(modType.Rear_Bumper),
        Side_Skirt: vehicle.getMod(modType.Side_Skirt),
        Exhaust: vehicle.getMod(modType.Exhaust),
        Frame: vehicle.getMod(modType.Frame),
        Grille: vehicle.getMod(modType.Grille),
        Hood: vehicle.getMod(modType.Hood),
        Fender: vehicle.getMod(modType.Fender),
        Right_Fender: vehicle.getMod(modType.Right_Fender),
        Roof: vehicle.getMod(modType.Roof),
        Engine: vehicle.getMod(modType.Engine),
        Brakes: vehicle.getMod(modType.Brakes),
        Transmission: vehicle.getMod(modType.Transmission),
        Horns: vehicle.getMod(modType.Horns),
        Suspension: vehicle.getMod(modType.Suspension),
        Armor: vehicle.getMod(modType.Armor),
        Turbo: vehicle.getMod(modType.Turbo),
        Xenon: vehicle.getMod(modType.Xenon),
        Front_Wheels: vehicle.getMod(modType.Front_Wheels),
        Util_Shadow_Silver: vehicle.getMod(modType.Util_Shadow_Silver),
        Plate_holders: vehicle.getMod(modType.Plate_holders),
        Trim_Design: vehicle.getMod(modType.Trim_Design),
        Ornaments: vehicle.getMod(modType.Ornaments),
        Dial_Design: vehicle.getMod(modType.Dial_Design),
        Steering_Wheel: vehicle.getMod(modType.Steering_Wheel),
        Shift_Lever: vehicle.getMod(modType.Shift_Lever),
        Plaques: vehicle.getMod(modType.Plaques),
        Hydraulics: vehicle.getMod(modType.Hydraulics),
        Boost: vehicle.getMod(modType.Boost),
        Window_Tint: vehicle.getMod(modType.Window_Tint),
        Livery: vehicle.getMod(modType.Livery),
        Plate: vehicle.getMod(modType.Plate),
        Colour1: vehicle.getMod(modType.Colour1),
        Colour2: vehicle.getMod(modType.Colour2),
    };
    return data;
};

const loadMods = (vehicle, data) => {
    console.log(data);
    vehicle.modKit = 1;
    alt.nextTick(() => {
        vehicle.modKit = data.modKit;
        vehicle.neon = data.neon;
        vehicle.neonColor = data.neonColor;

        vehicle.customPrimaryColor = data.customPrimaryColor;
        vehicle.customSecondaryColor = data.customSecondaryColor;

        vehicle.interiorColor = data.interiorColor;
        vehicle.dashboardColor = data.dashboardColor;
        vehicle.windowTint = data.windowTint;
        vehicle.setMod(modType.Back_Wheels, data.Back_Wheels); // only for motorcycles
        vehicle.setMod(modType.Spoilers, data.Spoilers);
        vehicle.setMod(modType.Front_Bumper, data.Front_Bumper);
        vehicle.setMod(modType.Rear_Bumper, data.Rear_Bumper);
        vehicle.setMod(modType.Side_Skirt, data.Side_Skirt);
        vehicle.setMod(modType.Exhaust, data.Exhaust);
        vehicle.setMod(modType.Frame, data.Frame);
        vehicle.setMod(modType.Grille, data.Grille);
        vehicle.setMod(modType.Hood, data.Hood);
        vehicle.setMod(modType.Fender, data.Fender);
        vehicle.setMod(modType.Right_Fender, data.Right_Fender);
        vehicle.setMod(modType.Roof, data.Roof);
        vehicle.setMod(modType.Engine, data.Engine);
        vehicle.setMod(modType.Brakes, data.Brakes);
        vehicle.setMod(modType.Transmission, data.Transmission);
        vehicle.setMod(modType.Horns, data.Horns);
        vehicle.setMod(modType.Suspension, data.Suspension);
        vehicle.setMod(modType.Armor, data.Armor);
        vehicle.setMod(modType.Turbo, data.Turbo);
        vehicle.setMod(modType.Xenon, data.Xenon);
        vehicle.setMod(modType.Front_Wheels, data.Front_Wheels);
        vehicle.setMod(modType.Util_Shadow_Silver, data.Util_Shadow_Silver);
        vehicle.setMod(modType.Plate_holders, data.Plate_holders);
        vehicle.setMod(modType.Trim_Design, data.Trim_Design);
        vehicle.setMod(modType.Ornaments, data.Ornaments);
        vehicle.setMod(modType.Dial_Design, data.Dial_Design);
        vehicle.setMod(modType.Steering_Wheel, data.Steering_Wheel);
        vehicle.setMod(modType.Shift_Lever, data.Shift_Lever);
        vehicle.setMod(modType.Plaques, data.Plaques);
        vehicle.setMod(modType.Hydraulics, data.Hydraulics);
        vehicle.setMod(modType.Boost, data.Boost);
        vehicle.setMod(modType.Window_Tint, data.Window_Tint);
        vehicle.setMod(modType.Livery, data.Livery);
        vehicle.setMod(modType.Plate, data.Plate);
        vehicle.setMod(modType.Colour1, data.Colour1);
        vehicle.setMod(modType.Colour2, data.Colour2);
    });
};

const getStatus = (vehicle) => {
    const data = {
        destroyed: vehicle.destroyed,
        dirtLevel: vehicle.dirtLevel,
        bodyHealth: vehicle.bodyHealth,

        door_DriverFront: vehicle.getDoorState(indexVehicle.door_DriverFront),
        door_PassengerFront: vehicle.getDoorState(
            indexVehicle.door_PassengerFront
        ),
        door_DriverRear: vehicle.getDoorState(indexVehicle.door_DriverRear),
        door_PassengerRear: vehicle.getDoorState(
            indexVehicle.door_PassengerRear
        ),
        door_Hood: vehicle.getDoorState(indexVehicle.door_Hood),
        door_Trunk: vehicle.getDoorState(indexVehicle.door_Trunk),

        bumperDamageLevel_bumper_FRONT: vehicle.getBumperDamageLevel(
            indexVehicle.bumper_FRONT
        ),
        bumperDamageLevel_bumper_REAR: vehicle.getBumperDamageLevel(
            indexVehicle.bumper_REAR
        ),

        specialLightDamaged_UNKNOWN1: vehicle.isSpecialLightDamaged(
            indexVehicle.light_UNKNOWN1
        ),
        specialLightDamaged_UNKNOWN1: vehicle.isSpecialLightDamaged(
            indexVehicle.light_UNKNOWN1
        ),
        specialLightDamaged_BACK_LEFT: vehicle.isSpecialLightDamaged(
            indexVehicle.light_BACK_LEFT
        ),
        specialLightDamaged_BACK_RIGHT: vehicle.isSpecialLightDamaged(
            indexVehicle.light_BACK_RIGHT
        ),
        specialLightDamaged_LEFT_FRONT: vehicle.isSpecialLightDamaged(
            indexVehicle.light_LEFT_FRONT
        ),
        specialLightDamaged_RIGHT_FRONT: vehicle.isSpecialLightDamaged(
            indexVehicle.light_RIGHT_FRONT
        ),

        lightDamaged_UNKNOWN1: vehicle.isLightDamaged(
            indexVehicle.light_UNKNOWN1
        ),
        lightDamaged_UNKNOWN1: vehicle.isLightDamaged(
            indexVehicle.light_UNKNOWN1
        ),
        lightDamaged_BACK_LEFT: vehicle.isLightDamaged(
            indexVehicle.light_BACK_LEFT
        ),
        lightDamaged_BACK_RIGHT: vehicle.isLightDamaged(
            indexVehicle.light_BACK_RIGHT
        ),
        lightDamaged_LEFT_FRONT: vehicle.isLightDamaged(
            indexVehicle.light_LEFT_FRONT
        ),
        lightDamaged_RIGHT_FRONT: vehicle.isLightDamaged(
            indexVehicle.light_RIGHT_FRONT
        ),

        armoredWindowHealth_CREEN: vehicle.getArmoredWindowHealth(
            indexVehicle.windows_CREEN
        ),
        armoredWindowHealth_CREEN_R: vehicle.getArmoredWindowHealth(
            indexVehicle.windows_CREEN_R
        ),
        armoredWindowHealth_LF: vehicle.getArmoredWindowHealth(
            indexVehicle.windows_LF
        ),
        armoredWindowHealth_RF: vehicle.getArmoredWindowHealth(
            indexVehicle.windows_RF
        ),
        armoredWindowHealth_LR: vehicle.getArmoredWindowHealth(
            indexVehicle.windows_LR
        ),
        armoredWindowHealth_RR: vehicle.getArmoredWindowHealth(
            indexVehicle.windows_RR
        ),
        armoredWindowHealth_LM: vehicle.getArmoredWindowHealth(
            indexVehicle.windows_LM
        ),
        armoredWindowHealth_RM: vehicle.getArmoredWindowHealth(
            indexVehicle.windows_RM
        ),

        front_BumperDamage: vehicle.getBumperDamageLevel(
            indexVehicle.bumper_FRONT
        ),
        rear_BumperDamage: vehicle.getBumperDamageLevel(
            indexVehicle.bumper_REAR
        ),

        partId_FrontLeft: vehicle.getPartDamageLevel(
            indexVehicle.partId_FrontLeft
        ),
        partId_FrontRight: vehicle.getPartDamageLevel(
            indexVehicle.partId_FrontRight
        ),
        partId_MiddleLeft: vehicle.getPartDamageLevel(
            indexVehicle.partId_MiddleLeft
        ),
        partId_MiddleRight: vehicle.getPartDamageLevel(
            indexVehicle.partId_MiddleRight
        ),
        partId_RearLeft: vehicle.getPartDamageLevel(
            indexVehicle.partId_RearLeft
        ),
        partId_RearRight: vehicle.getPartDamageLevel(
            indexVehicle.partId_RearRight
        ),
    };
    return data;
};

const reloadMods = (source) => {
    const vehicle = source.vehicle;
    if (!vehicle.data.customizations) return;
    loadMods(vehicle, vehicle.data.customizations);
};

const loadStatus = (vehicle, data) => {
    alt.nextTick(() => {
        vehicle.dirtLevel = data.dirtLevel;
        vehicle.bodyHealth = data.bodyHealth;

        vehicle.setDoorState(
            indexVehicle.door_DriverFront,
            data.door_DriverFront
        ),
            vehicle.setDoorState(
                indexVehicle.door_PassengerFrontdoor_DriverFront,
                data.door_PassengerFront
            ),
            vehicle.setDoorState(
                indexVehicle.door_DriverReardoor_DriverFront,
                data.door_DriverRear
            ),
            vehicle.setDoorState(
                indexVehicle.door_PassengerReardoor_DriverFront,
                data.door_PassengerRear
            ),
            vehicle.setDoorState(
                indexVehicle.door_Hooddoor_DriverFront,
                data.door_Hood
            ),
            vehicle.setDoorState(
                indexVehicle.door_Trunkdoor_DriverFront,
                data.door_Trunk
            ),
            vehicle.setBumperDamageLevel(
                indexVehicle.bumper_FRONT,
                data.bumperDamageLevel_bumper_FRONT
            ),
            vehicle.setBumperDamageLevel(
                indexVehicle.bumper_REAR,
                data.bumperDamageLevel_bumper_REAR
            ),
            vehicle.setSpecialLightDamaged(
                indexVehicle.light_UNKNOWN1,
                data.specialLightDamaged_UNKNOWN1
            ),
            vehicle.setSpecialLightDamaged(
                indexVehicle.light_UNKNOWN1,
                data.specialLightDamaged_UNKNOWN1
            ),
            vehicle.setSpecialLightDamaged(
                indexVehicle.light_BACK_LEFT,
                data.specialLightDamaged_BACK_LEFT
            ),
            vehicle.setSpecialLightDamaged(
                indexVehicle.light_BACK_RIGHT,
                data.specialLightDamaged_BACK_RIGHT
            ),
            vehicle.setSpecialLightDamaged(
                indexVehicle.light_LEFT_FRONT,
                data.specialLightDamaged_LEFT_FRONT
            ),
            vehicle.setSpecialLightDamaged(
                indexVehicle.light_RIGHT_FRONT,
                data.specialLightDamaged_RIGHT_FRONT
            ),
            vehicle.setLightDamaged(
                indexVehicle.light_UNKNOWN1,
                data.lightDamaged_UNKNOWN1
            ),
            vehicle.setLightDamaged(
                indexVehicle.light_UNKNOWN1,
                data.lightDamaged_UNKNOWN1
            ),
            vehicle.setLightDamaged(
                indexVehicle.light_BACK_LEFT,
                data.lightDamaged_BACK_LEFT
            ),
            vehicle.setLightDamaged(
                indexVehicle.light_BACK_RIGHT,
                data.lightDamaged_BACK_RIGHT
            ),
            vehicle.setLightDamaged(
                indexVehicle.light_LEFT_FRONT,
                data.lightDamaged_LEFT_FRONT
            ),
            vehicle.setLightDamaged(
                indexVehicle.light_RIGHT_FRONT,
                data.lightDamaged_RIGHT_FRONT
            ),
            vehicle.setArmoredWindowHealth(
                indexVehicle.windows_CREEN,
                data.armoredWindowHealth_CREEN
            );
        vehicle.setArmoredWindowHealth(
            indexVehicle.windows_CREEN_R,
            data.armoredWindowHealth_CREEN_R
        );
        vehicle.setArmoredWindowHealth(
            indexVehicle.windows_LF,
            data.armoredWindowHealth_LF
        );
        vehicle.setArmoredWindowHealth(
            indexVehicle.windows_RF,
            data.armoredWindowHealth_RF
        );
        vehicle.setArmoredWindowHealth(
            indexVehicle.windows_LR,
            data.armoredWindowHealth_LR
        );
        vehicle.setArmoredWindowHealth(
            indexVehicle.windows_RR,
            data.armoredWindowHealth_RR
        );
        vehicle.setArmoredWindowHealth(
            indexVehicle.windows_LM,
            data.armoredWindowHealth_LM
        );
        vehicle.setArmoredWindowHealth(
            indexVehicle.windows_RM,
            data.armoredWindowHealth_RM
        );

        vehicle.setPartDamageLevel(
            indexVehicle.partId_FrontLeft,
            data.partId_FrontLeft
        );
        vehicle.setPartDamageLevel(
            indexVehicle.partId_FrontRight,
            data.partId_FrontRight
        );
        vehicle.setPartDamageLevel(
            indexVehicle.partId_MiddleLeft,
            data.partId_MiddleLeft
        );
        vehicle.setPartDamageLevel(
            indexVehicle.partId_MiddleRight,
            data.partId_MiddleRight
        );
        vehicle.setPartDamageLevel(
            indexVehicle.partId_RearLeft,
            data.partId_RearLeft
        );
        vehicle.setPartDamageLevel(
            indexVehicle.partId_RearRight,
            data.partId_RearRight
        );
    });
};
// const updateVehiclePosition = (vehicle) => {
//     vehicle.data.position = vehicle.pos
//     db.execute('UPDATE characters_vehicles SET position = ? WHERE ssn = ?', [JSON.stringify(vehicle.data.position), vehicle.data.ssn], undefined, alt.resourceName)
// }

export default {
    pool,
    generatePlate,
    loadSourceGarage,
    addToSource,
    spawn,
    spawnById,
    sourceEnteredInVehicle,
    sourceLeavesVehicle,
    handleToggleEngine,
    getVehicleData,
    putInGarage,
    setMod,
    saveMods,
    setColor,
    loadMods,
    reloadMods,
    hasFuel,
    fuelTankSize,
    reFuel,
    fuelType,
    setNeon,
};
