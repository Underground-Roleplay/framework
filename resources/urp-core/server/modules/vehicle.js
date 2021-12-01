import * as alt from 'alt-server';
import Core from '../main';

import { executeSync, insertSync, getVectorInFrontOfPlayer } from '../libs/utils';

const createPlate = async () => {
    let uniqueFound = false
    let plate = undefined;
    while(!uniqueFound){
        plate = `${Math.floor(Math.random() * 1000)}-${ Math.floor(Math.random() * 10000)}` 
        const result = await executeSync('SELECT COUNT(*) as count FROM vehicles WHERE plate = ?', [ plate ])
        if (result[0]['count'] == 0) {
            uniqueFound = true
        }
    }
    return plate
}

const loadGarage = async (source) => {
    const result = await executeSync('SELECT * from vehicles WHERE ssn = ?', [source.playerData.ssn], undefined, alt.resourceName)
    for (let i = 0; i < result.length; i++) {
        const vehicleData = result[i]
        if(vehicleData){
            vehicleData.metadata = JSON.parse(vehicleData.metadata)
            vehicleData.status = JSON.parse(vehicleData.status)
            vehicleData.plate = vehicleData.plate
            vehicleData.id = vehicleData.id
        }
        alt.log(`id: ${vehicleData.id} model: ${vehicleData.metadata.model} plate: ${vehicleData.plate}`)
    }
    
}   


const addVehicle = async (source, model) => {
    const vehicle = new alt.Vehicle(model, 0, 0, 0, 0, 0, 0)
    const status = getVehicleCondition(vehicle)
    const metadata = {model : model}
    const plate = await createPlate()
    vehicle.numberPlateText = plate
    if(vehicle && plate) {
        await insertSync('INSERT INTO vehicles (ssn, plate, metadata, status) VALUES (?,?,?,?)', [source.playerData.ssn, plate, JSON.stringify(metadata), JSON.stringify(status)])
        vehicle.destroy()
    }
}




