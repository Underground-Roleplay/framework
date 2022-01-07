import * as alt from 'alt-client';
import * as natives from 'natives';
import utils from './utils';

let deathInterval;
let deathTime;

const startTicks = () => {
    alt.log('started ticks to server')
    alt.setInterval(()=> {
        alt.emitServer('Core:Server:CharacterTick')
    }, 5000)
}

const getMetaData = (key) => {
    if(!alt.Player.local.playerData.metadata[key]) return undefined;
    return alt.Player.local.playerData.metadata[key]
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

const getJobInfo = (key) => {
    if(!alt.Player.local.playerData.job) return undefined;
    if(!alt.Player.local.playerData.job[key]) {
        return undefined;
    } else {
        return alt.Player.local.playerData.job[key];
    }
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
        utils.drawText2D(
            `${(timeLeft / 1000).toFixed(2)}s até ser revivido`,
            { x: 0.5, y: 0.2 },
            0.5,
            new alt.RGBA(255, 255, 255, 255)
        );
    } else {
        utils.drawText2D(`Revivendo...`, { x: 0.5, y: 0.2 }, 0.5, new alt.RGBA(255, 255, 255, 255));
    }
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
alt.onServer('admin:Noclip', () => {
  if ( isNoclip == false ) {
    isNoclip = true;
    alt.emitServer('Core:Server:toggleSourceVisible', false)
    natives.freezeEntityPosition(alt.Player.local.scriptID, true);
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
    alt.emitServer('Core:Server:toggleSourceVisible', true)
    natives.setEntityInvincible(alt.Player.local.scriptID, false);
    natives.freezeEntityPosition(alt.Player.local.scriptID, false);
    natives.setEntityCollision(alt.Player.local.scriptID, true, true);
    alt.clearEveryTick(loop);
  } 
});

alt.onServer(`admin:tpwp`, () => {
    let blip = natives.getFirstBlipInfoId(8);
    
    if (blip != 0) {
        let tpEnt = alt.Player.local.scriptID;

        if (natives.isPedInAnyVehicle(tpEnt, true)) {
            tpEnt = natives.getVehiclePedIsIn(myPed, false);
        };

        let { x, y } = natives.getBlipInfoIdCoord(blip);
        let z = 0.1;

        natives.freezeEntityPosition(tpEnt, true);
        natives.requestCollisionAtCoord(x, y, z);
        natives.setEntityCoords(tpEnt, x, y, z, true, true, true, true);

        const interval = alt.setInterval(() => {
        let tpEntCoord = natives.getEntityCoords(tpEnt, true);
        let loaded, ground;

        if (z > 1999.0) {
            z = 0.1;
        } else {
            z += 15.1;
        };

        natives.requestCollisionAtCoord(tpEntCoord.x, tpEntCoord.y, z);
        natives.setEntityCoords(tpEnt, x, y, z, true, true, true, true);
        
        [loaded, ground] = natives.getGroundZFor3dCoord(tpEntCoord.x, tpEntCoord.y, tpEntCoord.z, z, 0, true);

        if (loaded) {
            z = ground;

            natives.setEntityCoords(tpEnt, x, y, z, true, true, true, true);
            natives.freezeEntityPosition(tpEnt, false);                    
            alt.clearInterval(interval);
        };
        }, 0);
    } else if (blip === 0) {
        return
    };
})

const loadAnim = (dict) => {
    return new Promise((res) => {
        natives.requestAnimDict(dict);

        let count = 0;
        const inter = alt.setInterval(() => {
            if (count > 255) {
                alt.clearInterval(inter);
                return;
            }
            if (natives.hasAnimDictLoaded(dict)) {
                res(true);
                alt.clearInterval(inter);
                return;
            }
            count += 1;
        }, 5);
    });
}

const playAnim = (dict, anim, duration, flags, prop = false) => {
    if (alt.Player.local['objProp']) {
        natives.setEntityAsMissionEntity(alt.Player.local['objProp'], false, true);
        natives.detachEntity(alt.Player.local['objProp'], true, true);
        alt.Player.local['objProp'] = undefined;
        //Retira o attachment SYNC se for iniciar uma nova anim
        alt.emitServer('character:destroyAttachment');
    }
    if (prop) {
        if (!alt.Player.local['objProp']) {
            alt.Player.local['objProp'] = natives.createObject(natives.getHashKey(prop.name), 0, 0, 0, true, true, true);
            natives.attachEntityToEntity(
                alt.Player.local['objProp'],
                alt.Player.local.scriptID,
                natives.getPedBoneIndex(alt.Player.local.scriptID, prop.hand),
                0,
                0,
                0,
                0,
                0,
                0,
                false,
                true,
                true,
                false,
                1,
                true
            );
            natives.setEntityAsMissionEntity(alt.Player.local['objProp'], true, true);
            //Adiciona o attachment SYNC
            alt.emitServer('character:addAttachment', natives.getHashKey(prop.name), prop.hand);
        }
    }
    natives.clearPedTasks(alt.Player.local.scriptID);
    if (natives.hasAnimDictLoaded(dict)) {
        natives.taskPlayAnim(alt.Player.local.scriptID, dict, anim, 1, -1, duration, flags, 1.0, false, false, false);
    } else {
        const load = loadAnim(dict);
        load.then(() => {
            natives.taskPlayAnim(alt.Player.local.scriptID, dict, anim, 1, -1, duration, flags, 1.0, false, false, false);
        }).catch(() => {
            alt.log('ERROR: Promise returned reject');
        });
    }
}

const stopAnim = () => {
    if (alt.Player.local['objProp']) {
        //Retira o attachment SYNC se a animação for parada
        alt.emitServer('character:destroyAttachment');
        natives.detachEntity(alt.Player.local['objProp'], true, true);
        alt.Player.local['objProp'] = undefined;
    }
    natives.clearPedTasks(alt.Player.local.scriptID);
}

const disableConfigFlags = () => {
    natives.setPedConfigFlag(alt.Player.local.scriptID, 184, true)
    //  Keep engine running
    natives.setPedConfigFlag(alt.Player.local.scriptID, 241, true)
}

const disableBehaviours = () => {
    disableConfigFlags()
    alt.everyTick(() => {
    //  Disable engine auto start
    natives.setPedConfigFlag(alt.Player.local.scriptID, 429, true)
    // Fix webview
    natives.drawRect(0, 0, 0, 0, 0, 0, 0, 0, false)
    //  Disable default weapon switch
    for (let i = 157; i < 164; i++) {
    natives.disableControlAction(0, i, true);
    }

    //  Disable Weapon Wheel
    natives.disableControlAction(0, 12, true);
    natives.disableControlAction(0, 13, true);
    natives.disableControlAction(0, 14, true);
    natives.disableControlAction(0, 15, true);

    if (natives.isPedTryingToEnterALockedVehicle(alt.Player.local.scriptID)) {
        natives.clearPedTasks(alt.Player.local.scriptID);
        natives.clearPedSecondaryTask(alt.Player.local.scriptID);
    }
    })
}

const setVehicleEngine = (vehicle, state) => {
    if (!state) {
        natives.setVehicleEngineOn(vehicle.scriptID, state, true, true);
    } else {
        natives.setVehicleEngineOn(vehicle.scriptID, state, false, true);
    }
}

const handleVehicleStates = (vehicle, key, value, oldValue) => {
    if (vehicle instanceof alt.Vehicle) {
        if (key === 'engine') {
            setVehicleEngine(vehicle, value);
            alt.log('ENGINE', value)
            return;
        }
    }      
}

export default {startTicks, handleSetplayerData, getPlayerData, handleDeath, RequestModel, getMetaData, playAnim, 
    stopAnim, disableBehaviours, handleVehicleStates, disableConfigFlags, getJobInfo}