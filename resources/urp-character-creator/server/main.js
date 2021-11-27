import Core from 'urp-core';
import * as alt from 'alt-server';

alt.onClient('Creator:charSetGender', (source, data) => {
    source.model = data === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01';
    source.tempData.charInfo.gender = data;
});

alt.onClient('Creator:setHeadBlendData', (source, data) => {
    //console.log('Creator:setHeadBlendData', data)
    const parsed = JSON.parse(data)
    source.setHeadBlendData(
        parsed[0],
        parsed[1], 
        parsed[2], 
        parsed[3],
        parsed[4],
        parsed[5],
        parsed[6],
        parsed[7],
        parsed[8]
    )
});

alt.onClient('Creator:setFaceFeature', (source, data) => {
    const parsed = JSON.parse(data)
    for(let i = 0; i < parsed.length; i++){
        source.setFaceFeature(i, parsed[i])
    }
});

alt.onClient('Creator:setEyeColor', (source, data) => {
    //  Strange bug over here
    //console.log('Creator:setEyeColor', data)
    source.setEyeColor(data)
});

alt.onClient('Creator:setHeadOverlay', (source, data) => {
    //console.log('Creator:setHeadOverlay', data)
    const parsed = JSON.parse(data)
    for(let i = 0; i < parsed.length; i++){
        source.setHeadOverlay(i, parsed[i], 255)
    }
});

alt.onClient('Creator:setHeadOverlayColor', (source, data) => {
    //console.log('Creator:setHeadOverlayColor',data)
    const parsed = JSON.parse(data)
    for(let i = 0; i < parsed.length; i++){
        let colorType;
        if (i === 1 || i === 2) {
            colorType = 1;
            source.setHeadOverlayColor(i, colorType, parsed[i].color, parsed[i].color2);
        } else {
            colorType = 2;
            source.setHeadOverlayColor(i, colorType, parsed[i].color, parsed[i].color2);
        }
    }
});

alt.onClient('Creator:setHair', (source, data) => {
    //console.log('Creator:setHair', data)
    source.setClothes(2, data, 0)
});

alt.onClient('Creator:setHairColor', (source, data) => {
    //console.log('Creator:setHairColor', data)
    source.setHairColor(data)
});

alt.onClient('Creator:setHairHighlightColor', (source, data) => {
    //console.log('Creator:setHairHighlightColor', data)
    source.setHairHighlightColor(data)
});

alt.onClient('Creator:finish', (source) => {
    Core.Character.selectCharacter(source, source.tempData, true)
    delete source.tempData;
})

alt.on('Creator:Start', (source, playerData) => {
    Core.Functions.setPosition(source, 402.882, -996.537, -100.000, 'mp_m_freemode_01')
    source.setHeadBlendData(
        0,
        0, 
        0, 
        0,
        0,
        0,
        0,
        0,
        0
    )
    source.tempData = playerData;
    alt.emitClient(source, 'Creator:Start')
})