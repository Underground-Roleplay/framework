import Core from 'urp-core';
import * as alt from 'alt-server';


alt.onClient('fuel:Percents', (source) => {
  alt.emitClient(source,'UpdateValues',fuelPercents(source))
})

const fuelPercents = (source)=>{
  let porcentagem = 0;
  let dataTank={   
    tank: Core.Vehicles.hasFuel(source),
    full: Core.Vehicles.fuelTankSize(source),
  }
  porcentagem = (dataTank.tank / dataTank.full) * 100 
  return porcentagem
}


