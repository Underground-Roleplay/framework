import Core from 'urp-core';
import * as alt from 'alt-client';
import * as natives from 'natives'

let isOpen = false

let camera;
let zpos = 0;
let fov = 0;
let startPosition;

alt.onServer('Creator:Start', () => {
    natives.freezeEntityPosition(alt.Player.local.scriptID, true);
    alt.setTimeout(() => {
        natives.setPedDefaultComponentVariation(alt.Player.local.scriptID);
        natives.clearPedTasks(alt.Player.local.scriptID);
        startPosition = { ...alt.Player.local.pos };
        if (!camera) {
            const forwardVector = natives.getEntityForwardVector(alt.Player.local.scriptID);
            const forwardCameraPosition = {
                x: startPosition.x + forwardVector.x * 1.2,
                y: startPosition.y + forwardVector.y * 1.2,
                z: startPosition.z + zpos,
            }

            fov = 30;

            camera = natives.createCamWithParams(
                'DEFAULT_SCRIPTED_CAMERA',
                forwardCameraPosition.x,
                forwardCameraPosition.y,
                forwardCameraPosition.z,
                0,
                0,
                0,
                fov,
                true,
                0
            );
            natives.attachCamToEntity(camera, alt.Player.local.scriptID, 0.0, -0.9, 0.6, false);
            natives.setCamActive(camera, true);
            natives.renderScriptCams(true, false, 0, true, false, 0);
        }
        natives.setEntityHeading(alt.Player.local.scriptID, -180)
        //Fix render
        natives.setEntityCoordsNoOffset(
            alt.Player.local.scriptID,
            alt.Player.local.pos.x,
            alt.Player.local.pos.y,
            alt.Player.local.pos.z,
            false,
            false,
            false
        );
        opencCreator()
    }, 500);
})

const opencCreator = () => {
    Core.Browser.open('http://resources/urp-character-creator/client/html/index.html', true, false)
    Core.Browser.on('Creator:charSetGender', (data) => {
        alt.emitServer('Creator:charSetGender', data)
    })
    Core.Browser.on(`Creator:setHeadBlendData`, (data) => {
        alt.emitServer('Creator:setHeadBlendData', data)
    })
    Core.Browser.on(`Creator:setFaceFeature`, (data) => {
        alt.emitServer(`Creator:setFaceFeature`, data)
    })
    Core.Browser.on(`Creator:setEyeColor`, (data) => {
        alt.emitServer(`Creators:setEyeColor`, data)
    })
    Core.Browser.on(`Creator:setHeadOverlay`, (data) => {
        alt.emitServer(`Creator:setHeadOverlay`, data)
    })
    Core.Browser.on(`Creator:setHeadOverlayColor`, (data) => {
        alt.emitServer(`Creator:setHeadOverlayColor`, data)
    })
    Core.Browser.on(`Creator:setHair`, (data) => {
        alt.emitServer(`Creator:setHair`, data)
    })
    Core.Browser.on(`Creator:setHairColor`, (data) => {
        alt.emitServer(`Creator:setHairColor`, data)
    })
    Core.Browser.on(`Creator:setHairHighlightColor`, (data) => {
        alt.emitServer(`Creator:setHairHighlightColor`, data)
    })
    Core.Browser.on(`Creator:finish`, () => {
        closecCreator()
    })
    Core.Browser.on('cCreator:close', () => {
        closecCreator()
    })
    Core.Browser.on('load', () => {
        alt.log('blah')
        Core.Browser.emit('cCreator:open', undefined)
    })
    alt.toggleGameControls(false)
    isOpen = true
}


const closecCreator = () => {
    Core.Browser.close()
    alt.nextTick(()=>{
        natives.destroyAllCams(true);
        natives.renderScriptCams(false, false, 0, false, false, 0);
        natives.freezeEntityPosition(alt.Player.local.scriptID, false);
    })

    alt.toggleGameControls(true)
    alt.emitServer(`Creator:finish`)
    isOpen = false
}
