import * as alt from 'alt-client';
import * as natives from 'natives';

let deathInterval;
let deathTime;

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

const handleDeath = (value) => {
    if(value){
        if (!deathInterval) {
            deathInterval = alt.setInterval(handleDeathMovement, 0);
            deathTime = Date.now() + 25000;
        }
        return;
    }

    if (!deathInterval) {
        return;
    }

    natives.clearPedTasksImmediately(alt.Player.local.scriptID);
    alt.clearInterval(deathInterval);
    deathInterval = null;
}

const handleDeathMovement = () => {
    if (!natives.isPedRagdoll(alt.Player.local.scriptID)) {
        natives.setPedToRagdoll(alt.Player.local.scriptID, -1, -1, 0, false, false, false);
    }
    const timeLeft = deathTime - Date.now();
    if (timeLeft > 0) {
        drawText2D(
            `${(timeLeft / 1000).toFixed(2)}s até ser revivido`,
            { x: 0.5, y: 0.2 },
            0.5,
            new alt.RGBA(255, 255, 255, 255)
        );
    } else {
        drawText2D(`Revivendo...`, { x: 0.5, y: 0.2 }, 0.5, new alt.RGBA(255, 255, 255, 255));
    }
}

const interactionMode = () => {
    let interactionTick;
    if(interactionTick){
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

const RequestModel = async (modelHash, timeoutMs = 1000) => {
    return new Promise((resolve, reject) => {
        if (!natives.isModelValid(modelHash)) {
            reject(new Error(`Model does not exist: ${modelHash}`));
            return;
        }

        if (natives.hasModelLoaded(modelHash)) {
            resolve(true);
            return;
        }

        natives.requestModel(modelHash);

        const deadline = new Date().getTime() + timeoutMs;

        const inter = alt.setInterval(() => {
            if (natives.hasModelLoaded(modelHash)) {
                alt.clearInterval(inter);
                resolve(true);
            } else if (deadline < new Date().getTime()) {
                alt.clearInterval(inter);
                const error = `Error: Async loading failed for model: ${modelHash}`;
                alt.log(error);
                reject(new Error(error)); // probably better resolve(false)
            }
        }, 10);
    });
};


let isNoclip = false;
let noclip_speed = 1.0;


function getCamDirection() {
  let heading = natives.getGameplayCamRelativeHeading() + natives.getEntityHeading(alt.Player.local.scriptID);
  let pitch = natives.getGameplayCamRelativePitch();

  let x = -Math.sin(heading * (Math.PI / 180.0));
  let y = Math.cos(heading * (Math.PI / 180.0));
  let z = Math.sin(pitch * Math.PI / 180.0);
  let len = Math.sqrt((x * x) + (y * y) + (z * z));

  if (len != 0) {
    x /= len;
    y /= len;
    z /= len;
  };

  return [x, y, z];
};

var loop;
alt.onServer('toogle:Noclip', () => {
  if ( isNoclip == false ) {
    isNoclip = true;
    natives.freezeEntityPosition(alt.Player.local.scriptID, true);
    natives.setEntityVisible(alt.Player.local.scriptID, false,0);
    natives.setEntityCollision(alt.Player.local.scriptID, false, false);
    loop = alt.everyTick(()=>{
      if (isNoclip) {
        natives.setEntityInvincible(alt.Player.local.scriptID, true);
        noclip_speed = 0.5;
        if (natives.isControlPressed(0,21)) {
          noclip_speed = 2.5;
        };
        if (natives.isControlPressed(0,32)) {
          let { x, y, z } = natives.getEntityCoords(alt.Player.local.scriptID, true);
          let [dx, dy, dz] = getCamDirection();
          natives.setEntityVelocity(alt.Player.local.scriptID, 0.0001, 0.0001, 0.0001);
          x += noclip_speed * dx;
          y += noclip_speed * dy;
          z += noclip_speed * dz;
          natives.setEntityCoordsNoOffset(alt.Player.local.scriptID, x, y, z, true, true, true);
        };
        if (natives.isControlPressed(0,269)) {
          let { x, y, z } = natives.getEntityCoords(alt.Player.local.scriptID, true);
          let [dx, dy, dz] = getCamDirection();
          natives.setEntityVelocity(alt.Player.local.scriptID, 0.0001, 0.0001, 0.0001);
          x -= noclip_speed * dx;
          y -= noclip_speed * dy;
          z -= noclip_speed * dz;
          natives.setEntityCoordsNoOffset(alt.Player.local.scriptID, x, y, z, true, true, true);
        };
      };
    })
  } else {
    isNoclip = false;
    natives.setEntityInvincible(alt.Player.local.scriptID, false);
    natives.freezeEntityPosition(alt.Player.local.scriptID, false);
    natives.setEntityVisible(alt.Player.local.scriptID, true, 0);
    natives.setEntityCollision(alt.Player.local.scriptID, true, true);
    alt.clearEveryTick(loop);
  } 
});

export default {drawText, drawText3D, startTicks, handleSetplayerData, getPlayerData, handleDeath, interactionMode, RequestModel}