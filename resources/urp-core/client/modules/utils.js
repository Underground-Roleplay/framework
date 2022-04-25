import * as alt from 'alt-client';
import * as natives from 'natives';

const interactionMode = () => {
    let interactionTick;
    if (interactionTick) {
        alt.clearInterval(interactionTick);
        interactionTick = null;
    }

    interactionTick = alt.everyTick(() => {
        if (
            !alt.Player.local.playerData.inInteraction ||
            !alt.Player.local.playerData.inInteraction.type
        ) {
            return;
        }
        helpPrompt(`Aperte ~INPUT_FRONTEND_RB~ para interagir`);
        // We can use a keymap in the future :D
        if (natives.isControlJustPressed(0, 206)) {
            alt.emitServer(
                'interaction:trigger',
                alt.Player.local.playerData.inInteraction.type
            );
        }
    });
};

function helpPrompt(msg) {
    natives.beginTextCommandDisplayHelp('STRING');
    natives.addTextComponentSubstringPlayerName(msg);
    natives.endTextCommandDisplayHelp(0, false, true, -1);
}

function drawText2D(text, pos, scale, color, alignment = 0, padding = 0) {
    if (scale > 2) {
        scale = 2;
    }

    natives.beginTextCommandDisplayText('STRING');
    natives.addTextComponentSubstringPlayerName(text);
    natives.setTextFont(4);
    natives.setTextScale(1, scale);
    natives.setTextColour(color.r, color.g, color.b, color.a);
    natives.setTextOutline();
    natives.setTextDropShadow();
    if (alignment !== null) {
        natives.setTextWrap(padding, 1 - padding);
        natives.setTextJustification(alignment);
    }

    natives.endTextCommandDisplayText(pos.x, pos.y, 0);
}
const drawText = (text, position, font, scale) => {
    natives.setDrawOrigin(position.x, position.y, position.z - 0.5, 0);
    natives.beginTextCommandDisplayText('STRING');
    natives.addTextComponentSubstringPlayerName(text);
    natives.setTextFont(font);
    natives.setTextScale(1, scale);
    natives.setTextWrap(0.0, 1.0);
    natives.setTextCentre(true);
    natives.setTextColour(255, 255, 255, 255);
    natives.setTextOutline();
    natives.endTextCommandDisplayText(0, 0, 0);
    natives.clearDrawOrigin();
};

const drawText3D = (x, y, z, text) => {
    natives.setTextScale(0.35, 0.35);
    natives.setTextFont(4);
    natives.setTextProportional(true);
    natives.setTextColour(255, 255, 255, 215);
    natives.beginTextCommandDisplayText('STRING');
    natives.setTextCentre(true);
    natives.addTextComponentSubstringPlayerName(text);
    natives.setDrawOrigin(x, y, z, 0);
    const factor = text.length / 370;
    natives.drawRect(
        0.0,
        0.0 + 0.0125,
        0.017 + factor,
        0.03,
        0,
        0,
        0,
        75,
        false
    );
    natives.endTextCommandDisplayText(0, 0, 0);
};

function drawTextHelper(text, x, y) {
    natives.beginTextCommandDisplayText('STRING');
    natives.addTextComponentSubstringPlayerName(text);
    natives.setTextFont(4);
    natives.setTextScale(1, 0.5);
    natives.setTextWrap(0.0, 1.0);
    natives.setTextCentre(true);
    natives.setTextColour(255, 255, 255, 180);
    natives.setTextOutline();
    natives.setTextDropShadow();
    natives.endTextCommandDisplayText(x, y, 0);
}
let primaryCamera;

const destroyCam = () => {
    alt.nextTick(() => {
        natives.destroyCam(primaryCamera, true);
        natives.setCamActive(primaryCamera, false);
        natives.renderScriptCams(false, false, 0, false, false, 0);
        natives.clearFocus();
    });
};
const destroyCamCreat = () => {
    natives.destroyCam(primaryCamera, true);
    natives.setCamActive(primaryCamera, false);
    natives.renderScriptCams(false, false, 0, false, false, 0);
    natives.clearFocus();
};

const createCamera = (camx, camy, camz, rotx, roty, angle, timelapse) => {
    if (primaryCamera) {
        destroyCamCreat();
    }

    primaryCamera = natives.createCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        camx,
        camy,
        camz,
        rotx,
        roty,
        angle,
        0,
        1,
        2
    );
    natives.setCamActive(primaryCamera, true);
    natives.setFocusPosAndVel(camx, camy, camz, 0, 0, 0); ////
    natives.setCamFov(primaryCamera, 55);
    natives.renderScriptCams(true, true, 0, true, false, 0);
};
let drawMarker = (pos, data) => {
    natives.drawMarker(
        data.type,
        pos.x,
        pos.y,
        pos.z,
        data.dirx || 0,
        data.diry || 0,
        data.dirz || 0,
        data.rotx || 0,
        data.roty || 0,
        data.rotz || 0,
        data.scalex || 2.5,
        data.scaley || 2.5,
        data.scalez || 2.5,
        data.r,
        data.g,
        data.b,
        data.a,
        data.bobAndDown || false,
        data.faceCamera || true,
        data.p19 || 2,
        data.rotate || false,
        data.textureDict || undefined,
        data.textureName || undefined,
        data.drawOnEnts || false
    );
};

export default {
    drawText,
    drawText3D,
    drawText2D,
    interactionMode,
    destroyCam,
    createCamera,
    drawTextHelper,
    drawMarker,
};
