import * as alt from 'alt-server';

import Core from 'urp-core';

import { Doors } from '../shared/config';

alt.onClient('doorLock:server:updateState', (source, doorID, state) => {
    const sourceJob = Core.Functions.getPlayerData(source, 'job').name;
    if (!sourceJob || !Doors[doorID].authorizedJobs.includes(sourceJob)) return;
    Doors[doorID].locked = state;
    alt.emitAllClients('doorLock:client:setState', doorID, state);
});
