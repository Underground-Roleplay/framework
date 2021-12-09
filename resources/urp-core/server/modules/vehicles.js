import * as alt from 'alt-server';

import db from 'mysql2-wrapper';

import Core from '../main';

import { executeSync, insertSync } from '../libs/utils';
import { emit } from 'alt-shared';

const pool = {}

const generatePlate = async() => {
    let uniqueFound = false
    let plate = undefined;
    while (!uniqueFound) {
        plate = `${Math.floor(Math.random() * 1000)}-${ Math.floor(Math.random() * 10000)}`
        const result = await executeSync('SELECT COUNT(*) as count from characters_vehicles WHERE plate = ?', [plate])
        if (result[0]['count'] == 0) {
            uniqueFound = true
        }
    }
    return plate
}

const loadSourceGarage = async(source) => {

    const vehList = []
    const result = await executeSync('SELECT * from characters_vehicles WHERE ssn = ?', [source.playerData.ssn])
    for (let i = 0; i < result.length; i++) {
        const vehicleData = result[i]
        if (vehicleData) {
            vehicleData.position = JSON.parse(vehicleData.position)
            vehicleData.status = JSON.parse(vehicleData.status)
            vehicleData.metadata = JSON.parse(vehicleData.metadata)
            vehicleData.customizations = JSON.parse(vehicleData.customizations)
            vehList.push(vehicleData)
        }
        //alt.log(`id: ${vehicleData.id} model: ${vehicleData.model} plate: ${vehicleData.plate}`)

    }
    alt.emit('loaded', source, vehList)
}


const addToSource = async(source, model, initialPosition = { x: 0, y: 0, z: 0 }, spawn = false) => {
    const { ssn } = source.playerData
        //New vehicle DATA
    const newVehicle = {}
    newVehicle.model = model
    newVehicle.position = initialPosition
    newVehicle.plate = await generatePlate()
    newVehicle.status = {}
    newVehicle.metadata = { fuel: 100 }
    newVehicle.customizations = {}
    const id = await insertSync('INSERT INTO characters_vehicles (ssn, model, position, plate, status, metadata, customizations) VALUES (?,?,?,?,?,?,?)', [ssn, newVehicle.model, JSON.stringify(newVehicle.position), newVehicle.plate, JSON.stringify(newVehicle.status), JSON.stringify(newVehicle.metadata), JSON.stringify(newVehicle.customizations)])

    newVehicle.id = id

    if (!spawn) {
        return id
    }

    spawn(newVehicle)
}

const spawn = (vehicleData, pos, rot) => {
    if (pool[vehicleData.id]) {
        throw new Error('Vehicle already spawned')
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
    )

    pool[vehicleData.id] = vehicle

    vehicle.data = vehicleData

    vehicle.numberPlateText = vehicleData.plate

    vehicle.engineOn = false

    if (vehicleData.customizations.primaryColor && vehicleData.customizations.customSecondaryColor) {
        vehicle.customPrimaryColor = vehicleData.customizations.primaryColor;
        vehicle.customSecondaryColor = vehicleData.customizations.customSecondaryColor;
    }

    if (vehicleData.status) {
        // setVehicleStatus(vehicle, vehicleData.status)
    }

    if (vehicleData.metadata.trunk) {
        vehicle.setStreamSyncedMeta('trunk', vehicleData.trunk)
    }

    vehicle.setStreamSyncedMeta('fuel', vehicleData.metadata.fuel)
    vehicle.setStreamSyncedMeta('owner', vehicleData.ssn)
    vehicle.setStreamSyncedMeta('engine', false)

    vehicleTick(vehicle)

    return vehicle
}

const spawnById = async(source, id, pos, rot) => {
    const vehicleData = await executeSync('SELECT * from characters_vehicles WHERE ssn = ? AND id = ?', [source.playerData.ssn, id])
    if (!vehicleData[0]) return undefined;
    vehicleData[0].position = JSON.parse(vehicleData[0].position)
    vehicleData[0].status = JSON.parse(vehicleData[0].status)
    vehicleData[0].metadata = JSON.parse(vehicleData[0].metadata)
    vehicleData[0].customizations = JSON.parse(vehicleData[0].customizations)
    spawn(vehicleData[0], pos, rot)
}

