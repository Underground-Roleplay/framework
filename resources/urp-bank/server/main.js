import Core from 'urp-core';
import * as alt from 'alt-server';
import { ATM_LIST } from '../shared/config';

Core.Interactions.createMultipleInteractions(ATM_LIST)

alt.onClient('Bank:transfer', (source, data) => {
    let i = JSON.parse(data)
    Core.Money.transferMoney(source, i.ssn, i.value)
    alt.setTimeout(() => { alt.emitClient(source, 'Bank:RefreshMoney') }, 100)
})

alt.onClient('Bank:deposit', (source, value) => {
    if(!value || parseInt(value) <= 0) return;
    Core.Money.moneyDeposit(source, value)
    alt.setTimeout(() => { alt.emitClient(source, 'Bank:RefreshMoney') }, 500)
})

alt.onClient('Bank:withdraw', (source, value) => {
    if(!value || parseInt(value) <= 0) return;
    Core.Money.moneywithdraw(source, value)
    alt.setTimeout(() => { alt.emitClient(source, 'Bank:RefreshMoney') }, 500)
})