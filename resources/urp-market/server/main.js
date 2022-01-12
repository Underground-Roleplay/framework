import Core from 'urp-core';
import * as alt from 'alt-server';
import { MARKET_LIST } from '../shared/config';

Core.Interactions.createMultipleInteractions(MARKET_LIST);

const data = [
    // drink
    { index: 'water_bottle', type: 'drink', name: 'Agua', value: 30 },
    { index: 'coffee', type: 'drink', name: 'Cafe', value: 30 },
    { index: 'beer', type: 'drink', name: 'cerveja', value: 30 },
    { index: 'vodka', type: 'drink', name: 'vodka', value: 30 },
];

alt.onClient('Market:purchase', (source, quantidade, i, value) => {
    if (Core.Inventory.isItem(source, i)) {
        let total = quantidade * value;
        if (Core.Money.hasFullMoney(source, total)) {
            Core.Money.getPayment(source, total);
            Core.Inventory.addItem(source, i, quantidade);
            alt.emitClient(source, 'notify', 'error', 'erro', 'comprou');
        } else {
            alt.emitClient(source, 'Market:close');
            alt.emitClient(source, 'notify', 'error', 'erro', 'don`t money');
        }
    } else {
        alt.emitClient(source, 'notify', 'error', 'erro', 'item nao existe');
    }
});

alt.onClient('Market:updateData', (source) => {
    alt.emitClient(source, 'Market:updateData', data);
});
