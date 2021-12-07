import Core from 'urp-core';
import chat from 'urp-chat';
import * as alt from 'alt-client';

let isOpen = false

const openBank = (data) => {
    Core.Browser.open('http://resources/urp-bank/client/html/ui.html', true, true)
    Core.Browser.on(`Bank:close`, () => {
        closeBank()
    })
    Core.Browser.on(`Bank:deposit`, (value) => {
        alt.emitServer('Bank:deposit', value)

    })

    Core.Browser.on(`Bank:withdraw`, (value) => {
        alt.emitServer('Bank:withdraw', value)
    })
    Core.Browser.on('load', () => {
        Core.Browser.emit('Bank:updateMoney', Core.Functions.getPlayerData('money'))
        Core.Browser.emit('Bank:charinfo', Core.Functions.getPlayerData('charinfo'))
        Core.Browser.emit('Bank:ssn', Core.Functions.getPlayerData('ssn'))
    })
    Core.Browser.on(`Bank:transfer`, (data) => {
        alt.emitServer('Bank:transfer', data)
    })

    alt.toggleGameControls(false)
    isOpen = true
}

const closeBank = () => {
    Core.Browser.close()
    alt.toggleGameControls(true)
    isOpen = false
}

alt.onServer('Bank:RefreshMoney', RefreshMoney)

function RefreshMoney() {
    Core.Browser.emit('Bank:updateMoney', Core.Functions.getPlayerData('money'))
    Core.Browser.emit('Bank:RefreshPage')
}



const hotKeys = [49, 50, 51, 52, 53]

alt.on('keydown', (key) => {
    if (key === 85) {

        openBank()
    }
    if (key === 27 && isOpen) {
        closeBank()
    }

})