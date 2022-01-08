let color = 0;
let component = 0;
let componenteLimit = 0;
let colorLimit = 0;
let componentType ='';
let compra = {}
let objetoprincipal = {};
let objeto ={};
alt.on("Skinshop:updateSex", updateObjeto)

function updateObjeto(data) {
    if (data == 0) {
        objetoprincipal = male
    }else{
        objetoprincipal = female
    }
}

function attComponent(id) {
    componenteLimit =  Object.keys(objetoprincipal[`${componentType}`]).length 
    objeto = objetoprincipal[`${componentType}`]
    setTimeout(() => {
        attHtml(id,id,componenteLimit)
    }, 10);
}

function attTextura(id,component) {
    colorLimit = Object.keys(objeto[`${component}`]).length
    setTimeout(() => {
        attHtml(id,`color-${id}`,colorLimit)
    }, 10)
}

function InputRange(i) {
    component = $('#' + i).val();
    attTextura(i,component)    
    skinshopAtt(i, component, color)
}

function countComponent(i,type) {
    if (componenteLimit > 0) {
        if (type === 'down') {
            if (component > 0) {
                component --
            }else{
                component = componenteLimit
            }
        }else if (type === 'up') {
            if (component < componenteLimit) {
                component ++
            }else{
                component = 0
            }
        }
        color = 0;
        attTextura(i,component)
        $('#' + i).val(component);
        skinshopAtt(i, component, color)
    }
}



function InputColor(i) {
    color = $('#color-' + i).val();
    document.getElementById('txt-' + i).innerHTML = `${i} , ${component} , ${color}`;
    skinshopAtt(i, component, color)
}


function countColor(i,type) {
    if (colorLimit > 0) {
    if (type === 'down') {
        if (color > 0) {
            color --
        }else{
            color = colorLimit
        }
    }else if (type === 'up') {
        if (color < colorLimit) {
            color ++
        }else{
            color = 0
        }
    }
    $('#color-' + i).val(color);
    document.getElementById('txt-' + i).innerHTML = `${i} , ${component} , ${color}`;
    skinshopAtt(i, component, color)
    
    }
}

function attHtml(i,id,value) {
    $('#'+id).attr("max",value).attr("min", 0)
    $('#'+id).val(0);
    document.getElementById('txt-' + i).innerHTML = `${i} , ${component} , ${color}`;
   
}

function skinshopAtt(i, component, color) {
    if (componentType === 'bracelets' || componentType === 'watches'||componentType === 'glasses'||componentType === 'ears'||componentType === 'hats') {
        compra[i] = { drawable: component, texture: color,type:'prop'}
        return alt.emit('Skinshop:att', i, component, color,'prop')
    }
    alt.emit('Skinshop:att', i, component, color,'normal')  
    compra[i] = { drawable: component, texture: color,type:'normal'}
}


function InputRotate() {
    component = $('#rotate').val();
    alt.emit('Skinshop:rot', component)
}

function camPosition(pos) {
    alt.emit('Skinshop:CamPos', pos)
}

function Finish() {
    alt.emit('Skinshop:FinishBuy', compra)
    componentType = ''

}
Component('mask')
function Component(type) {
    
    let label = ''
    let id = 0
    component = 0;
    componenteLimit = 0;
    switch (type) {
        case 'mask':
            id = 1
            label = 'Mask'
            componentType = 'mask'
            attComponent(id,'mask')
            break;
        case 'tshirt':
            id = 8
            label = 'T-shirt'
            componentType = 'undershirts'
            attComponent(id,'undershirts')
            break;
        case 'jacket':
            id = 11
            label = 'Jacket'
            componentType = 'tops'
            attComponent(id,'tops')
            break;
        case 'gloves':
            id = 3
            label = 'Gloves'
            componentType = 'torso'
            attComponent(id,'torsos')
            break;
        case 'shorts':
            id = 4
            label = 'Shorts'
            componentType = 'legs'
            attComponent(id,'legs')
            break;
        case 'shoes':
            id = 6
            label = 'Shoes'
            componentType = 'shoes'
            attComponent(id,'shoes')
            break;
        case 'bag':
            id = 5
            label = 'Bag'
            componentType = 'bag'
            attComponent(id,'bag')
            break;
        case 'vest':
            id = 9
            label = 'Vest'
            componentType = 'vest'
            attComponent(id,'vest')
            break;
        case 'accessories':
            id = 7
            label = 'Accessories'
            componentType = 'accessories'
            attComponent(id,'accessories')
            break;
        case 'hats':
            id = 0
            label = 'Hats'
            componentType = 'hats'
            attComponent(id,'hats')
            break;
        case 'ears':
            id = 2
            label = 'Ears'
            componentType = 'ears'
            attComponent(id,'ears')
            break;
        case 'glasses':
            id = 1
            label = 'Glasses'
            componentType = 'glasses'
            attComponent(id,'glasses')
            break;
        case 'watches':
            id = 6
            label = 'Watches'
            componentType = 'watches'
            attComponent(id,'watches')
            break;
        case 'bracelets':
            id = 7
            label = 'Bracelets'
            componentType = 'bracelets'
            attComponent(id,'bracelets')
            break;

        default:
            break;
    }
   

    $('#component-cloth').empty().append(`
            <h3 class='txt-title-component'>${label}</h3>
            <div class="grup-input">
                <p id="txt-${id}">1 , 4</p>
                <label for="customRange3" class="form-label">Modelo</label>
                <input type="range" class="form-range" min='0' max='100'  value='0'  step="1" id="${id}" oninput="InputRange('${id}')">
                <div class="chevron">
                    <i class="fal fa-chevron-left"  onclick="countComponent('${id}','down')"></i>
                    <i class="fal fa-chevron-right" onclick="countComponent('${id}','up')"></i>
                </div>
                <label for="customRange3" class="form-label">Color</label>
                <input type="range" class="form-range"  min='0' max='100' value='0'  step="1" id="color-${id}" oninput="InputColor('${id}')">
                <div class="chevron">
                    <i class="fal fa-chevron-left" onclick="countColor('${id}','down')"></i>
                    <i class="fal fa-chevron-right" onclick="countColor('${id}','up')"></i>
                </div>
            </div>
    `)
}
