import * as native from 'natives'
import * as alt from 'alt-client'


const blankURL = 'http://resources/urp-core/client/html/blank.html'

let instance;
let currentEvents = []
let cursorCount = 0
let isClosing = false

//  Start a new browser instance
const createInstance = () => {
    if(instance) return;
    instance = new alt.WebView(blankURL)
}

//  Show cursor 
const showCursor = (state) => {
    if(state){
        cursorCount += 1
        try {
            alt.showCursor(true);
        } catch (err) {}
    }else{
        for (let i = 0; i < cursorCount; i++) {
            try {
                alt.showCursor(false);
            } catch (err) {}
    }
    cursorCount = 0;
    }
}

//  Allows an other resource to open a new url 
const open = async (url, cursor = true, blurBackground, isOverlay = false) => {
    if(!instance) {
        createInstance()
    }

    // instance.isVisible = false
    if(isClosing){
        await new Promise((resolve) => {
            const tmpInterval = alt.setInterval(() => {
                if (isClosing) {
                    return;
                }

                alt.clearInterval(tmpInterval);
                resolve();
            }, 5);
        });
    }

    if (currentEvents.length > 0){
        close(0)
    }

    if (blurBackground) {
        native.triggerScreenblurFadeIn(100);
        native.displayRadar(false);
    }

    alt.Player.local.webViewOpen = true
    instance.url = url;
    showCursor(cursor);
    instance.focus();

    instance.on('load', () => {
        instance.isVisible = true;
    });

    alt.log(`PICKED URL: ${url}`);
}

//  Register a new event
const on = (eventName, listener) => {
    if(!instance) return;
    const index = currentEvents.findIndex((e) => e.eventName === eventName);
    if (index >= 0) {
        return;
    }
    currentEvents.push({ eventName, callback: listener })
    instance.on(eventName, listener)
}

//  Emit an event to browser
const emit = (eventName, ...args) => {
    if(!instance) return;
    instance.emit(eventName, ...args)
}

//  Return webview to blank and turn off all events
const close = (delay = 0) => {
    if(!instance) return;
    instance.isVisible = false;
    alt.log('closing')
    isClosing = true;
    instance.url = blankURL
    showCursor(false)
    instance.unfocus()

    alt.Player.local.webViewOpen = false
    native.triggerScreenblurFadeOut(100)
    native.displayRadar(true);

    for (let i = 0; i < currentEvents.length; i++) {
        const eventData = currentEvents[i];
        instance.off(eventData.eventName, eventData.callback);
    }

    currentEvents = []
    alt.setTimeout(() => {
        isClosing = false;
    }, delay);
}

//  Destroy current browser instance
const destroyInstance = () => {
    instance.destroy()
}

const getCurrentViewState = () => {
    return alt.Player.local.webViewOpen
}

export default { createInstance, showCursor, open , on, emit, close, destroyInstance, getCurrentViewState}