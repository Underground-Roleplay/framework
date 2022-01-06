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
    if (typeof i === 'string') {
        componnet = i
        $("#BennysMain-color").empty().append(`<input type="color" id="color-${i}" name="body" oninput="coloratt('${i}')" value="#f6b73c">`)
        return alt.emit('Bennys:reload', componnet,id)
    }
    componnet = i;
    limit = value;
    id = 0
    document.getElementById('counter').innerHTML = 0;
    alt.emit('Bennys:reload', componnet,id)
}

function hexToRGB(ev) {
    const color = ev
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)
    return {r,g,b};
}

function coloratt(type) {
    
    let Primary = $( `#color-${type}` ).val();
    alt.emit('Bennys:color',type,hexToRGB(Primary))
    console.log(type,JSON.stringify(hexToRGB(Primary)))
}


function creatBennys(mods) {
    $("#BennysMain").empty().append(`<div id="boxBennys"></div>`)
    mods.map(obj => {
     if(obj.value > 0  )  {
         if (typeof obj.id == 'string') {
            $("#boxBennys").append(`<div onclick="setIdandLimit('${obj.id}',${obj.value})" class="Btn-class">${obj.name}</div>`)
         }else{
            $("#boxBennys").append(`<div onclick="setIdandLimit(${obj.id},${obj.value})" class="Btn-class">${obj.name}</div>`)
         }
       
     }
    })
}
