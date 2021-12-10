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

function LeftClick(i) {
    if (color > 1) {
        color = color - 1;
        document.getElementById('txt-' + i).innerHTML = `${i} , ${component} , ${color}`;
        alt.emit('Skinshop:att', i, component, color)
        compra = { id: i, variable: { drawable: component, texture: color } }
        console.log(JSON.stringify(compra))
    }
}

function RightClick(i) {
    color = color + 1;
    document.getElementById('txt-' + i).innerHTML = `${i} , ${component} , ${color}`;
    alt.emit('Skinshop:att', i, component, color)
    compra['id'] = { variable: { drawable: component, texture: color } }
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

function AttColor(i) {
    $('#color-box').empty().append(`
        <i class="fal fa-angle-double-left icon-modelo-color" onclick="LeftClick('${i}')"></i>
        <i class="fal fa-palette icon-modelo-color"></i>
        <i class="fal fa-angle-double-right icon-modelo-color" onclick="RightClick('${i}')"></i>
    `)
}