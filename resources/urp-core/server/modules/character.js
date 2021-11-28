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
        //  Maybe we can call creator over here before the data creation
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
        createCharacter(source, playerData, false)
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
    if (source.nextDeathSpawn && Date.now() > source.nextDeathSpawn) {
        setDeath(source, false)
        source.spawn(0, 0, 0, 0)
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
       alt.emitClient(source,'notify', 'error', 'INVENTARIO', 'O item não existe')
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
    alt.emitClient(source,'notify', 'error', 'INVENTARIO', 'Seu inventario está cheio')
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
    alt.emit('Creator:Start', source, playerData)
    //  Maybe we can call creator over here before the DB creation
    if(select){
    startCharacter(source, playerData)
    }
}

//  Player creator must be called before selectCharater
const selectCharacter = async (source, playerData, fromCreation = false) => {
    source.playerData = playerData
    const { position } = source.playerData
    const model = source.playerData.charinfo.gender === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01'
    chat.success(`Logado com sucesso!`);
    Core.Functions.emitPlayerData(source, 'charinfo', source.playerData.charinfo)
    Core.Functions.emitPlayerData(source, 'inventory', source.playerData.inventory)
    setDeath(source, source.playerData.metadata.isdead)
    source.health = source.playerData.metadata.health
    source.armour = source.playerData.metadata.armour
    Core.Functions.setPosition(source, position.x, position.y, position.z, model)
    loadCustoms(source)
    // if(fromCreation){
    //     // Core.Functions.setPosition(source, position.x, position.y, position.z)
      
    // }else{
    //     // Core.Functions.setPosition(source, position.x, position.y, position.z, model)
    //     loadCustoms(source)
    // }
    //We can't pass source directly due its complexity
    alt.emit('Core:Server:CharacterLoaded', source.id)
    alt.emitClient(source, 'Core:Client:CharacterLoaded')
}

const getProps = (source) => {
    if(!source || !source.playerData) return;
    const props = [
        source.getProp(0),
        source.getProp(1),
        source.getProp(2),
        source.getProp(6),
        source.getProp(7),
    ] 
    return props
}

const getComponentVariations = (source) => {
    if(!source || !source.playerData) return;
    const cloth = [
        source.getClothes(0), // Head?
        source.getClothes(1), // Beard
        source.getClothes(2), // Hair
        source.getClothes(3),
        source.getClothes(4),
        source.getClothes(5),
        source.getClothes(6),
        source.getClothes(7),
        source.getClothes(8),
        source.getClothes(9),
        source.getClothes(10),
        source.getClothes(11)
    ] 
    return cloth
}

const getHeadOverlays = (source) => {
    if(!source || !source.playerData) return;
    const headOverlays = [
        source.getHeadOverlay(0),
        source.getHeadOverlay(1),
        source.getHeadOverlay(2), 
        source.getHeadOverlay(3),
        source.getHeadOverlay(4),
        source.getHeadOverlay(5),
        source.getHeadOverlay(6),
        source.getHeadOverlay(7),
        source.getHeadOverlay(8),
        source.getHeadOverlay(9),
        source.getHeadOverlay(10),
        source.getHeadOverlay(11),
        source.getHeadOverlay(12)
    ] 
    return headOverlays
}


const getFaceFeatures = (source) => {
    if(!source || !source.playerData) return;
    const features = [
        source.getFaceFeatureScale(0), //Nose_Width
        source.getFaceFeatureScale(1), //Nose_Peak_Hight
        source.getFaceFeatureScale(2), //Nose_Peak_Lenght
        source.getFaceFeatureScale(3), //Nose_Bone_High
        source.getFaceFeatureScale(4), //Nose_Peak_Lowering
        source.getFaceFeatureScale(5), //Nose_Bone_Twist
        source.getFaceFeatureScale(6), //EyeBrown_High
        source.getFaceFeatureScale(7), //EyeBrown_Forward
        source.getFaceFeatureScale(8), //Cheeks_Bone_High
        source.getFaceFeatureScale(9), //Cheeks_Bone_Width
        source.getFaceFeatureScale(10), //Cheeks_Width
        source.getFaceFeatureScale(11), //Eyes_Openning
        source.getFaceFeatureScale(12), //Lips_Thickness
        source.getFaceFeatureScale(13), //Jaw_Bone_Width
        source.getFaceFeatureScale(14), //Jaw_Bone_Back_Lenght
        source.getFaceFeatureScale(15), //Chimp_Bone_Lowering
        source.getFaceFeatureScale(16), //Chimp_Bone_Lenght
        source.getFaceFeatureScale(17), //Chimp_Bone_Width
        source.getFaceFeatureScale(18), //Chimp_Hole
        source.getFaceFeatureScale(19),  //Neck_Thikness
    ]
    return features
}

const getHairColors = (source) => {
    if(!source || !source.playerData) return;
    const hair = [
        source.getHairColor(),
        source.getHairHighlightColor()
    ]
    return hair
}

