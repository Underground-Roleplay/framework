
import * as natives from 'natives';
import * as alt from 'alt-client';

import Core from 'urp-core';


let isVehicle = false;
let hud;

const localPlayer = alt.Player.local;

alt.on('enteredVehicle', (vehicle, seat) => {
    hud = new alt.WebView('http://resource/client/html/hud.html');
    isVehicle = true;

})
alt.on('leftVehicle', (vehicle, seat) => {
    isVehicle = false;
    hud.destroy()

})


alt.everyTick(() => {
    if(!isVehicle) return;
    if(!localPlayer.vehicle){
        natives.displayRadar(false)
    }else{
        natives.displayRadar(true)
    }

    let CarRPM = alt.Player.local.vehicle.rpm
	let CarSpeed = alt.Player.local.vehicle.speed
	let CarGear = alt.Player.local.vehicle.gear
	let CarMph = (CarSpeed * 2.236936).toFixed()
	let CarKmh = (CarSpeed * 3.6).toFixed()
    let CalcRpm = (CarRPM * 9);
       
    const data = {
        ShowHud: true,
		CurrentCarRPM:CarRPM,
		CurrentCarSpeed:CarSpeed,
		CurrentCarGear:CarGear,
		CurrentCarMph:CarMph,
		CurrentCarKmh:CarKmh,
		CurrentCalcRpm:CalcRpm,
    }
    hud.emit('speedometer:data', data)
})


