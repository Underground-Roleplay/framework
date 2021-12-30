import Core from 'urp-core';
import * as alt from 'alt-server';


alt.onClient('Station:abastecer', (source, liters, price) => {
 
})

alt.onClient('Station:UpdateValues', (source,) => {

    alt.emitClient(source,'Station:UpdateValues',dataTank,dataPrice,porcentagem)
})

