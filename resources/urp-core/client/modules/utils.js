import * as alt from 'alt-client';
import * as natives from 'natives';


const interactionMode = () => {
    let interactionTick;
    if (interactionTick) {
        alt.clearInterval(interactionTick);
        interactionTick = null;
    }

    interactionTick = alt.everyTick(() => {
        if (!alt.Player.local.playerData.inInteraction || !alt.Player.local.playerData.inInteraction.type) {
            return;
        }
        helpPrompt(`Aperte ~INPUT_FRONTEND_RB~ para interagir`)
            // We can use a keymap in the future :D
        if (natives.isControlJustPressed(0, 206)) {
            alt.emitServer('interaction:trigger', alt.Player.local.playerData.inInteraction.type);
        }
    })
}

function helpPrompt(msg) {
    natives.beginTextCommandDisplayHelp('STRING');
    natives.addTextComponentSubstringPlayerName(msg);
    natives.endTextCommandDisplayHelp(0, false, true, -1);
}

const drawText2D = (text, pos, scale, color) => {
    if (scale > 2) {
        scale = 2;
    }

    natives.beginTextCommandDisplayText('STRING');
    natives.addTextComponentSubstringPlayerName(text);
    natives.setTextFont(4);
    natives.setTextScale(1, scale);
    natives.setTextWrap(0.0, 1.0);
    natives.setTextCentre(true);
    natives.setTextColour(color.r, color.g, color.b, color.a);
    natives.setTextOutline();
    natives.setTextDropShadow();
    natives.endTextCommandDisplayText(pos.x, pos.y, 0);
}

const drawText = (x, y, width, height, scale, { r, g, b, a }, text) => {
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
let primaryCamera;


const destroyCam = () => {
    alt.nextTick(() => {
        natives.destroyCam(primaryCamera, true)
        natives.setCamActive(primaryCamera, false);
        natives.renderScriptCams(false, false, 0, false, false, 0);
        natives.clearFocus()
    })
};
const destroyCamCreat = () => {

    natives.destroyCam(primaryCamera, true)
    natives.setCamActive(primaryCamera, false);
    natives.renderScriptCams(false, false, 0, false, false, 0);
    natives.clearFocus()

};

const createCamera = (camx, camy, camz, rotx, roty, angle, timelapse) => {

    if (primaryCamera) {
        destroyCamCreat();
    }

    primaryCamera = natives.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', camx, camy, camz, rotx, roty, angle, 0, 1, 2);
    natives.setCamActive(primaryCamera, true);
    natives.setFocusPosAndVel(camx, camy, camz, 0, 0, 0); ////
    natives.setCamFov(primaryCamera, 55);
    natives.renderScriptCams(true, true, 0, true, false, 0);

}


export default { drawText, drawText3D, drawText2D, interactionMode, destroyCam, createCamera }