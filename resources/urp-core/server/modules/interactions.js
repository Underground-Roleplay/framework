import * as alt from 'alt-server'
import Core from '../main';

let registeredInteractions = 0;

const List = {}

const createSingleInteraction = (position, type, eventName, isServer, blip, ped, marker, maxRadius = 2.5, height = 2.5) =>{
    if(!position || !type || !eventName) throw new Error('Missing parameters to create a new interaction');
    const vector = new alt.Vector3(position.x, position.y, position.z)
    const colshape = new alt.ColshapeCylinder(vector.x, vector.y, vector.z, maxRadius, height)
    colshape.playersOnly = true
    colshape['isInteraction'] = true
    colshape['interactionType'] = type
    colshape['isServer'] = isServer
    colshape['eventName'] = eventName
    if(ped){
        Core.Entities.createPed(position, 0, {pedType: ped.pedType, modelHash: ped.modelHash})
    }
    if(marker){
        Core.Entities.createMarker(position, 0, {type: marker.type, r: marker.color.r, g: marker.color.g, b: marker.color.b, a: marker.color.a})
    }
    if(blip){
        const pointBlip = new alt.PointBlip(vector.x, vector.y, vector.z)
        pointBlip.name = blip.name || type
        pointBlip.sprite = blip.sprite || 1
        pointBlip.color = blip.color || 1
        pointBlip.shortRange = true
        colshape['blip'] = pointBlip
    }
    if(!List[type]){
        List[type] = []
    }
    registeredInteractions += 1;
    List[type].push(colshape)
    alt.log('Uma nova interação foi criada')
}

const createMultipleInteractions = (interactions, maxRadius = 2.5, height = 2.5) => {
    if(interactions.length <= 0) throw new Error('Use createSingleInteraction instead');
    let currentInteractions = registeredInteractions;
    interactions.forEach(interaction => {
        if(!interaction.x || !interaction.y || !interaction.z || !interaction.type || !interaction.eventName){
        throw new Error('Wrong parameters are given');
        }
        const vector = new alt.Vector3(interaction.x, interaction.y, interaction.z)
        const colshape = new alt.ColshapeCylinder(vector.x, vector.y, vector.z, maxRadius, height)
        colshape.playersOnly = true
        colshape['isInteraction'] = true
        colshape['interactionType'] = interaction.type
        colshape['isServer'] = interaction.isServer || false
        colshape['eventName'] = interaction.eventName
        if(interaction.blip){
            const pointBlip = new alt.PointBlip(vector.x, vector.y, vector.z)
            pointBlip.name = interaction.blip.name || interaction.type
            pointBlip.sprite = interaction.blip.sprite || 1
            pointBlip.color = interaction.blip.color || 1
            pointBlip.shortRange = true
            colshape['blip'] = pointBlip
        }
        if(interaction.ped){
            Core.Entities.createPed(vector, 0, {pedType: interaction.ped.pedType, modelHash: interaction.ped.modelHash})
        }
        if(interaction.marker){
            Core.Entities.createMarker(vector, 0, {type: interaction.marker.type, r: interaction.marker.color.r, g: interaction.marker.color.g, b: interaction.marker.color.b, a: interaction.marker.color.a})
        }
        if(!List[interaction.type]){
            List[interaction.type] = []
        }
        registeredInteractions += 1;
        List[interaction.type].push(colshape)
    });
    alt.log(`Foram criadas ${registeredInteractions - currentInteractions} interações`)
}

const handleEnterInteraction = (colshape, source) => {
    if (!colshape.hasOwnProperty('isInteraction')) {
        return;
    }

    if (!(source instanceof alt.Player)) {
        return
    }

    Core.Functions.emitPlayerData(source, 'inInteraction', {
    type: colshape['interactionType'], 
    position: new alt.Vector3(colshape.pos.x, colshape.pos.y, colshape.pos.z)
    })
}

const handleLeaveInteraction = (colshape, source) => {
    if (!colshape.hasOwnProperty('isInteraction')) {
        return;
    }

    if (!(source instanceof alt.Player)) {
        return;
    }
    
    Core.Functions.emitPlayerData(source, 'inInteraction', undefined)
}

const triggerInteraction = (source, type) => {
    const interaction = List[type]
    if (!interaction) {
        return;
    }

    const closestInteraction = interaction.find((interaction) => {
        if (source.pos.distanceTo(interaction.pos) <= 3) {
            return true;
        }

        return false;
    });

    if(!closestInteraction){
        return;
    }

    if (closestInteraction.isServer) {
        alt.emit(closestInteraction.eventName, source, closestInteraction.pos);
        return;
    }

    alt.emitClient(source, closestInteraction.eventName, closestInteraction.pos);
}


export default {createSingleInteraction, createMultipleInteractions, handleEnterInteraction, handleLeaveInteraction, triggerInteraction}