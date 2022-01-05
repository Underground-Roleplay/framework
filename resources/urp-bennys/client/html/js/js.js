if('alt' in window){
    alt.on('Bennys:loadMod', creatBennys)
}

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

function hexToRGB(hex) {
    let h = "0123456789ABCDEF";
    let r = h.indexOf(hex[1]) * 16 + h.indexOf(hex[2]);
    let g = h.indexOf(hex[3]) * 16 + h.indexOf(hex[4]);
    let b = h.indexOf(hex[5]) * 16 + h.indexOf(hex[6]);
    return `rgba(${r}, ${g}, ${b})`;
}

function creatBennys(mods) {
    $("#BennysMain").empty().append(`<div id="boxBennys">
    <input type="color" id="body" name="body" value="#f6b73c">
    <label for="body">Primary Color</label>
    <input type="color" id="body" name="body" value="#f6b73c">
    <label for="body">Secundary Color</label>
    </div>`)
    mods.map(obj => {
        console.log(obj)
     if(obj.value > 0) {
        $("#boxBennys").append(`<div onclick="setIdandLimit(${obj.id},${obj.value})" class="Btn-class">${obj.name}</div>`)
     }
    })
}
