import * as alt from 'alt-client';
import * as context from '/client/context';
import * as contextInteractionBuilder from '/client/interactionBuilder';

alt.on('context:Ready', () => { 
    alt.emit('context:CreateMenu', 2287735495, 'Gas Station');
    alt.emit('context:AppendToMenu', 2287735495, 'buy gas', 'Station:open', false);
});


