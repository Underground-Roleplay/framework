import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('Garage:Refresh', (source, ssn) => {
    Core.Vehicles.loadSourceGarage(source)


})


alt.onClient('Garage:Withdraw', (source, data) => {
    Core.Functions.spawnVehicle(source, data.model)
        // Core.Vehicles.spawn(data)
})
alt.onClient('Garage:Save', (source, data) => {

})


alt.on('loaded', (source, data) => {
    alt.emitClient(source, 'Garage:UpdateVeh', JSON.stringify(data))

});