import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false

alt.onServer('Core:Client:UpdateIdentity', () => {
    openIdentity()
})

const openIdentity = () => {
    Core.Browser.open('http://resources/urp-identity/client/html/ui.html', true, true)
    Core.Browser.on(`Identity:close`, () => {
        closeIdentity()
    })
    Core.Browser.on('Identity:Create', (data) => {
        alt.emitServer('Identity:Create', data)
    })
    Core.Browser.on('Identity:notify', (msg) => {
        alt.emit('notify', 'error', 'erro', msg)
    })
    alt.toggleGameControls(false)
    isOpen = true
}

const closeIdentity = () => {
    Core.Browser.close()
    alt.toggleGameControls(true)
    isOpen = false
}



// alt.on('keydown', (key) => {
//     if (key === 79) {
//         openIdentity()
//     }
//     if (key === 27 && isOpen) {
//         closeIdentity()
//     }

// })