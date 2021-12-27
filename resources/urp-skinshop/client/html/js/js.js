let color = 1;
let component = 0;

let model = [
    { id: '0', maxRang: 30 },
    { id: '3', maxRang: 50 },
    { id: '11', maxRang: 10 },
    { id: '4', maxRang: 30 },
    { id: '5', maxRang: 10 },
    { id: '6', maxRang: 45 },
    { id: '8', maxRang: 30 },
    { id: '9', maxRang: 22 },
    { id: '10', maxRang: 25 }
]

let compra = {}


attCompinent()

function attCompinent(params) {
    model.map(i => { $('#' + i.id).attr("max", i.maxRang).attr("min", 1).attr("value", 1); })
}


function InputRange(i) {
    component = $('#' + i).val();

    document.getElementById('txt-' + i).innerHTML = `${i} , ${component} , ${color}`;
    AttColor(i)
    alt.emit('Skinshop:att', i, component, color)
    compra[i] = { drawable: component, texture: color }

    console.log(JSON.stringify(compra))

}
function InputColor(i) {
    color = $('#color-' + i).val();

    document.getElementById('txt-' + i).innerHTML = `${i} , ${component} , ${color}`;
    AttColor(i)
    alt.emit('Skinshop:att', i, component, color)
    compra[i] = { drawable: component, texture: color }

    console.log(JSON.stringify(compra))

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

}
Component('mask')
function Component(type) {
    let label = ''
    let id = 0
    if (type == 'mask') {
      id = 1
      label = 'Mask'
    }else  if (type == 'tshirt') {
        id = 8
        label = 'T-shirt'
    }else  if (type == 'jacket') {
        id = 11
        label = 'Jacket'
    }else  if (type == 'gloves') {
        id = 3
        label = 'Gloves'
    }else  if (type == 'shorts') {
        id = 4
        label = 'Shorts'
    }else  if (type == 'shoes') {
        id = 6
        label = 'Shoes'
    }else if (type == 'bag') {
        id = 5
        label = 'Bag'
    }else  if (type == 'vest') {
        id = 9
        label = 'Vest'
    }

    $('#component-cloth').empty().append(`
        <h3 class='txt-title-component'>${label}</h3>
        <div class="grup-input">
            <p id="txt-${id}">1 , 4</p>
            <label for="customRange3" class="form-label">Modelo</label>
            <input type="range" class="form-range" min="0" max="100" step="1" id="${id}" oninput="InputRange('${id}')">
            <label for="customRange3" class="form-label">Color</label>
            <input type="range" class="form-range" min="0" max="20" step="1" id="color-${id}" oninput="InputColor('${id}')">
        </div>
    `)
}

function AttColor(i) {
    $('#color-box').empty().append(`
        <i class="fal fa-angle-double-left icon-modelo-color" onclick="LeftClick('${i}')"></i>
        <i class="fal fa-palette icon-modelo-color"></i>
        <i class="fal fa-angle-double-right icon-modelo-color" onclick="RightClick('${i}')"></i>
    `)
}