import * as alt from 'alt-server';
import * as chat from 'urp-chat';
import { defaultInteractions } from '../../shared/configs/examples/interactions';
import Core from '../main';


chat.registerCmd('addItem', (source, args) => {
   const [ item, amount, slot ] = args
   if(!item || !amount){
      alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), '/addItem item_name amount')
      return;
   } 
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
        Core.Inventory.addItem(source, item, amount, slot ? slot : undefined)
   }else{
      alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
   }
})

/**
 * It checks if the player has the permission to use the command, if they do, it checks if the
identifier is a SSN or an ID, if it's a SSN, it finds the player with that SSN, if it's an ID, it
finds the player with that ID, then it heals the player.
 * @param source - The player who executed the command.
 * @param undefined - The first parameter is the source, which is the player who executed the
command.
 * @returns The player's health.
 */
chat.registerCmd('heal', (source, [identifier]) => {
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
      if(!identifier) return
      const ssnRegex = /[0-9]{6}\-[0-9]{4}/g
      if(identifier.match(ssnRegex)){
      const target = alt.Player.all.find(source => 
      source.playerData.ssn === identifier)
      if(!target) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
      Core.Character.adminHeal(target)
      alt.emitClient(source,'notify', 'success', Core.Translate('HOSPITAL.LABEL'), Core.Translate('HOSPITAL.HEALLER', { targetplayer: identifier }))
   }else{
      const target = alt.Player.all.find(source => 
       source.playerData.id === identifier)
       if(!target) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
       Core.Character.adminHeal(target)
       alt.emitClient(source,'notify', 'success', Core.Translate('HOSPITAL.LABEL'), Core.Translate('HOSPITAL.HEALLER', { targetplayer: identifier }))
   }
   }else{
      alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
   }
})

chat.registerCmd('tpcds', (source, [x, y, z]) => {
   if(!x || !y || !z){
      alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), '/tpcds x y z')
      return;
   } 
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
        Core.Functions.setPosition(source, parseInt(x), parseInt(y), parseInt(z))
   }else{
      alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
   }
})


/**
 * This function will add a license to a player.
 * @param source - The player that executed the command.
 * @param undefined - The first parameter is the source, which is the player who executed the
command.
 * @returns The license is being returned to the player.
 */
 chat.registerCmd('glicense', (source, [identifier,type]) => {
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
      if(!identifier || !type) return
      const ssnRegex = /[0-9]{6}\-[0-9]{4}/g
      if(identifier.match(ssnRegex)){
      const target = alt.Player.all.find(source => 
      source.playerData.ssn === identifier)
      if(!target) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
      Core.License.addLicense(target, type)
   }else{
      const target = alt.Player.all.find(source => 
       source.playerData.id === identifier)
       if(!target) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
       Core.License.addLicense(target, type)
   }
   alt.emitClient(source,'notify', 'success', Core.Translate('LICENSE.LABEL'), Core.Translate('LICENSE.LICENSE_ISSUED', { licenseType: type }))
   }else{
      alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
   }
 }) 

/**
 * This function will remove a license from a player.
 * @param source - The player who executed the command.
 * @param undefined - The first parameter is the source player.
 * @returns The license type.
 */
 chat.registerCmd('rlicense', (source, [identifier,type]) => {
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
      if(!identifier || !type) return
      const ssnRegex = /[0-9]{6}\-[0-9]{4}/g
      if(identifier.match(ssnRegex)){
      const target = alt.Player.all.find(source => 
      source.playerData.ssn === identifier)
      if(!target) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
      Core.License.removeLicense(target, type)
   }else{
      const target = alt.Player.all.find(source => 
      source.playerData.id === identifier)
      if(!target) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
      Core.License.removeLicense(target, type)
   }
      alt.emitClient(source,'notify', 'success', Core.Translate('LICENSE.LABEL'), Core.Translate('LICENSE.LICENSE_REVOKED', { licenseType: type }))
   }else{
      alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
   }
 }) 

chat.registerCmd('c', (source, [model]) => {
   if(!model){
      alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), '/c (model)')
      return;
  }
  //const isAllowed = Core.Functions.hasPermission(source, 'admin')
  //if(isAllowed){
     Core.Functions.spawnVehicle(source, model)
     alt.emitClient(source,'notify', 'success', Core.Translate('SYSTEM.LABEL'),  `${model} SPAWNED`)
  //}else{
  // alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
 // }
})
chat.registerCmd('anuncio', (source, [model]) => {
   if (!source) return
   alt.emitClient(source,'notifyCenter', 'comunicado', model)
})

//Delete Spawn Vehicle or store player vehicle to garrage
chat.registerCmd('dv', (source) => {
  const isAllowed = Core.Functions.hasPermission(source, 'admin')
  if(isAllowed){
   const closestVeh = alt.Vehicle.all.find((v) => source.pos.distanceTo(v.pos) < 50)
   if(!closestVeh){
       alt.emitClient(source,'notify', 'error', 'GARAGE', 'YOU DONT HAVE ANY VEHICLE OF YOURS CLOSE TO YOU')
       return;
   }
   //Destroy veh now
   Core.Vehicles.putInGarage(source, closestVeh)
  }else{
  alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
 }
})


// TODO
chat.registerCmd('whitelist', (source, [socialID])=>{
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
   if(!socialID){
         alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), 'Especifique um id para adicionar a whitelist')
         return;
      }
      Core.Functions.whitelistBanStatus(source, socialID, 'whitelist')
}else{
      alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
     }
})

