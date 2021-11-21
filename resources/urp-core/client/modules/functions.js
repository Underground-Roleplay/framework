import * as alt from 'alt-client';
import * as natives from 'natives';

const startTicks = () => {
    alt.log('started ticks to server')
    alt.setInterval(()=> {
        alt.emitServer('Core:Server:CharacterTick')
    }, 5000)
}

const handleSetplayerData = (key, value) => {
    if(!alt.Player.local.playerData) {
        alt.Player.local.playerData = {}
    }

    alt.emit('playerData:changed', key, value, alt.Player.local.playerData[key])
    alt.Player.local.playerData[key] = value;
    alt.log('[DEBUG] player meta for', key, 'updated')
}


const getPlayerData = (key) => {
    if(!alt.Player.local.playerData[key]) return {};
    return alt.Player.local.playerData[key]
}


const drawText = (x, y, width, height, scale, {r, g, b, a}, text) => {
    natives.setTextFont(4)
    natives.setTextProportional(0)
    natives.setTextScale(scale, scale)
    natives.setTextColour(r, g, b, a)
    natives.setTextDropShadow(0, 0, 0, 0, 255)
    natives.setTextEdge(2, 0, 0, 0, 255)
    natives.setTextDropShadow()
    natives.setTextOutline()
    natives.setTextEntry('STRING')
    natives.addTextComponentString(text)
    natives.drawText(x - width / 2, y - height / 2 + 0.005)
}

const drawText3D = (x, y, z, text) => {
    natives.setTextScale(0.35, 0.35)
    natives.setTextFont(4)
    natives.setTextProportional(1)
    natives.setTextColour(255, 255, 255, 215)
    natives.setTextEntry('STRING')
    natives.setTextCentre(true)
    natives.addTextComponentString(text)
    natives.setDrawOrigin(x, y, z, 0)
    natives.drawText(0.0, 0.0)
    const factor = (text.length) / 370
    natives.drawRect(0.0, 0.0 + 0.0125, 0.017 + factor, 0.03, 0, 0, 0, 75)
    natives.clearDrawOrigin()
}

export default {drawText, drawText3D, startTicks, handleSetplayerData, getPlayerData}