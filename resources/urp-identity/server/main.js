import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('Identity:Create', (source, data) => {
    Core.Functions.updateIdentity(source, data);
});