//  Use this to update all customization data after a change on playerData
const updateCustoms = async (source) => {
    if(!source || !source.playerData) return;
    const { ssn, customizations } = source.playerData
    db.execute('UPDATE characters_customs SET model = ?, customizations = ?, cloakroom = ? WHERE ssn = ?', [source.model, JSON.stringify(customizations),
     0, ssn], undefined, alt.resourceName)
}

const createCustoms = (source) => {
    if(!source || !source.playerData) return;
    const { ssn } = source.playerData
    const customizations = {
        "headBlend": source.getHeadBlendData(),
        "componentVariations": getComponentVariations(source),
        "features": getFaceFeatures(source),
        "props": getProps(source),
        "eyeColor": source.getEyeColor(),
        "hairColor": getHairColors(source),
        "headOverlays": getHeadOverlays(source)
    }
    db.execute('INSERT INTO characters_customs (ssn, model, customizations, cloakroom) VALUES (?,?,?,?)', [ssn, 
    source.model, JSON.stringify(customizations), 0], undefined, alt.resourceName)
}

const setComponentVariations = (source, componentVariations) => {
    if(!source || !source.playerData) return;
    for(let i = 0; i < componentVariations.length; i++){
        source.setClothes(i, componentVariations[i].drawable, componentVariations[i].texture)
    }
}

const setFaceFeatures = (source, faceFeatures) => {
    if(!source || !source.playerData) return;
    for(let i = 0; i < faceFeatures.length; i++){
        source.setFaceFeature(i, faceFeatures[i])
    }
}

const setProps = (source, props) => {
    if(!source || !source.playerData) return;
    for(let i = 0; i < props.length; i++){
        if (i <= 2) {
            source.setProp(i, props[i].drawable, props[i].texture)
        } else {
            source.setProp(i + 3, props[i].drawable, props[i].texture)
        }
        
    }
}

const setHeadOverlays = (source, headOverlays) => {
    if(!source || !source.playerData) return;
    for(let i = 0; i < headOverlays.length; i++){
        source.setHeadOverlay(i, headOverlays[i].index, headOverlays[i].opacity)
        source.setHeadOverlayColor(i, headOverlays[i].colorType, headOverlays[i].colorIndex, headOverlays[i].secondColorIndex)
    }
  
}

const setDeath = (source, isDead) => {
    source.playerData.metadata.isdead = isDead
    if(!source.playerData.metadata.isdead){
        source.nextDeathSpawn = null
        Core.Functions.emitPlayerData(source, 'isDead', source.playerData.metadata.isdead)
        saveMetadata(source)
        return;
    }
    source.nextDeathSpawn = Date.now() + 30000
    Core.Functions.emitPlayerData(source, 'isDead', source.playerData.metadata.isdead)
    saveMetadata(source)
}

const saveMetadata = (source) => {
    if(!source) return;
    const { metadata, ssn } = source.playerData
    db.execute('UPDATE characters SET metadata = ? WHERE ssn = ?', [JSON.stringify(metadata), ssn], undefined, alt.resourceName)
}

const changeCloth = (source, component, drawable, texture) => {
    if(!source || !source.playerData) return;
    source.setClothes(component, drawable, texture)
    source.playerData.customizations.componentVariations[component].drawable = drawable
    source.playerData.customizations.componentVariations[component].texture = texture
    updateCustoms(source)
}

const loadCustoms = async (source) => {
    if(!source || !source.playerData) return;
   const { ssn } = source.playerData
   const result = await executeSync('SELECT * FROM characters_customs WHERE ssn = ?', [ssn])
   if(result[0]){
        source.playerData.customizations = JSON.parse(result[0].customizations)
        const {headBlend, componentVariations, 
            features, props, eyeColor, hairColor, headOverlays} = source.playerData.customizations
        if(source.model !== parseInt(result[0].model)){
            const { position } = source.playerData
            Core.Functions.setPosition(source, position.x, position.y, position.z, result[0].model)
        }
        source.setHeadBlendData(
            headBlend.shapeFirstID, 
            headBlend.shapeSecondID, 
            headBlend.shapeThirdID, 
            headBlend.skinFirstID, 
            headBlend.skinSecondID, 
            headBlend.skinThirdID, 
            headBlend.shapeMix, 
            headBlend.skinMix, 
            headBlend.thirdMix
        )
        setComponentVariations(source, componentVariations)
        setFaceFeatures(source, features)
        setProps(source, props)
        source.setEyeColor(eyeColor)
        source.setHairColor(hairColor[0])
        source.setHairHighlightColor(hairColor[1])
        setHeadOverlays(source, headOverlays)
        return
    }
    console.log('create appearance')
    createCustoms(source)
}

export default { startCharacter, selectCharacter, addItem, tickManager, updateBasicData, getItemSlot, removeItem, loadCustoms, changeCloth,
    setDeath }