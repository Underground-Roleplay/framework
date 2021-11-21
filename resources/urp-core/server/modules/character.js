import * as alt from 'alt-server';
import * as chat from 'urp-chat';

import db from 'mysql2-wrapper';

import Core from '../main';

import { executeSync } from '../libs/utils';

const startCharacter = async (source, newCharacter = undefined) => {
    if(newCharacter){
        checkPlayerData(source, newCharacter)
        return;
    }
    const result = await executeSync('SELECT * from characters WHERE socialID = ?', [source.socialID])
    const playerData = result[0]
    if(playerData){
        playerData.money = JSON.parse(playerData.money)
        playerData.job =  JSON.parse(playerData.job)
        playerData.gang =  JSON.parse(playerData.gang)
        playerData.position = JSON.parse(playerData.position)
        playerData.metadata = JSON.parse(playerData.metadata)
        playerData.charinfo = JSON.parse(playerData.charinfo)
        playerData.inventory = playerData.inventory ? JSON.parse(playerData.inventory) : []
        checkPlayerData(source, playerData)
        return;
    }
    checkPlayerData(source)
}

const createSSN = async () => {
    let uniqueFound = false
    let ssn = undefined;
    while(!uniqueFound){
        ssn = `${Math.floor(Math.random() * 1000000)}-${ Math.floor(Math.random() * 10000)}` 
        const result = await executeSync('SELECT COUNT(*) as count FROM characters WHERE ssn = ?', [ ssn ])
        if (result[0]['count'] == 0) {
            uniqueFound = true
        }
    }
    return ssn
}

const checkPlayerData = async (source, playerData = undefined) => {
    if (!source) return;
    if(!playerData){
        playerData = new Object()
        playerData.source = source
        playerData.ssn = await createSSN()
        playerData.license = source.socialID
        playerData.name = source.name
        playerData.cid = 1
        playerData.money = Core.Config.DefaultMoney
        // Charinfo
        playerData.charinfo = Core.Config.DefaultInfo
        playerData.charinfo.phone = `1${Math.floor(Math.random() * 100000000)}`
        playerData.charinfo.account =  'US0' + Math.floor(Math.random() * 10) + 'xRP' + Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 100)
        //Job
        playerData.job = Core.Config.DefaultJob
        //Gang
        playerData.gang = Core.Config.DefaultGang
        //Metadata
        playerData.metadata = Core.Config.DefaultMeta
        //Position
        playerData.position = Core.Config.DefaultSpawn
        //Inventory 
        playerData.inventory = []
        createCharacter(source, playerData)
        return;
    }
    selectCharacter(source, playerData)
}

const tickManager = (source) =>{
    if (!source.nextPingTime) {
        source.nextPingTime = Date.now() + Core.Config.SaveInterval;
    }
    if (Date.now() < source.nextPingTime) {
        return;
    }
    updateBasicData(source)
    source.nextPingTime = Date.now() + Core.Config.SaveInterval;
}

const updateBasicData = async (source) => {
    if(!source) return;
    source.playerData.position = source.pos
    source.playerData.metadata.health = source.health
    source.playerData.metadata.armour = source.armour
    db.update('UPDATE characters SET metadata = ?, position = ? WHERE ssn = ?', [JSON.stringify(source.playerData.metadata), JSON.stringify(source.pos), source.playerData.ssn], undefined,
    alt.resourceName)
}

// Inventory i think this must be in a separated module
const getCurrentWeight = (inventory) =>{
    let weight = 0
    if(!inventory) return;
    for (let i = 0; i < inventory.length; i++) {
        weight = !inventory[i] ? weight : weight + (inventory[i].weight * inventory[i].amount)
    }
    return Number(weight)
}

const getItemSlot = (inventory, item) => {
    if(!item || !inventory) return;
    for (let i = 0; i < inventory.length; i++) {
    if(inventory[i]){
        if(inventory[i].name.toLowerCase() === item.toLowerCase()){
          return i
        }
    }
    }
    return undefined
}

