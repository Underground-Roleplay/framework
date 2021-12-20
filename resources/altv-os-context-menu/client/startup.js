import * as alt from 'alt-client';
import * as context from '/client/context';
import * as contextInteractionBuilder from '/client/interactionBuilder';

alt.on('context:Ready', () => { 
    alt.emit('context:CreateMenu', 1437508529, 'Trash Can');
    alt.emit('context:AppendToMenu', 1437508529, 'Look in Trash', 'trashcan:Look', false);
    alt.emit('context:AppendToMenu', 1437508529, 'Dig in Trash', 'trashcan:Dig', true);
});