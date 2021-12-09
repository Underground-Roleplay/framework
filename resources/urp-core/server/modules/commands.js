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


chat.registerCmd('c', (source, [model]) => {
   if(!model){
      alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), '/c (model)')
      return;
  }
  //const isAllowed = Core.Functions.hasPermission(source, 'admin')
  //if(isAllowed){
     Core.Functions.spawnVehicle(source, model)
     alt.emitClient(source,'notify', 'sucess', Core.Translate('SYSTEM.LABEL'),  `${model} SPAWNED`)
  //}else{
  // alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
 // }
})

// TODO
chat.registerCmd('whitelist', (source, [id])=>{
   if(!id){
      alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), 'Especifique um id para adicionar a whitelist')
      return;
   }
})


chat.registerCmd('cloth', (source, [component, drawable, texture])=>{
   if(!component || !drawable || !texture){
      alt.emitClient(source,'notify', 'error', Core.Translate('COMMANDS.LABEL'), 'use /cloth [component drawable texture]')
      return;
   }
   Core.Character.changeCloth(source, component, drawable, texture)
})

chat.registerCmd('setmoney', (source, [moneytype, amount])=>{
   if(amount == NaN){return}

   if(moneytype && amount){
      Core.Character.setMoney(source, moneytype, amount)
   }
})

chat.registerCmd('addmoney', (source, [moneytype, amount])=>{
   if(amount == NaN){return}

   if(moneytype && amount){
      Core.Character.addMoney(source, moneytype, amount)
   }
})

chat.registerCmd('getpayment', (source, [amount])=>{
   if(amount == NaN){return}

   if(amount){
      Core.Character.getPayment(source, amount)
   }
}) 


chat.registerCmd('deposit', (source, [amount])=>{
   if(amount == NaN){return}

   if(amount){
      Core.Character.moneyDeposit(source, amount)
   }
})

chat.registerCmd('withdraw', (source, [amount])=>{
   if(amount == NaN){return}

   if(amount){
      Core.Character.moneywithdraw(source, amount)
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

chat.registerCmd('noclip', (source) => {   
   alt.emitClient(source, 'admin:Noclip');
})


chat.registerCmd('tpwp', (source) => {   
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(isAllowed){
      alt.emitClient(source, 'admin:tpwp');
   }
})

chat.registerCmd('garage', (source)=> {
   Core.Vehicles.loadSourceGarage(source)
}) 

chat.registerCmd('addcar', (source,[model])=> {
   Core.Vehicles.addToSource(source, model)
})

chat.registerCmd('spawncar', (source,[id])=> {
   Core.Vehicles.spawnById(source, id, source.pos)
})

chat.registerCmd('toggleEngine', (source)=> {
   if(!source.vehicle) {
      alt.emitClient(source,'notify', 'error', Core.Translate('VEHICLES.LABEL'), Core.Translate('VEHICLES.NOT_IN_A_VEH'))
      return;
   }
  Core.Vehicles.handleToggleEngine(source, source.vehicle)
})

chat.registerCmd('tpto', (source, [identifier]) => {
   if(!identifier){
      alt.emitClient(source,'notify', 'error', Core.Translate('SYSTEM.LABEL'), Core.Translate('SYSTEM.TARGET_NEEDED_IDENTIFIER'))
      return
   }
   const isAllowed = Core.Functions.hasPermission(source, 'admin')
   if(!isAllowed){
     alt.emitClient(source,'notify', 'error', Core.Translate('PERMISSIONS.LABEL'), Core.Translate('PERMISSIONS.DONT_HAVE_PERM'))
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