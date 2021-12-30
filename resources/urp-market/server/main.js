import Core from 'urp-core';
import * as alt from 'alt-server';
//import { MARKET_LIST } from '../shared/config';

//Core.Interactions.createMultipleInteractions(MARKET_LIST)


const data = [
    // drink
    {  index: 'water', type:'drink',  name:'Water',  value: 30  },
    {  index: 'milk', type:'drink',  name:'Milk',  value: 30  },
   // {  index: 'coffe', type:'drink',  name:'Coffe',  value: 30  },
    {  index: 'cappuccino', type:'drink',  name:'Cappuccino',  value: 30  },
    {  index: 'sprunk', type:'drink',  name:'Sprunk',  value: 30  },
    {  index: 'cola', type:'drink',  name:'Cola',  value: 30  },
   //  drink alcolic
    //{  index: 'energetic', type:'drink',  name:'Energetic',  value: 30  },
    //{  index: 'pib', type:'drink',  name:'Pib Wassen',  value: 30  },
    //{  index: 'tequila', type:'drink',  name:'Tequila',  value: 30  },
    //{  index: 'patriot', type:'drink',  name:'Patriot',  value: 30  },
    //  food
    {  index: 'sandwich', type:'food',  name:'Sandwich',  value: 30  },
    {  index: 'hotdog', type:'food',  name:'Hotdog',  value: 30  },
    {  index: 'donut', type:'food',  name:'Donut',  value: 30  },
    {  index: 'xburguer', type:'food',  name:'Xburguer',  value: 30  },
    {  index: 'chips', type:'food',  name:'Chips',  value: 30  },
    {  index: 'potato', type:'food',  name:'Potato',  value: 30  },
    {  index: 'pizza', type:'food',  name:'Pizza',  value: 30  },
    //{  index: 'chicken', type:'food',  name:'Chicken',  value: 30  },
    {  index: 'cereal', type:'food',  name:'Cereal',  value: 30  },
    {  index: 'taco', type:'food',  name:'Taco',  value: 30  },
    // utilits
    {  index: 'bag', type:'utilits',  name:'Bag',  value: 30  },
    {  index: 'repairkit', type:'utilits',  name:'Repair Kit',  value: 30  },
]


alt.onClient('Market:purchase', (source, quantidade,i,value) => {
    let total = quantidade * value;
    if (Core.Money.hasFullMoney(source, total)) {
        Core.Money.getPayment(source, total)
        ///set drop item
    } else {
        alt.emitClient(source, 'Market:close')
        alt.emitClient(source, 'notify', 'error', 'erro', 'don`t money')
    }
})
alt.onClient('Market:updateData', (source) => {
  alt.emitClient(source,'Market:updateData',data)
})
