/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

import { URPConfig } from '../shared/configs/base';

import functions from './modules/functions';
import character from './modules/character';
import interactions from './modules/interactions';
import entities from './modules/entities';
import inventory from './modules/inventory';
import vehicles from './modules/vehicles';
import money from './modules/money';
import license from './modules/license';
import job from './modules/job';

import voice from 'urp-voice';

import './modules/events';
import './modules/commands';

import { init, translate } from './libs/locale';
import { Items } from '../shared/configs/items';
import { executeSync } from './libs/utils';
import { Jobs } from '../shared/configs/jobs';

const Core = {};

Core.Config = URPConfig;

Core.Shared = {};

Core.Shared.Items = Items;

Core.Shared.Jobs = Jobs;

init(Core.Config.lang);

Core.Character = character;

Core.Inventory = inventory;

Core.Money = money;

Core.Vehicles = vehicles;

Core.Entities = entities;

Core.Voice = voice;

Core.PermissionList = {};

Core.Translate = translate;

Core.Interactions = interactions;

Core.Functions = functions;

Core.License = license;

Core.Job = job;

Core.DBReady = false;

alt.on('database:Ready', async () => {
    Core.DBReady = true;
    const res = await executeSync('SELECT * FROM permissions', {});
    if (res) {
        for (let i = 0; i < res.length; i++) {
            Core.PermissionList[res[i].socialID] = {
                socialID: res[i].socialID,
                permission: res[i].permission,
            };
        }
    }
    //alt.emit('Core:CreateLog', 'default', 'SERVER', undefined, Core.Translate('SERVER.STARTED'))
    console.log(Core.Translate('SERVER.STARTED'));
});

export default Core;
