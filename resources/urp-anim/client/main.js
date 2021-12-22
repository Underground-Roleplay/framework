import * as alt from 'alt-client';
import * as natives from 'natives';
import chat from 'urp-chat';
import { animations, walkStyles } from '../shared/config';


const maxCountLoadTry = 255;
const loadAnim = async (dict) => {
    return new Promise(resolve => {
        natives.requestAnimDict(dict);
  
        let count = 0;
        let inter = alt.setInterval(() => {
            if (count > maxCountLoadTry) {
                alt.clearInterval(inter);
                return;
            }
  
            if (natives.hasAnimDictLoaded(dict)) {
                resolve(true);
                alt.clearInterval(inter);
                return;
            }
  
            count += 1;
        }, 5);
    });
}


let crouch = false;
alt.everyTick(() => {
    if ( !natives.isEntityDead( alt.Player.local.scriptID, true ) && !natives.isPedInAnyVehicle(alt.Player.local.scriptID, true) ) {
        natives.disableControlAction(0,36,true);
        if (!natives.isPauseMenuActive()){
            if( natives.isDisabledControlJustPressed(0, 36) ) {
                natives.requestAnimSet("move_ped_crouched");
                natives.requestAnimSet("move_ped_crouched_strafing");
                if (crouch) {
                    natives.resetPedMovementClipset(alt.Player.local.scriptID, 0.55);
                    natives.resetPedStrafeClipset(alt.Player.local.scriptID);
                    crouch = false;
                } else {
                    natives.setPedMovementClipset(alt.Player.local.scriptID,"move_ped_crouched",0.55);
                    natives.setPedStrafeClipset(alt.Player.local.scriptID,"move_ped_crouched_strafing");
                    crouch = true;
                }
            }
        }
        if (natives.isPedJumping(alt.Player.local.scriptID)) {
            natives.resetPedMovementClipset(alt.Player.local.scriptID, 0.55);
            natives.resetPedStrafeClipset(alt.Player.local.scriptID);
            crouch = false;
        }
    }
});

