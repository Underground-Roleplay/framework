import * as alt from 'alt-client';
import * as natives from 'natives';
import Core from '../main';

//  Initialize Ticks
alt.onServer('Core:Client:CharacterLoaded',  async () => {
    Core.Functions.startTicks()
    Core.Utils.interactionMode()
    Core.Functions.disableBehaviours()
})

//  Respawn Manager
alt.onServer('Core:Character:Respawned', () => {
    Core.Functions.disableConfigFlags()
})

//  Entity sync
alt.onServer("entitySync:create", async (id, type, pos, data) => {
    Core.Entities.getEntity(id, type, pos, data)
    alt.log(`[ENTITY] Created entity ${id} (Type ${type})`);
})

alt.onServer("entitySync:remove", (id, type) => {
    Core.Entities.destroyEntity(id, type)
    alt.log(`[ENTITY] Destroyed entity ${id} (Type ${type})`);
})

alt.onServer("entitySync:updatePosition", (id, type, pos) => {
  Core.Entities.updatePos(id, type, pos)
  alt.log(`[ENTITY] Entity position updated ${id} (Type ${type})`);
})

//  Data manager
alt.onServer('playerData:set', (key, value) => {
    Core.Functions.handleSetplayerData(key, value)
})

// Player teloprt
alt.onServer('tpto', ()=> {
  let waypoint = natives.getFirstBlipInfoId(8);
  if (natives.doesBlipExist(waypoint))
   {
    let coords = natives.getBlipInfoIdCoord(waypoint);
    let res = natives.getGroundZFor3dCoord(coords.x, coords.y, coords.z, undefined, undefined)[0];
    let Gz =coords.z;
        setTimeout(() => { while (!res) {
        Gz=Gz+0.1;
        res=natives.getGroundZFor3dCoord(coords.x, coords.y, Gz, undefined, undefined)[0];
         if (Gz>800) {
           break;
         }
      }
},1000);
      if (!res){ 
        console.log('failed to load ground,Don t worry i will handle that!');//if the player spawned before the texture 
          setTimeout(() => {                                                //this will help out
            natives.setPedCoordsKeepVehicle(alt.Player.local, coords.x, coords.y,Gz);  //if textures already loaded then nothing to worry about :)         

        }, 1000); 
      };
      natives.setPedCoordsKeepVehicle(alt.Player.local, coords.x, coords.y,Gz);  //if textures already loaded then nothing to worry about :)         
  }
})


alt.on('playerData:changed', (key, value, old) => {
    if(key === 'isDead'){
    Core.Functions.handleDeath(value)
    }
})

alt.on('connectionComplete', () => {
    Core.Browser.createInstance()
})

alt.on('disconnect', () => {
    Core.Browser.destroyInstance()
    // Core.Entities.destroyEntities()
})

alt.on('streamSyncedMetaChange', (entity, key, value, oldValue) =>{ 
  Core.Functions.handleVehicleStates(entity, key, value, oldValue)
})

//TEMP
let myObjects = []

alt.on('streamSyncedMetaChange', (entity, key, value, oldValue) => {
  if (entity instanceof alt.Player) {
    if (entity === alt.Player.local) return
    if (key !== 'attachment') return
    if (value) {
      let objData = JSON.parse(value)
      myObjects[entity.id] = natives.createObject(
        objData.hash,
        0,
        0,
        0,
        false,
        false,
        false
      )
      natives.attachEntityToEntity(
        myObjects[entity.id],
        entity.scriptID,
        natives.getPedBoneIndex(entity.scriptID, objData.hand),
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
      )
    } else {
      if (myObjects[entity.id]) {
        let tmp = myObjects[entity.id]
        myObjects[entity.id] = natives.detachEntity(
          myObjects[entity.id],
          true,
          true
        )
        alt.setTimeout(() => {
          natives.deleteObject(tmp)
        }, 5000)
      }
    }
  }
})

alt.on('gameEntityDestroy', (entity) => {
  if (!myObjects[entity.id]) return
  myObjects[entity.id] = natives.deleteObject(myObjects[entity.id])
})
