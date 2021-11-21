/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-webview" />
/// <reference types="@altv/types-natives" />

import { URPConfig } from '../shared/configs/base'

import functions from './modules/functions'

import browser from './modules/browser'

import './modules/events'


const Core = {}

Core.Config = URPConfig

Core.Browser = browser

Core.Functions = functions


export default Core;