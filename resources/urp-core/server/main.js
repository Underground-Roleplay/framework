/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

import { URPConfig } from '../shared/configs/base'; 

import functions from './modules/functions';
import character from './modules/character';
import vehicle from './modules/vehicle';

import './modules/events';
import './modules/commands';

import { init, translate } from './libs/locale';
import { Items } from '../shared/configs/items';
import { executeSync } from './libs/utils';
import interactions from './modules/interactions';
import entities from './modules/entities';

const Core = {}

Core.Config = URPConfig

Core.Shared = {}

Core.Shared.Items = Items

init(Core.Config.lang)

Core.Character = character
Core.Vehicle = vehicle

Core.Entities = entities

Core.PermissionList = {}

Core.Translate = translate

Core.Interactions = interactions

Core.Functions = functions

Core.DBReady = false

alt.on('database:Ready', async() => {
    Core.DBReady = true
    const res = await executeSync('SELECT * FROM permissions', {})
    if(res){
        for(let i = 0; i < res.length; i++){
            Core.PermissionList[res[i].socialID] = {
                socialID: res[i].socialID,
                permission: res[i].permission
            }
        }
    }
    //alt.emit('Core:CreateLog', 'default', 'SERVER', undefined, Core.Translate('SERVER.STARTED'))
    console.log(Core.Translate('SERVER.STARTED'))
})

export default Core;