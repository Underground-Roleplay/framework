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

const drawText = (x, y, width, height, scale, { r, g, b, a }, text) => {
    natives.setTextFont(4);
    natives.setTextProportional(0);
    natives.setTextScale(scale, scale);
    natives.setTextColour(r, g, b, a);
    natives.setTextDropShadow(0, 0, 0, 0, 255);
    natives.setTextEdge(2, 0, 0, 0, 255);
    natives.setTextDropShadow();
    natives.setTextOutline();
    natives.setTextEntry('STRING');
    natives.addTextComponentString(text);
    natives.drawText(x - width / 2, y - height / 2 + 0.005);
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
alt.on('keydown', (key) => {
    if (key === 112 && isOpen) {
        isOpen = false;
    } else {
        isOpen = true;
    }
});

let isOpen = true;

alt.everyTick(() => {
    drawText2D(
        'URP OpenSource DEMO',
        { x: 0.5, y: 0.0125 },
        0.35,
        { r: 255, g: 255, b: 255, a: 125 },
        0
    );
    if (isOpen) {
        drawText2D(
            'F1: toggle HUD',
            { x: 0.8, y: 0.025 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        drawText2D(
            'T / Enter: open chat',
            { x: 0.8, y: 0.05 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        drawText2D(
            '/noclip',
            { x: 0.8, y: 0.075 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        drawText2D(
            '/cloth, [component, drawable, texture]',
            { x: 0.8, y: 0.1 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        drawText2D(
            '/addmoney [moneytype, amount], moneytype = cash or bank',
            { x: 0.8, y: 0.125 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        drawText2D(
            '/toggleEngine',
            { x: 0.8, y: 0.15 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        drawText2D(
            '/showid',
            { x: 0.8, y: 0.175 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        drawText2D(
            '/showssn',
            { x: 0.8, y: 0.2 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        drawText2D(
            '/addItem [item, amount, slot]',
            { x: 0.8, y: 0.225 },
            0.35,
            { r: 255, g: 255, b: 255, a: 255 },
            1
        );
        //drawText2D('/', { x: 0.8, y: 0.25 }, 0.35, { r: 255, g: 255, b: 255, a: 255 }, 1);
        //drawText2D('/', { x: 0.8, y: 0.275 }, 0.35, { r: 255, g: 255, b: 255, a: 255 }, 1);
    }
});

export default {
    drawText,
    drawText3D,
    drawText2D,
    interactionMode,
    destroyCam,
    createCamera,
    drawTextHelper,
};
