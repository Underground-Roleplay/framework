//alt.on("Station:UpdateValues", SetValues)


let oilPrice = 0;
let gasolinePrice = 0;
let porcentagem = 0.35;
let wallet = 1000;
let tank = 0;
let tankFull = 30;
let priceSelect = 0;

function SetValues(wl,dataTank,dataPrices,porcen) {
    wallet = wl;
    oilPrice = dataPrices.oil;
    gasolinePrice = dataPrices.gasoil;
    porcentagem = porcen;
    tank = dataTank.tank;
    tankFull = dataTank.full;
}

setTimeout(() => {
    document.getElementById('wallet').innerHTML = `$ ${wallet}`;
    
}, 100);


function PriceSelect(type,price) {
    priceSelect  = price
    switch (type) {
        case 'oil':
            $(".card-combustivel").css("background-color", "transparent");
            $(".card-combustivel-oil").css("background-color", "rgba(0, 0, 0, 0.432)");
            break;
        case 'gasoil':
            $(".card-combustivel").css("background-color", "rgba(255, 167, 4, 0.302)");
            $(".card-combustivel-oil").css("background-color", "transparent");
            break;
    
        default:
            break;
    }
    OnchangeLiters()
}

function OnchangeLiters() {
    let value = $( "#liters" ).val();
    if (priceSelect > 0) {
        if ( value * priceSelect > wallet ) {
            console.log('aki');
            $('#liters').val( parseFloat(wallet / priceSelect).toFixed(2));
           
            $('#price').val(wallet);

        }else{
            $('#price').val(parseFloat(value * priceSelect).toFixed(2));
        }
        attPrices()
    }else{
        console.log('seleciona um tipo de combustivel');
    }
    
}
function OnchangePrice() {
    let value = $( "#price" ).val();
    if (priceSelect > 0) {  
        if (wallet >0) {
            if (value >= wallet) {
                $('#price').val(wallet);
                $('#liters').val( parseFloat(wallet / priceSelect).toFixed(2));
            }else{
                $('#liters').val( parseFloat(value / priceSelect).toFixed(2));
            }
        }
        attPrices()      
    }else{
        console.log('seleciona um tipo de combustivel');
    }
}


function completar() {
    if (priceSelect > 0) {  
        if ( (tankFull - tank) * priceSelect >wallet  ) {
            $('#liters').val(wallet / priceSelect);
            $('#price').val(wallet);
            wallet / priceSelect
        }else{
            $('#liters').val(tankFull - tank);
            $('#price').val((tankFull - tank)*priceSelect);
            
        }
        attPrices()
    }else{
        console.log('seleciona um tipo de combustivel');
    }
}

function attPrices() {
    let value = parseFloat($('#liters').val()).toFixed(2);
    let total = parseFloat(value * priceSelect).toFixed(2)
    if (value > 0 ) {
        console.log(parseFloat(value * priceSelect).toFixed(2));
        document.getElementById('ht').innerHTML = `$ ${total}`;
        document.getElementById('totalliters').innerHTML = `${value} L`;
        document.getElementById('taxe').innerHTML = `$ ${parseFloat(total* porcentagem).toFixed(2)}`;
        document.getElementById('total').innerHTML = `$  ${total}`;
    }
    document.getElementById('taxeP').innerHTML = `% ${parseFloat(porcentagem * 100).toFixed(0)}`;
    document.getElementById('priceSelect').innerHTML = `$ ${parseFloat(priceSelect).toFixed(2)}`;
}

function abastecer() {
    let liters = parseFloat($('#liters').val()).toFixed(2);
    let price = parseFloat($('#price').val()).toFixed(2);
    //alt.emit('Station:abastecer',liters,price)
}

function Close() {
    alert('fechando')
    //alt.emit('Station:close')
}