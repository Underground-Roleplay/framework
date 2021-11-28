import * as alt from 'alt-server'
import nodefetch from 'node-fetch';
import { Webhooks, Colors } from './config'

alt.on('Core:CreateLog', async (name, title, color, message, tagEveryone) => {
    const webHook = Webhooks[name] || Webhooks['default'] 
    const embedData = {
        title: title,
        color: Colors[color] || Colors['default'],
        footer: {
            text: new Date().toLocaleString()
        },
        description: message,
        author: {
            name: 'uRP Logs',
            icon_url: 'https://avatars.githubusercontent.com/u/77180295'
        }
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'uRP Webhooks',
            embeds: [
                embedData
            ]
        })
    }
    try{
    nodefetch(
        webHook,
        options
    )
    }catch(e){ console.log(e) }
})