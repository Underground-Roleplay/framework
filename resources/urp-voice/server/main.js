import * as alt from 'alt-server';
import { config } from '../shared/config';
import chat from 'urp-chat';

const channels = []

const createVoiceChannel = (name, range, spatial = true) => {
    if(!name || channels[name]) throw new Error('You need to add a name to your voice channel, and he needs to be unique')
    try{
        const newChannel = new alt.VoiceChannel(spatial, range)
        channels[name] = newChannel
        console.log('A new voice channel has been created')
    }catch(e){
        if(e.message === "Failed to create base object") {
            alt.logWarning("The alt:V voice chat is not enabled and this resource will cease to work. To enable it, specify the \"voice\" entry in the server config.");
          } else {
            throw e;
          }
    }
}

const addSourceToChannel = (source, channelName) => {
    if(!channelName || !channels[channelName] || !source) throw new Error('You need to specify a valid channel/source')
    channels[channelName].addPlayer(source)
}

const removeSourceFromChannel = (source, channelName) => {
    if(!channelName || !channels[channelName] || !source) throw new Error('You need to specify a valid channel/source')
    channels[channelName].removePlayer(source)
}

const destroyVoiceChannel = (channelName) => {
    channels[channelName].destroy()
    delete channels[channelName]
}

const toggleVoiceChannel = (index, source) => {
    channels['short'].mutePlayer(source);
    channels['medium'].mutePlayer(source);
    channels['long'].mutePlayer(source);
  
    channels[config.rangeLabels[index]].unmutePlayer(source);

    chat.send(source, "{80eb34}Voice Distance changed to {34dfeb}" + config.rangeArray[index] + "{80eb34}m.");
}

alt.onClient("voice:rangeChanged", (source, args) => {
    let index = source.getMeta("voice:rangeIndex");
    index++;
  
    if (index >= config.rangeArray.length) index = 0;
  
    toggleVoiceChannel(index, source);
    source.setMeta("voice:rangeIndex", index);
  });

createVoiceChannel(config.rangeLabels[0], config.rangeArray[0])
createVoiceChannel(config.rangeLabels[1], config.rangeArray[1])
createVoiceChannel(config.rangeLabels[2], config.rangeArray[2])

export default {createVoiceChannel, addSourceToChannel, removeSourceFromChannel, destroyVoiceChannel, toggleVoiceChannel}