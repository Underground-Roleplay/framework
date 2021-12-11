import * as alt from 'alt-server';

import db from 'mysql2-wrapper';

import Core from '../main';

import { executeSync } from '../libs/utils';


//  Bank
const setMoney = (source, moneytype, amount) => {
    if(source.playerData.money[moneytype]){
        source.playerData.money[moneytype] = parseInt(amount)
        updateMoney(source)
    }
    return
}

const moneyDeposit = (source, amount) => {
    if(source.playerData.money['cash'] >= amount){
        source.playerData.money['cash'] = parseInt(source.playerData.money['cash']) - parseInt(amount)
        source.playerData.money['bank'] = parseInt(source.playerData.money['bank']) + parseInt(amount)
        updateMoney(source)
    } else {
        // TODO
        alt.log('Não possui a quantia na carteira')
    }
    return
}
const moneywithdraw = (source, amount) => {
    if(source.playerData.money['bank'] >= amount){
        source.playerData.money['bank'] = parseInt(source.playerData.money['bank']) - parseInt(amount)
        source.playerData.money['cash'] = parseInt(source.playerData.money['cash']) + parseInt(amount)
        updateMoney(source)
    } else {
        // TODO
        alt.log('Não possui a quantia no banco')
    }
    return
}

const getPayment = (source, amount) => {
    if (!source || !source.playerData) return
    if (!amount || amount == NaN) return
    if (amount < 0) {
        return
    }
    if(source.playerData.money['cash'] > parseInt(amount)){
        source.playerData.money['cash'] = parseInt(source.playerData.money['cash']) - parseInt(amount)
        updateMoney(source)
        alt.log('aqui')
        return
    } else {
        // TODO        
        return alt.emitClient(source,'notify', 'error', 'erro', 'não possui quantia na carteira')
    }
}

const addMoney = (source, moneytype, amount) => {
    if (amount < 0) {
        return
    }
    if(source.playerData.money[moneytype]){
        source.playerData.money[moneytype] = parseInt(source.playerData.money[moneytype]) + parseInt(amount)
        updateMoney(source)
    }
    return
}

const getMoney = (source, moneytype) => {
    if (!source || !source.playerData) return
    if (!amount || amount == NaN) return
    if(moneytype) {
        return source.playerData.money[moneytype]
    } else {
        return source.playerData.money
    }
}

const hasFullMoney = (source, amount) => {
    if (!source || !source.playerData) return
    if (!amount || amount == NaN) return
    let all = parseInt(source.playerData.money['bank']) + parseInt(source.playerData.money['cash'])
    if (all >= amount) {
        return true
    } else {
       return alt.emitClient(source,'notify', 'error', 'erro', 'não possui quantia')
    }
}

const hasMoney = (source, moneytype, amount) => {
    if (!source || !source.playerData) return
    if (!amount || amount == NaN) return
    if(moneytype == 'bank' && parseInt(source.playerData.money['bank']) >= amount){
        return true
    }else if (moneytype == 'cash' && parseInt(source.playerData.money['cash']) >= amount) {
        return true
    } else {
        return alt.emitClient(source,'notify', 'error', 'erro', 'não possui quantia na carteira')
    }
}
const getFullPayment = (source, amount) => {
    if (!source || !source.playerData) return
    if (!amount || amount == NaN) return
    let calculatedAmount = amount - parseInt(source.playerData.money['bank'])
    if (amount < 0) {
        return
    }
    if (amount <= parseInt(source.playerData.money['bank'])) {
        setMoney(source, 'bank', parseInt(source.playerData.money['bank']) - amount);
        return true
    }
    if (amount <= parseInt(source.playerData.money['bank']) + parseInt(source.playerData.money['cash'])) {
        setMoney(source, 'cash', parseInt(source.playerData.money['cash']) - calculatedAmount)
        setMoney(source, 'bank', 0)
        return true
    }
    return
}

const transferMoney = async (source, ssn, amount) => {
    const result = await executeSync('SELECT * from characters WHERE ssn = ?', [ssn])
    const target = result[0]
    if (target) {
        if(hasMoney(source, 'bank', amount)) {
            target.money = JSON.parse(target.money)
            target.money['bank'] = parseInt(target.money['bank']) + parseInt(amount)
            db.update('UPDATE characters SET money = ? WHERE ssn = ?', [JSON.stringify(target.money), ssn], undefined, alt.resourceName)
            setMoney(source, 'bank', parseInt(source.playerData.money['bank']) - amount)
        }
    } else {
        return alt.emitClient(source,'notify', 'error', 'erro', 'SSN não encontrado.')
    }
}

const updateMoney = (source) => {
    const { money, ssn } = source.playerData
    db.update('UPDATE characters SET money = ? WHERE ssn = ?', [JSON.stringify(money), ssn], undefined, alt.resourceName)
    Core.Functions.emitPlayerData(source, 'money', money)
}

export default { setMoney, addMoney, getPayment, moneyDeposit, moneywithdraw, getMoney, hasFullMoney, getFullPayment,hasMoney, transferMoney }
