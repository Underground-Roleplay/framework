/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-webview" />
/// <reference types="@altv/types-natives" />

import { URPConfig } from "../shared/configs/base"

import functions from "./functions"

import './events'

const Core = {}

Core.Config = URPConfig

Core.Functions = functions

export default Core;