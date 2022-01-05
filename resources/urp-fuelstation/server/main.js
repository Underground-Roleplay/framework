import Core from 'urp-core';
import * as alt from 'alt-server';


alt.onClient('Station:abastecer', (source, liters, price,fuelType) => {
    let type = Core.Vehicles.fuelType(source)
    if (type !== fuelType) return  alt.emitClient(source, 'notify', 'error', 'erro', 'don`t type fuel')
    if (Core.Money.hasMoney(source,'cash', (liters*price))) {
        Core.Money.getPayment(source, (liters*price))
        Core.Vehicles.reFuel(source,liters)
    } else {
        alt.emitClient(source, 'notify', 'error', 'erro', 'don`t money')
    }
})

alt.onClient('Station:UpdateValues', (source) => {
    let dataTank={   
        tank: Core.Vehicles.hasFuel(source),
        full: Core.Vehicles.fuelTankSize(source),
    }
    let dataPrice ={
        oil: 1.22,
        gasoil: 1.5
    }
    let porcentagem = 0.35

    alt.emitClient(source,'Station:UpdateValues',dataTank,dataPrice,porcentagem)
})