chat.registerCmd('ban', (source, [socialID, reason])=>{
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
      
   if(!socialID || !reason){
         alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), 'Type /ban social ID reason')
         return;
      }
      const target = alt.Player.all.find(source => 
         source.playerData.socialID === socialID)
         if(!target || target === source) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
         Core.Functions.whitelistBanStatus(source, socialID, 'ban')
         target.kick(Core.Translate('ACCOUNT.BAN', { reason: reason }))
}else{
      alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
     }
})

chat.registerCmd('unban', (source, [socialID])=>{
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
      
   if(!socialID){
         alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), 'Type /ban social ID reason')
         return;
      }
         Core.Functions.whitelistBanStatus(source, socialID, 'unban')
}else{
      alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
     }
})

chat.registerCmd('cloth', (source, [component, drawable, texture])=>{
   if(!component || !drawable || !texture){
      alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), 'use /cloth [component drawable texture]')
      return;
   }
   Core.Character.changeCloth(source, component, drawable, texture)
})

chat.registerCmd('addmoney', (source, [moneytype, amount])=>{
   if(amount == NaN){return}

   if(moneytype && amount){
      Core.Money.addMoney(source, moneytype, amount)
   }
})

chat.registerCmd('getIdentity', (source) => {
   Core.Functions.getIdentityByProximity(source)
})

chat.registerCmd('pos', (source) => {
console.log(source.pos)
})

chat.registerCmd('createTestInteractions', (source)=>{
   Core.Interactions.createMultipleInteractions(defaultInteractions)
})

chat.registerCmd('createInteraction', (source)=>{
   Core.Interactions.createSingleInteraction(source.pos, 'random', 'test', false, undefined, undefined, )
})

chat.registerCmd('createInteractionWithMarker', (source)=>{
   Core.Interactions.createSingleInteraction(source.pos, 'random', 'test', false, {name: 'Random event marker'}, undefined, {type: 5, color: new alt.RGBA(0, 181, 204, 200)} )
})

chat.registerCmd('createInteractionWithPed', (source)=>{
   Core.Interactions.createSingleInteraction(source.pos, 'random', 'test', false, undefined, {pedType: 2, modelHash: alt.hash('s_m_o_busker_01')}, )
})

chat.registerCmd('createPed', (source) => {
   Core.Entities.createPed(source.pos, 0, {pedType:3, modelHash: alt.hash('mp_m_freemode_01')})
})

chat.registerCmd('createMarker', (source) => {
   const color =  new alt.RGBA(0, 181, 204, 200)
   Core.Entities.createMarker(source.pos, 0, {type: 0, r: color.r, g: color.g, b: color.b, a: color.a})
})

chat.registerCmd('entityPos', (source, [id, type]) => {
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(!isAllowed){
     alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
   }
   if(!id || !type) return;
   Core.Entities.setEntityPosition(parseInt(id), parseInt(type), source.pos)
})

chat.registerCmd('noclip', (source) => {   
   alt.emitClient(source, 'admin:Noclip');
})

chat.registerCmd('god', (source) => {
   source.invincible = !source.invincible
   alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'),`${source.invincible ? 'GOD MODE ON' : 'GODE MODE OFF'}`)
})

chat.registerCmd('tpwp', (source) => {   
   //const isAllowed = Core.Functions.hasPermission(source, 'admin')
   //if(isAllowed){
      alt.emitClient(source, 'admin:tpwp');
   //}
})

chat.registerCmd('addcar', (source,[model])=> {
   Core.Vehicles.addToSource(source, model)
})

chat.registerCmd('toggleEngine', (source)=> {
   if(!source.vehicle) {
      alt.emitClient(source,'notify', 'error', Core.Translate('VEHICLES.LABEL'), Core.Translate('VEHICLES.NOT_IN_A_VEH'))
      return;
   }
  Core.Vehicles.handleToggleEngine(source, source.vehicle)
})

chat.registerCmd('kick', (source, [identifier, reason]) => {
   if(!identifier){
      alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.TARGET_NEEDED_IDENTIFIER'))
      return
   }
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(!isAllowed){
     alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
     return;
   }
   const ssnRegex = /[0-9]{6}\-[0-9]{4}/g
   if(identifier.match(ssnRegex)){
     const target = alt.Player.all.find(source => 
      source.playerData.ssn === identifier)
      if(!target || target === source) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
      target.kick(reason)
      return;
   }
   const target = alt.Player.all.find(source => 
      source.playerData.id === identifier)
      if(!target || target === source) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
      target.kick(reason)
})


chat.registerCmd('tpto', (source, [identifier]) => {
   if(!identifier){
      alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.TARGET_NEEDED_IDENTIFIER'))
      return
   }
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(!isAllowed){
     alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
     return;
   }
   const ssnRegex = /[0-9]{6}\-[0-9]{4}/g
   if(identifier.match(ssnRegex)){
     const target = alt.Player.all.find(source => 
      source.playerData.ssn === identifier)
      if(!target || target === source) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
      source.pos = target.pos
      return;
   }
   const target = alt.Player.all.find(source => 
   source.playerData.id === identifier)
   if(!target || target === source) return alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.NO_TARGET_FOUND'))
   source.pos = target.pos
})

chat.registerCmd('showid', (source) => {
   if(!source.playerData) return;
   chat.send(source, `your id is ${source.playerData.id}`);
})

chat.registerCmd('showssn', (source) => {
   if(!source.playerData) return;
   chat.send(source, `your ssn is ${source.playerData.ssn}`);
})

chat.registerCmd('setJob', (source, [job, grade]) => {
   if(!source) return;
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(!isAllowed){
     alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
     return;
   }
   Core.Functions.setJob(source, job, grade)
})