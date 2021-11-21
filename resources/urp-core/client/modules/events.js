import * as alt from 'alt-client';
import Core from '../main';

//Initialize Ticks
alt.onServer('Core:Client:CharacterLoaded', () => {
    Core.Functions.startTicks()
})

alt.on('connectionComplete', ()=> {
    Core.Browser.createInstance()
})

alt.on('disconnect', ()=>{
    Core.Browser.destroyInstance()
})