const getVehicleCondition = (vehicles) => {
    const statusVehicles = {
        //Damage
        bumperDamage_f: vehicles.getBumperDamageLevel(1),
        bumperDamage_b: vehicles.getBumperDamageLevel(2),

        //DOORS
        door_state_fl: vehicles.getDoorState(0),
        door_state_fr: vehicles.getDoorState(1),
        door_state_rl: vehicles.getDoorState(2),
        door_state_rr: vehicles.getDoorState(3),

        //PART Bullets
        PartBullet_fl: vehicles.getPartBulletHoles(0),
        PartBullet_fr: vehicles.getPartBulletHoles(1),
        PartBullet_ml: vehicles.getPartBulletHoles(2),
        PartBullet_mr: vehicles.getPartBulletHoles(3),
        PartBullet_bl: vehicles.getPartBulletHoles(4),
        PartBullet_br: vehicles.getPartBulletHoles(5),

        //PART DAMAGE LEVEL
        partDamageLevel_fl: vehicles.getPartDamageLevel(0),
        partDamageLevel_fr: vehicles.getPartDamageLevel(1),
        partDamageLevel_ml: vehicles.getPartDamageLevel(2),
        partDamageLevel_mr: vehicles.getPartDamageLevel(3),
        partDamageLevel_rl: vehicles.getPartDamageLevel(4),
        partDamageLevel_rr: vehicles.getPartDamageLevel(5),

        //WHEEL
        wlH_fl: vehicles.getWheelHealth(0),
        wlH_fr: vehicles.getWheelHealth(1),
        wlH_ml: vehicles.getWheelHealth(2),
        wlH_mr: vehicles.getWheelHealth(3),
        wlH_bl: vehicles.getWheelHealth(4),
        wlH_br: vehicles.getWheelHealth(5),
        wlHTrl_ml: vehicles.getWheelHealth(45),
        wlHTrl_mr: vehicles.getWheelHealth(46),


        //WHEEL Burst
        wlB_fl: vehicles.isWheelBurst(0),
        wlB_fr: vehicles.isWheelBurst(1),
        wlB_ml: vehicles.isWheelBurst(2),
        wlB_mr: vehicles.isWheelBurst(3),
        wlB_bl: vehicles.isWheelBurst(4),
        wlB_br: vehicles.isWheelBurst(5),
        wlBTrl_ml: vehicles.isWheelBurst(45),
        wlBTrl_mr: vehicles.isWheelBurst(46),

        //WHEEL Detached
        wlD_fl: vehicles.isWheelDetached(0),
        wlD_fr: vehicles.isWheelDetached(1),
        wlD_ml: vehicles.isWheelDetached(2),
        wlD_mr: vehicles.isWheelDetached(3),
        wlD_bl: vehicles.isWheelDetached(4),
        wlD_br: vehicles.isWheelDetached(5),
        wlDTrl_ml: vehicles.isWheelDetached(45),
        wlDTrl_mr: vehicles.isWheelDetached(46),

        //WINDOM DAMAGE

        WinDamage_fr: vehicles.isWindowDamaged(0),
        WinDamage_fl: vehicles.isWindowDamaged(1),
        WinDamage_rr: vehicles.isWindowDamaged(2),
        WinDamage_rl: vehicles.isWindowDamaged(3),

        //WINDOM OPEN
        WinOpen_fr: vehicles.isWindowOpened(0),
        WinOpen_fl: vehicles.isWindowOpened(1),
        WinOpen_rr: vehicles.isWindowOpened(2),
        WinOpen_rl: vehicles.isWindowOpened(3),

        //windows
        hasArmored: vehicles.hasArmoredWindows,
        armoured_w_health_fr: vehicles.getArmoredWindowHealth(0),
        armoured_w_health_fl: vehicles.getArmoredWindowHealth(1),
        armoured_w_health_br: vehicles.getArmoredWindowHealth(2),
        armoured_w_health_bl: vehicles.getArmoredWindowHealth(3),

        armoured_w_shootCount_fr: vehicles.getArmoredWindowShootCount(0),
        armoured_w_shootCount_fl: vehicles.getArmoredWindowShootCount(1),
        armoured_w_shootCount_br: vehicles.getArmoredWindowShootCount(2),
        armoured_w_shootCount_bl: vehicles.getArmoredWindowShootCount(3),
        //Extra() ???

        light_01: vehicles.isLightDamaged(0),
        light_02: vehicles.isLightDamaged(1),
        light_03: vehicles.isLightDamaged(2),
        light_04: vehicles.isLightDamaged(3),
        light_05: vehicles.isLightDamaged(4),

        dirt_level: vehicles.dirtLevel,
        isEngineON: vehicles.engineOn,
        isLocked: vehicles.lockState,
        bodyAdditionalHealth: vehicles.bodyAdditionalHealth,
        engineHealth: vehicles.engineHealth,
        petrolTankHealth: vehicles.petrolTankHealth,
        bodyHealth: vehicles.bodyHealth,
    }
    return statusVehicles
}

const spawnVehicle = async (source, id) => {
    const result = await executeSync('SELECT * from vehicles WHERE ssn = ? AND id = ?', [source.playerData.ssn, id])
    const vehicleData = result[0]
    if(vehicleData){
        vehicleData.metadata = JSON.parse(vehicleData.metadata)
        vehicleData.status = JSON.parse(vehicleData.status)
        vehicleData.plate = vehicleData.plate
        const fwd = getVectorInFrontOfPlayer(source, 5)
        const vehicle = new alt.Vehicle(vehicleData.metadata.model, fwd.x, fwd.y, fwd.z, 0, 0, 0)
        vehicle.numberPlateText = vehicleData.plate
        setVehicleCondition(vehicle, vehicleData.status)
    }
    // alt.log(`id: ${vehicleData.id} model: ${vehicleData.metadata.model} plate: ${vehicleData.plate}`)
}  

