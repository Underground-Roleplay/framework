import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('fuel:Percents', (source) => {
    alt.emitClient(source, 'UpdateValues', fuelPercents(source));
});

const fuelPercents = (source) => {
    let data =
        (Core.Vehicles.hasFuel(source) / Core.Vehicles.fuelTankSize(source)) *
        100;
    return data > 100 ? 100 : data;
};
