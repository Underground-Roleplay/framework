import Core from 'urp-core';
import * as alt from 'alt-client';

let isOpen = false

const openbennys = (data) => {
  
    Core.Browser.open('http://resources/urp-bennys/client/html/ui.html', true, false)
    Core.Browser.on('Bennys:close', () => {
        closeSkinshop()
    })
    Core.Browser.on('load', () => {
        alt.emitServer('Bennys:load')
    })
    Core.Browser.on('Bennys:att', (index, id) => {
        alt.emitServer('Bennys:att', index, id)
    })
    Core.Browser.on('Bennys:instalar', () => {
        alt.emitServer('Bennys:instalar')
    })
    
    Core.Browser.on('Bennys:reload', () => {
        console.log('pedindo relod');
        alt.emitServer('Bennys:reload')
    })
    
    alt.toggleGameControls(false)
    isOpen = true
}

alt.onServer('Bennys:loadMod', RefreshMod)

function RefreshMod(i) {
    Core.Browser.emit('Bennys:loadMod',i)
}
const closebennys = () => {
    alt.emitServer('Bennys:reload')
    Core.Browser.close()
    alt.toggleGameControls(true)
   
    isOpen = false
}



alt.on('keydown', (key) => {

    if (key === 27 && isOpen) {

        closebennys()
    }
     if (key === 187 && !isOpen) {
         openbennys()
     }
})