const setVehicleCondition = (vehicle, status) => {
    //alt.nextTick(() => {
        vehicle.dirtLevel = status.dirt_level;
        vehicle.engineOn = status.isEngineON;
        vehicle.lockState = status.isLocked;
        vehicle.bodyAdditionalHealth = status.bodyAdditionalHealth;
        vehicle.engineHealth = status.engineHealth;
        vehicle.petrolTankHealth = status.petrolTankHealth;
        vehicle.bodyHealth = status.bodyHealth;

        //Damage
        vehicle.setBumperDamageLevel(0, status.bumperDamage_f);
        vehicle.setBumperDamageLevel(1, status.bumperDamage_b);

        //DOORS
        vehicle.setDoorState(0, status.door_state_fl);
        vehicle.setDoorState(1, status.door_state_fr);
        vehicle.setDoorState(2, status.door_state_rl);
        vehicle.setDoorState(3, status.door_state_rr);

        //PART Bullets
        vehicle.setPartBulletHoles(0, status.PartBullet_fl);
        vehicle.setPartBulletHoles(1, status.PartBullet_fr);
        vehicle.setPartBulletHoles(2, status.PartBullet_ml);
        vehicle.setPartBulletHoles(3, status.PartBullet_mr);
        vehicle.setPartBulletHoles(4, status.PartBullet_bl);
        vehicle.setPartBulletHoles(5, status.PartBullet_br);

        //PART DAMAGE LEVEL
        vehicle.setPartDamageLevel(0, status.partDamageLevel_fl);
        vehicle.setPartDamageLevel(1, status.partDamageLevel_fr);
        vehicle.setPartDamageLevel(2, status.partDamageLevel_ml);
        vehicle.setPartDamageLevel(3, status.partDamageLevel_mr);
        vehicle.setPartBulletHoles(4, status.partDamageLevel_rl);
        vehicle.setPartBulletHoles(5, status.partDamageLevel_rr);

        //WHEEL
        vehicle.setWheelHealth(0, status.wlH_fl);
        vehicle.setWheelHealth(1, status.wlH_fr);
        vehicle.setWheelHealth(2, status.wlH_ml);
        vehicle.setWheelHealth(3, status.wlH_mr);
        vehicle.setWheelHealth(4, status.wlH_bl);
        vehicle.setWheelHealth(5, status.wlH_br);
        vehicle.setWheelHealth(45, status.wlHTrl_ml);
        vehicle.setWheelHealth(46, status.wlHTrl_mr);


        //WHEEL Burst
        vehicle.setWheelBurst(0, status.wlB_fl);
        vehicle.setWheelBurst(1, status.wlB_fr);
        vehicle.setWheelBurst(2, status.wlB_ml);
        vehicle.setWheelBurst(3, status.wlB_mr);
        vehicle.setWheelBurst(4, status.wlB_bl);
        vehicle.setWheelBurst(5, status.wlB_br);
        vehicle.setWheelBurst(45, status.wlBTrl_ml);
        vehicle.setWheelBurst(46, status.wlBTrl_mr);

        vehicle.setWheelDetached(0, status.wlD_fl);
        vehicle.setWheelDetached(1, status.wlD_fr);
        vehicle.setWheelDetached(2, status.wlD_ml);
        vehicle.setWheelDetached(3, status.wlD_mr);
        vehicle.setWheelDetached(4, status.wlD_bl);
        vehicle.setWheelDetached(5, status.wlD_br);
        vehicle.setWheelDetached(45, status.wlDTrl_ml);
        vehicle.setWheelDetached(46, status.wlDTrl_mr);


        //WINDOM DAMAGE
        vehicle.setWindowDamaged(0, status.WinDamage_fr);
        vehicle.setWindowDamaged(1, status.WinDamage_fl);
        vehicle.setWindowDamaged(2, status.WinDamage_rr);
        vehicle.setWindowDamaged(3, status.WinDamage_rl);



        //WINDOM OPEN
        vehicle.setWindowOpened(0, status.WinOpen_fr);
        vehicle.setWindowOpened(1, status.WinOpen_fl);
        vehicle.setWindowOpened(2, status.WinOpen_rr);
        vehicle.setWindowOpened(3, status.WinOpen_rl);

        //windows
        vehicle.setArmoredWindowHealth(0, status.armoured_w_health_fr);
        vehicle.setArmoredWindowHealth(1, status.armoured_w_health_fl);
        vehicle.setArmoredWindowHealth(2, status.armoured_w_health_br);
        vehicle.setArmoredWindowHealth(3, status.armoured_w_health_bl);

        vehicle.setArmoredWindowShootCount(0, status.armoured_w_shootCount_fr);
        vehicle.setArmoredWindowShootCount(1, status.armoured_w_shootCount_fl);
        vehicle.setArmoredWindowShootCount(2, status.armoured_w_shootCount_br);
        vehicle.setArmoredWindowShootCount(3, status.armoured_w_shootCount_bl);

        vehicle.setLightDamaged(0, status.light_01);
        vehicle.setLightDamaged(1, status.light_02);
        vehicle.setLightDamaged(2, status.light_03);
        vehicle.setLightDamaged(3, status.light_04);
        vehicle.setLightDamaged(4, status.light_05);
    //})

}


export default { addVehicle, loadGarage, spawnVehicle }