const sourceEnteredInVehicle = (source, vehicle, seat) => {
    if (!vehicle.data) return;
    if (!pool[vehicle.data.id]) return;
    if (seat === 1) {
        if (vehicle.data.ssn === source.playerData.ssn) {
            console.info("(" + source.playerData.ssn + ") entrou do seu veiculo em x:" + vehicle.pos.x + " y:" + vehicle.pos.y + " z:" + vehicle.pos.z);
        } else {
            console.info("(" + source.playerData.ssn + ") entrou num veiculo registrado para o ssn" + vehicle.data.ssn + " em x:" + vehicle.pos.x + " y:" + vehicle.pos.y + " z:" + vehicle.pos.z);
        }
        // alt.emitClient(player, 'vehicle:carData', vehicle.data.info)
    }
}

const sourceLeavesVehicle = (source, vehicle, seat) => {
    if (!vehicle.data) return;
    if (!pool[vehicle.data.id]) return;
    if (seat === 1) {
        if (vehicle.data.ssn === source.playerData.ssn) {
            console.info("(" + source.playerData.ssn + ") saiu de seu veiculo em x:" + vehicle.pos.x + " y:" + vehicle.pos.y + " z:" + vehicle.pos.z);
        } else {
            console.info("(" + source.playerData.ssn + ") saiu de um veiculo registrado para o ssn" + vehicle.data.ssn + " em x:" + vehicle.pos.x + " y:" + vehicle.pos.y + " z:" + vehicle.pos.z);
        }
        // If car in future will stay spawned
        // updateVehiclePosition(vehicle)
    }
}

const vehicleTick = (vehicle) => {
    vehicle.timeoutTicker = setTimeout(() => { vehicleTick(vehicle) }, 10000)

    if (!vehicle.nextUpdate) {
        vehicle.nextUpdate = Date.now() + Core.Config.VehicleUpdate;
    }

    if (Date.now() > vehicle.nextUpdate) {
        vehicle.nextUpdate = Date.now() + Core.Config.VehicleUpdate;
        updateFuel(vehicle)
    }
}

const handleToggleEngine = (source, vehicle) => {
    if (!vehicle || !vehicle.valid) {
        return;
    }

    if (source !== vehicle.driver) return;

    if (vehicle.data.metadata.fuel <= 0) {
        vehicle.engineOn = false;
        vehicle.setStreamSyncedMeta('engine', vehicle.engineOn);
        if (source) {
            alt.emitClient(source, 'notify', 'error', Core.Translate('VEHICLES.LABEL'), Core.Translate('VEHICLES.NO_FUEL'))
        }
        return;
    }

    if (vehicle.engineOn) {
        vehicle.engineOn = false;
        if (source) {
            alt.emitClient(source, 'notify', 'success', Core.Translate('VEHICLES.LABEL'), Core.Translate('VEHICLES.ENGINE_OFF'))
        }
        vehicle.setStreamSyncedMeta('engine', vehicle.engineOn);
    } else {
        vehicle.engineOn = true;
        if (source) {
            alt.emitClient(source, 'notify', 'success', Core.Translate('VEHICLES.LABEL'), Core.Translate('VEHICLES.ENGINE_ON'))
        }
        vehicle.setStreamSyncedMeta('engine', vehicle.engineOn);
    }
}

const updateFuel = (vehicle) => {
    if (!vehicle.engineOn) return;
    if (!isNaN(vehicle.data.metadata.fuel)) {
        vehicle.data.metadata.fuel = vehicle.data.metadata.fuel;
    } else {
        vehicle.data.metadata.fuel = 100;
        vehicle.data.metadata.fuel = 100;
    }

    vehicle.data.metadata.fuel -= Core.Config.VehicleFuelLost

    if (vehicle.data.metadata.fuel < 0) {
        vehicle.data.metadata.fuel = 0;
        if (vehicle.engineOn) {
            vehicle.engineOn = false
            vehicle.setStreamSyncedMeta('engine', vehicle.engineOn);
            if (vehicle.driver) {
                alt.emitClient(vehicle.driver, 'notify', 'error', Core.Translate('VEHICLES.LABEL'), Core.Translate('VEHICLES.NO_FUEL'))
            }
        }
    }

    vehicle.data.metadata.fuel = vehicle.data.metadata.fuel.toFixed(2)
    vehicle.setStreamSyncedMeta('fuel', vehicle.data.metadata.fuel);
    saveVehicleMetadata(vehicle)
}

const saveVehicleMetadata = (vehicle) => {
    const { metadata, id } = vehicle.data
    db.execute('UPDATE characters_vehicles SET metadata = ? WHERE ssn = ? AND id = ?', [JSON.stringify(metadata), vehicle.data.ssn, id], undefined, alt.resourceName)
}

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
    handleToggleEngine
}