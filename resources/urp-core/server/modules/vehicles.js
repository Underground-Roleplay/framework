import * as alt from 'alt-server';
import { executeSync, insertSync } from '../libs/utils';
// import Core from '../main';

const pool = {}

const generatePlate = async () => {
    let uniqueFound = false
    let plate = undefined;
    while(!uniqueFound){
        plate = `${Math.floor(Math.random() * 1000)}-${ Math.floor(Math.random() * 10000)}` 
        const result = await executeSync('SELECT COUNT(*) as count from characters_vehicles WHERE plate = ?', [ plate ])
        if (result[0]['count'] == 0) {
            uniqueFound = true
        }
    }
    return plate
}

const loadSourceGarage = async (source) => {
    const result = await executeSync('SELECT * from characters_vehicles WHERE ssn = ?', [source.playerData.ssn])
    for (let i = 0; i < result.length; i++) {
        const vehicleData = result[i]
        if(vehicleData){
            vehicleData.position = JSON.parse(vehicleData.position)
            vehicleData.status = JSON.parse(vehicleData.status)
            vehicleData.metadata = JSON.parse(vehicleData.metadata)
            vehicleData.customizations = JSON.parse(vehicleData.customizations)
        }
        alt.log(`id: ${vehicleData.id} model: ${vehicleData.model} plate: ${vehicleData.plate}`)
    }
}   


const addToSource = async (source, model, initialPosition = {x:0, y: 0, z:0}, spawn = false) => {
    const { ssn } = source.playerData
    //New vehicle DATA
    const newVehicle = {}
    newVehicle.model = model
    newVehicle.position = initialPosition
    newVehicle.plate = await generatePlate()
    newVehicle.status = {}
    newVehicle.metadata = {fuel: 100}
    newVehicle.customizations = {}
    const id = await insertSync('INSERT INTO characters_vehicles (ssn, model, position, plate, status, metadata, customizations) VALUES (?,?,?,?,?,?,?)', 
    [ssn, newVehicle.model, JSON.stringify(newVehicle.position), newVehicle.plate, JSON.stringify(newVehicle.status), JSON.stringify(newVehicle.metadata), JSON.stringify(newVehicle.customizations)])

    newVehicle.id = id

    if(!spawn){
        return id
    }

    spawn(newVehicle)
}

const spawn = (vehicleData, pos) => {
    if(pool[vehicleData.id]){
        throw new Error('Vehicle already spawned')
    }

    if (pos) {
        vehicleData.position = pos;
    }

    const vehicle = new alt.Vehicle(
        vehicleData.model,
        vehicleData.position.x,
        vehicleData.position.y,
        vehicleData.position.z,
        0,
        0,
        0
    )

    pool[vehicleData.id] = vehicle

    vehicle.numberPlateText = vehicleData.plate

    if(vehicleData.customizations.primaryColor && vehicleData.customizations.customSecondaryColor){
        vehicle.customPrimaryColor = vehicleData.customizations.primaryColor;
        vehicle.customSecondaryColor = vehicleData.customizations.customSecondaryColor;
    }

    if(vehicleData.status){
        // setVehicleStatus(vehicle, vehicleData.status)
    }

    if(vehicleData.metadata.trunk){
        vehicle.setStreamSyncedMeta('trunk', vehicleData.trunk)
    }

    vehicle.setStreamSyncedMeta('fuel', vehicleData.metadata.fuel)
    vehicle.setStreamSyncedMeta('owner', vehicleData.ssn)

    return vehicle
}

const spawnById = async (source, id, pos) => {
    const vehicleData = await executeSync('SELECT * from characters_vehicles WHERE ssn = ? AND id = ?', [source.playerData.ssn, id])
    if(!vehicleData[0]) return undefined;
    vehicleData[0].position = JSON.parse(vehicleData[0].position)
    vehicleData[0].status = JSON.parse(vehicleData[0].status)
    vehicleData[0].metadata = JSON.parse(vehicleData[0].metadata)
    vehicleData[0].customizations = JSON.parse(vehicleData[0].customizations)
    spawn(vehicleData[0], pos)
}

export default {pool, generatePlate, loadSourceGarage, addToSource, spawn, spawnById}