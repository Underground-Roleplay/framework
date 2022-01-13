import * as alt from 'alt-server';
import Core from 'urp-core';

alt.on('Core:Server:CharacterLoaded', (sourceID) => {
    const source = alt.Player.all.find((p) => p.id === sourceID);
    console.log(Core.Functions.getMoney(source));
});
