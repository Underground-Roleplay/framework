import Core from 'urp-core';
import chat from 'urp-chat';
import * as alt from 'alt-client';
import * as natives from 'natives'

let isOpen = false
let Aroupa = []

const openSkinshop = (data) => {
    natives.freezeEntityPosition(alt.Player.local.scriptID, true);
    alt.emitServer('Skinshop:refresh')
    Core.Browser.open('http://resources/urp-skinshop/client/html/ui.html', true, false)
    Core.Browser.on('Skinshop:close', () => {
        closeSkinshop()
    })
    Core.Browser.on('Skinshop:att', (i, component, color) => {
        alt.emitServer('Skinshop:att', i, component, color)
    })
    Core.Browser.on('Skinshop:CamPos', (pos) => {
        CamPos(pos)
    })
    Core.Browser.on('Skinshop:rot', (pos) => {
        setPosition(pos)
    })
    Core.Browser.on('Skinshop:FinishBuy', (data) => {
        Finish(data)
    })
    Core.Browser.on('Skinshop:notify', (type, title, msg) => {
        alt.emit('notify', type, title, msg)
    })
    alt.toggleGameControls(false)
    isOpen = true
}

function Finish(dt) {
    let data = dt
    for (let index = 0; index < Aroupa.length; index++) {
        if (data[index]) {
            alt.emitServer('Skinshop:Buy', index, data[index].drawable, data[index].texture);
        }
    }

}

function UpdateClothes(i) {
    Aroupa = [];
    Aroupa = JSON.parse(i)
}

const closeSkinshop = () => {
    Core.Browser.close()
    alt.toggleGameControls(true)
    PaymentESX()

    Core.Utils.destroyCam()
    natives.freezeEntityPosition(alt.Player.local.scriptID, false);
    isOpen = false
}

alt.onServer('Skinshop:open', () => {
    if (isOpen) return;
    openSkinshop()
})


alt.on('keydown', (key) => {

    if (key === 27 && isOpen) {

        closeSkinshop()
    }
    // if (key === 66 && !isOpen) {
    //     openSkinshop()
    // }
})


function PaymentESX() {
    for (let index = 0; index < Aroupa.length; index++) {
        if (Aroupa) {
            alt.emitServer('Skinshop:Closenobuy', index, Aroupa[index].drawable, Aroupa[index].texture);
        }
    }
}

let charCreation = [
    //COMPONENTS
    { name: "Hat", x: 0, y: 2.5, z: 0, rx: 0, ry: 0, rz: 180, timelapse: 2 / 6 }, //total
    { name: "Torso", x: 0, y: 1, z: 0.25, rx: 0, ry: 0, rz: 180, timelapse: 2 / 6 }, /// peito
    { name: "Head", x: 0, y: 0.45, z: 0.66, rx: 0, ry: 0, rz: 180, timelapse: 2 / 6 }, ///caBEÇA
    { name: "shoes", x: 0, y: 0.95, z: -0.55, rx: -20, ry: 0, rz: 180, timelapse: 2 / 6 }, ///sapato
    { name: "pants", x: 0, y: 1.2, z: -0.5, rx: 0, ry: 0, rz: 180, timelapse: 2 / 6 }, ///CALÇA
    { name: "hands", x: 0, y: 0.75, z: -0.15, rx: 0, ry: 0, rz: 180, timelapse: 2 / 6 }, ///mao
]


function setPosition(n) {
    natives.setEntityRotation(alt.Player.local, 0, 0, parseFloat(n), 5, true)
}

function CamPos(txt) {
    charCreation.map(cam => {
        if (cam.name == txt) {
            Core.Utils.createCamera(alt.Player.local.pos.x + cam.x, alt.Player.local.pos.y + cam.y, alt.Player.local.pos.z + cam.z, cam.rx, cam.ry, cam.rz, cam.timelapse)
        }
    })
}


alt.onServer('Skinshop:UpdateClothes', UpdateClothes)
alt.onServer('Skinshop:close', closeSkinshop)