let point = false;
let pointInterval;
alt.on('keydown', async (key) => {
    if (key == '66') {
        if ( !natives.isPedInAnyVehicle(alt.Player.local.scriptID) ) {
            await loadAnim("anim@mp_point");
            if (!point) {
                natives.setPedCurrentWeaponVisible(alt.Player.local.scriptID, 0, 1, 1, 1);
                natives.setPedConfigFlag(alt.Player.local.scriptID, 36, true);
                natives.taskMoveNetworkByName(alt.Player.local.scriptID,"task_mp_pointing", 0.5, false, "anim@mp_point", 24);
                point = true;
                pointInterval = alt.everyTick(() => {
                    let camRot = natives.getGameplayCamRot(2);
                      
                    natives.isTaskMoveNetworkActive(alt.Player.local.scriptID);

                    let camPitch = camRot.x - natives.getEntityPitch(alt.Player.local.scriptID);
    
                    if (camPitch < -70.0) {
                        camPitch = -70.0;
                    }
                    else if (camPitch > 42.0) {
                        camPitch = 42.0;
                    }
                    camPitch = (camPitch + 70.0) / 112.0;
    
                    let camHeading = natives.getGameplayCamRelativeHeading();
    
                    let cosCamHeading = Math.cos(camHeading);
                    let sinCamHeading = Math.sin(camHeading);
    
                    if (camHeading < -180.0) {
                        camHeading = -180.0;
                    }
                    else if (camHeading > 180.0) {
                        camHeading = 180.0;
                    }
                    camHeading = (camHeading + 180.0) / 360.0;
    
                    let coords = natives.getOffsetFromEntityInWorldCoords(alt.Player.local.scriptID, (cosCamHeading * -0.2) - (sinCamHeading *
                    (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6);
    
                    let ray = natives.startShapeTestCapsule(coords.x, coords.y, coords.z - 0.2, coords.x, coords.y, coords.z + 0.2, 1.0, 95, alt.Player.local.scriptID, 7);
                    let [_, blocked, coords1, coords2, entity] = natives.getShapeTestResult(ray, false, null, null, null);    
                    natives.setTaskMoveNetworkSignalFloat(alt.Player.local.scriptID, "Pitch", camPitch);
                    natives.setTaskMoveNetworkSignalFloat(alt.Player.local.scriptID, "Heading", camHeading * -1.0 + 1.0);
                    natives.setTaskMoveNetworkSignalBool(alt.Player.local.scriptID, "isBlocked", blocked);
                    natives.setTaskMoveNetworkSignalBool(alt.Player.local.scriptID, "isFirstPerson", natives._0xEE778F8C7E1142E2(natives._0x19CAFA3C87F7C2FF()) === 4);
                })  
            } 
        }
    }
});

alt.on('keyup', (key) => {
    if (key == '66') {
        if(point) {
            natives.requestTaskMoveNetworkStateTransition(alt.Player.local.scriptID, "Stop");
            if (!natives.isPedInjured(alt.Player.local.scriptID)){
                natives.clearPedSecondaryTask(alt.Player.local.scriptID);
            }
            if (!natives.isPedInAnyVehicle(alt.Player.local.scriptID)){
                natives.setPedCurrentWeaponVisible(alt.Player.local.scriptID,1,1,1,1);
            }
            natives.setPedConfigFlag(alt.Player.local.scriptID,36,0);
            natives.clearPedSecondaryTask(alt.Player.local.scriptID);
            point = false;
            natives.removeAnimDict("anim@mp_point");
            alt.clearEveryTick(pointInterval);
        }
    }
});

const playAnim = async(data) => {
    let scriptID = alt.Player.local.scriptID;
    if (animations[data]) { 
        if (animations[data].dict)
        await loadAnim(animations[data].dict);
        if (animations[data].type == 'normal' && !natives.isPedInAnyVehicle(scriptID, true)) {
            natives.taskPlayAnim(scriptID, animations[data].dict, animations[data].anim, 3.0, -3.0, -1, animations[data].flag, 0, 0, 0, 0);
            return true;
        } else if (animations[data].type == 'car' && natives.isPedInAnyVehicle(scriptID, true)) {
            natives.taskPlayAnim(scriptID, animations[data].dict, animations[data].anim, 3.0, -3.0, -1, animations[data].flag, 0, 0, 0, 0);
            return true;
        } else if (animations[data].type == 'scenario' && !natives.isPedInAnyVehicle(scriptID, true)) {
            let pedpos = natives.getEntityCoords(scriptID,true)
            natives.taskStartScenarioAtPosition(scriptID,animations[data].dict,pedpos.x,pedpos.y,pedpos.z-1,natives.getEntityHeading(scriptID),0,0,false)
            return true;
        }
        else if (animations[data].type == 'prop' && !natives.isPedInAnyVehicle(scriptID, true)) {
            if(alt.Player.local.animObject) {
                natives.detachEntity(alt.Player.local.animObject,false,false)
                
                natives.setEntityAsMissionEntity(alt.Player.local.animObject,false,false)
                natives.networkFadeOutEntity(alt.Player.local.animObject,false)
                
                while ( natives.networkIsEntityFading(alt.Player.local.animObject) ) {
                    await utils.Wait(100)
                }
                
                natives.deleteObject(alt.Player.local.animObject)
                alt.Player.local.animObject = undefined;
            }

            let coords = natives.getOffsetFromEntityInWorldCoords(scriptID,0.0,0.0,-5.0);
            this.animObject = natives.createObject(natives.getHashKey(animations[data].prop),coords.x,coords.y,coords.z,true,true,true);
            natives.setEntityCollision(this.animObject,false,false);
            if (animations[data].height){
                natives.attachEntityToEntity(this.animObject,scriptID,natives.getPedBoneIndex(scriptID,animations[data].bone),animations[data].height,animations[data].pos1,animations[data].pos2,animations[data].pos3,animations[data].pos4,animations[data].pos5,true,false,false,true,1,true);
            } else {
                natives.attachEntityToEntity(this.animObject,scriptID,natives.getPedBoneIndex(scriptID,animations[data].bone),0.0,0.0,0.0,0.0,0.0,0.0,false,false,false,false,2,true);
            }
            natives.taskPlayAnim(scriptID, animations[data].dict, animations[data].anim,3.0,3.0,-1,animations[data].flag,0,0,0,0);
            natives.setEntityAsMissionEntity(this.animObject,true,true);
            return true;
        }
    } else {
        return false
    }
};
let animation = false;

alt.on('keydown', async (key) => {
    let scriptID = alt.Player.local.scriptID;       
    if((key == 121) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //MÃOS NA CABEÇA
        if (!animation) {
            await loadAnim("random@arrests@busted");
            natives.taskPlayAnim(scriptID, 'random@arrests@busted','idle_a', 3.0, -3.0, -1, 49, 0, 0, 0, 0);  
            animation = true;         
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        }
    } else if((key == 40) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //ASSOVIAR (ARROW DOWN)
        if (!animation) {
            await loadAnim("rcmnigel1c");
            natives.taskPlayAnim(scriptID, 'rcmnigel1c', 'hailing_whistle_waive_a', 3.0, -3.0, -1, 120, 0, 0, 0, 0);       
            animation = true;         
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        }        
    } else if((key == 37) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //JOIA (ARROW LEFT)
        if (!animation) {                 
            await loadAnim("anim@mp_player_intupperthumbs_up");
            natives.taskPlayAnim(scriptID, 'anim@mp_player_intupperthumbs_up', 'enter', 3.0, -3.0, -1, 120, 0, 0, 0, 0);           
            animation = true;         
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        }
    } else if((key == 39) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //FRUSTRADO (ARROW RIGHT)
        if (!animation) {
            await loadAnim("anim@mp_player_intcelebrationmale@face_palm");
            natives.taskPlayAnim(scriptID, 'anim@mp_player_intcelebrationmale@face_palm', 'face_palm', 3.0, -3.0, -1, 120, 0, 0, 0, 0);                 
            animation = true;         
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        }
    } else if((key == 38) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //SAUDACAO (ARROW UP)
        if (!animation) {
            await loadAnim("anim@mp_player_intcelebrationmale@salute");
            natives.taskPlayAnim(scriptID, 'anim@mp_player_intcelebrationmale@salute', 'salute', 3.0, -3.0, -1, 120, 0, 0, 0, 0);             
            animation = true;         
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        }
    } else if((key == 88) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //MAOS PARA O ALTO (X)
        if (!animation) {
            await loadAnim("random@mugging3");
            natives.taskPlayAnim(scriptID, 'random@mugging3', '"handsup_standing_base', 3.0, -3.0, -1, 120, 0, 0, 0, 0);      
            animation = true;         
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        } 
    } else if((key == 116) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //MÃOS NA CABEÇA DE JOELHOS (F5)    
        if (!animation) {
            await loadAnim("random@arrests@busted");            
            natives.taskPlayAnim(scriptID,"random@arrests@busted","idle_a",2.0,1.0,-1,1,0,0,0,0);       
            animation = true;         
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        }           
    } else if((key == 112) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //CRUZAR BRAÇOS(F1)  
        if (!animation) {
            await loadAnim("anim@heists@heist_corona@single_team");            
            natives.taskPlayAnim(scriptID,"anim@heists@heist_corona@single_team","single_team_loop_boss",3.0,1.0,-1,49,0,0,0,0);         
            animation = true;      
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        }                 
    } else if((key == 114) && !natives.isPedInAnyVehicle(scriptID, true) && alt.gameControlsEnabled() && !alt.Player.local.isDead && !alt.isMenuOpen() && !chat.isChatOpen()) {
        //DEDO DO MEIO(F3)  
        if (!animation) {
            await loadAnim("anim@mp_player_intselfiethe_bird");            
            natives.taskPlayAnim(scriptID,"anim@mp_player_intselfiethe_bird","idle_a",3.0,1.0,-1,49,0,0,0,0);        
            animation = true;      
            return true;
        } else {
            natives.clearPedTasks(scriptID);
            animation = false
        } 
    } else if (key == 117 && !chat.isChatOpen()) {
        natives.clearPedTasks(scriptID);
        if(alt.Player.local.animObject) {
            natives.detachEntity(alt.Player.local.animObject,false,false)
            natives.deleteObject(alt.Player.local.animObject)
            alt.Player.local.animObject = undefined;
        }
    }  
});

const setMoovement= async (data) => {
    if(walkStyles[data]){
        natives.requestAnimSet(walkStyles[data].set);
        return new Promise(resolve => {
            let loadSet = alt.setInterval(() => {
                if (natives.hasAnimSetLoaded(walkStyles[data].set)) {
                    natives.setPedMovementClipset(alt.Player.local.scriptID,walkStyles[data].set,0.25)
                    alt.emitServer('animations:setMoovement', data);
                    alt.clearInterval(loadSet);
                    resolve(true);
                }
            }, 5);
        });
    } else {
        return false;
    }
};


alt.onServer('playAnim', (data) => {
    playAnim(data)
    
})

alt.onServer('setMoovement', (data) => {
    setMoovement(data)
    
})

