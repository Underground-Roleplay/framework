import Core from 'urp-core';
import * as alt from 'alt-server';


alt.onClient('Bank:transfer', (source, data) => {
    let i = JSON.parse(data)
    alt.log(i.ssn, i.value)

    alt.setTimeout(() => { alt.emitClient(source, 'Bank:RefreshMoney') }, 100)
})

alt.onClient('Bank:deposit', (source, value) => {
    Core.Character.moneyDeposit(source, value)

    alt.setTimeout(() => { alt.emitClient(source, 'Bank:RefreshMoney') }, 100)
})

alt.onClient('Bank:withdraw', (source, value) => {
    Core.Character.moneywithdraw(source, value)
    alt.setTimeout(() => { alt.emitClient(source, 'Bank:RefreshMoney') }, 100)
})