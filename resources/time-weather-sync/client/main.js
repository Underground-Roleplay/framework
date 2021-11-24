import * as alt from 'alt-client'
import * as native from 'natives'

alt.onServer('time:SetTime', (hour, minute) => {
    native.pauseClock(true)
    alt.log(`Time: Hour: ${hour} || Minute: ${minute}`)
})