const addItem = (source, item, amount, slot, info) => {
    const totalWeight = getCurrentWeight(source.playerData.inventory)
    const itemInfo = Core.Shared.Items[item.toLowerCase()]
    if(!itemInfo){
        alt.emitClient(source, 'client:notify:sendMessage', 
        {iconType: 0, title: 'INVENTARIO', 
        message: 'O item não existe', 
        color: 'FC2E20', width: 244, duration: 3000}
        )
        return false;
    }
    if(!slot){
        slot = getItemSlot(source.playerData.inventory, item)
    }
    amount = Number(amount)
    slot = Number(slot)
    if(itemInfo.type === 'weapon'){
        info = {
            serie: '99999'
        }
    }
    // Verify total weight
    if(totalWeight + (itemInfo.weight * amount) <= Core.Config.MaxWeight){
        if(!itemInfo.unique && (slot || slot === 0) && !source.playerData.inventory[slot]){
            source.playerData.inventory[slot] = {
                name: itemInfo.name,
                amount: amount,
                info: info || '',
                label: itemInfo.label,
                description: itemInfo.description || '',
                weight: itemInfo.weight,
                type: itemInfo.type,
                unique: itemInfo.unique,
                useable: itemInfo.useable,
                image: itemInfo.image,
                shouldClose: itemInfo.shouldClose,
                slot: slot,
                combinable: itemInfo.combinable
            }
            saveInventory(source)
            return true
        }
        if(slot || slot === 0 && source.playerData.inventory[slot] && source.playerData.inventory[slot].name.toLowerCase() === item.toLowerCase() && itemInfo.type === 'item' && !itemInfo.unique){
            source.playerData.inventory[slot].amount = source.playerData.inventory[slot].amount + amount
            saveInventory(source)
            return true
        }
        if(itemInfo.unique || !slot && slot !== 0 || itemInfo.type === 'weapon'){
            for(let i = 0; i < Core.Config.MaxInvSlots; i++){
                if(!source.playerData.inventory[i]){
                    source.playerData.inventory[i] = {
                        name: itemInfo.name,
                        amount: amount,
                        info: info || '',
                        label: itemInfo.label,
                        description: itemInfo.description || '',
                        weight: itemInfo.weight,
                        type: itemInfo.type,
                        unique: itemInfo.unique,
                        useable: itemInfo.useable,
                        image: itemInfo.image,
                        shouldClose: itemInfo.shouldClose,
                        slot: i,
                        combinable: itemInfo.combinable
                    }
                    saveInventory(source)
                    return true
                }
            }
        }
    }
    alt.emitClient(source, 'client:notify:sendMessage', 
    {iconType: 0, title: 'INVENTARIO', 
    message: 'Seu inventario está cheio', 
    color: 'FC2E20', width: 244, duration: 3000}
    )
    return false
}

const removeItem = (source, item, amount) => {
    amount = Number(amount)

    const slot = getItemSlot(source.playerData.inventory, item)
    if(!slot) return false;

    if(source.playerData.inventory[slot].amount > amount){
        source.playerData.inventory[slot].amount = source.playerData.inventory[slot].amount - amount
        saveInventory(source)
        return true
    }
    if(source.playerData.inventory[slot].amount === amount){
        source.playerData.inventory[slot] = undefined
        saveInventory(source)
        return true
    }
    return false
}

const saveInventory = async (source) => {
    if(!source) return;
    const { inventory, ssn } = source.playerData;
    db.execute('UPDATE characters SET inventory = ? WHERE ssn = ?', [JSON.stringify(inventory), ssn], undefined, alt.resourceName)
    Core.Functions.emitPlayerData(source, 'inventory', inventory)
}
// End inventory
const createCharacter = async (source, playerData, select = true) => {
    db.insert('INSERT INTO characters (ssn, cid, socialID, name, money, charinfo, job, gang, position, metadata, inventory) VALUES (:ssn, :cid, :socialID, :name, :money, :charinfo, :job, :gang, :position, :metadata, :inventory) ON DUPLICATE KEY UPDATE cid = :cid, name = :name, money = :money, charinfo = :charinfo', {
        ssn: playerData.ssn,
        cid: playerData.cid,
        socialID: source.socialID,
        name: playerData.name,
        money: JSON.stringify(playerData.money),
        charinfo: JSON.stringify(playerData.charinfo),
        job: JSON.stringify(playerData.job),
        gang: JSON.stringify(playerData.gang),
        position: JSON.stringify(playerData.position),
        metadata: JSON.stringify(playerData.metadata),
        inventory: JSON.stringify(playerData.inventory)
    }, undefined, alt.resourceName)
    console.log(Core.Translate('CHARACTER.CREATION_SUCCESS'))
    if(select){
    startCharacter(source, playerData)
    }
}

const selectCharacter = async (source, playerData) => {
    source.playerData = playerData
    source.Functions = new Object()
    const { position } = source.playerData
    const model = source.playerData.charinfo.gender === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01'
    chat.success(`Logado com sucesso!`);
    Core.Functions.setPosition(source, position.x, position.y, position.z, model)
    Core.Functions.emitPlayerData(source, 'charinfo', source.playerData.charinfo)
    Core.Functions.emitPlayerData(source, 'inventory', source.playerData.inventory)
    source.health = source.playerData.metadata.health
    source.armour = source.playerData.metadata.armour
    //We can't pass source directly due its complexity
    alt.emit('Core:Server:CharacterLoaded', source.id)
    alt.emitClient(source, 'Core:Client:CharacterLoaded')
}

export default { startCharacter, addItem, tickManager, updateBasicData, getItemSlot, removeItem }