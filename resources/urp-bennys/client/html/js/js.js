alt.on('Bennys:loadMod', creatBennys)

let componnet;
let id = 0;
let limit = 20;



function counter(type) {
    if(componnet !== null && componnet !== undefined){
        if (type === 'up' && id < limit) {
            id = id +1
        }
        if (type === 'down' && id > 0){
            id = id -1
        } 
        document.getElementById('counter').innerHTML = id;
        attCar()
    }
  
}

function setComponent(comp) {
   
    componnet = comp
    attCar()
    
}

function attCar() {
    alt.emit('Bennys:att', componnet,id)

}


function Finish() {
    if(componnet !== null && componnet !== undefined){
        alt.emit('Bennys:instalar', componnet,id)
    }
}
function setIdandLimit(i,value) {
    alt.emit('Bennys:reload')
    componnet = i;
    limit = value;
    id = 0
    document.getElementById('counter').innerHTML = 0;

}

function creatBennys(data) {
    let mods = data;
    console.log(mods);
    $("#BennysMain").empty().append(`<div id="boxBennys"></div>`)
    mods.map(obj => $("#boxBennys").append(`<div onclick="setIdandLimit(${obj.id},${obj.value})" class="Btn-class">${obj.name}</div>`) )
}
