/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-webview" />
/// <reference types="@altv/types-natives" />

import { URPConfig } from '../shared/configs/base';

import functions from './modules/functions';

import utils from './modules/utils';

import browser from './modules/browser';

import entities from './modules/entities';

import './modules/events';

const Core = {};

Core.Config = URPConfig;

Core.Browser = browser;

Core.Functions = functions;

Core.Utils = utils;

Core.Entities = entities;

export default Core;
