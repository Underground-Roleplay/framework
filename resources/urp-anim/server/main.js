import * as chat from 'urp-chat';
import * as alt from 'alt-server';

chat.registerCmd('e', (source, [indexAnim]) => {
    alt.emitClient(source, 'playAnim', indexAnim);

})

chat.registerCmd('style', (source, [indexMoovement]) => {
    alt.emitClient(source, 'setMoovement', indexMoovement);

 })