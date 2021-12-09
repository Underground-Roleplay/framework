let ConceEstoq = [];


let LastVeh = null

alt.on("Dealership:UpdateVeh", RefreshVeh)

function RefreshVeh(i) {
    ConceEstoq = [];
    ConceEstoq = JSON.parse(i)
    OpenConceMap('sedan')
}


function OpenConceMap(data) {
    $("#viwer-main").empty().append(`
        <div class='between c-c'><h3 class="mb-3">${capitalize(data)}</h3><i class="fal fa-times" onclick="Close()"></i></div>
        <div class="viwe-car-overflow" id="viwer-car-car">
        </div>
        <div class="j-c full">
            <button type="button" class="btn btn-secondary" onclick="buy()">Buy</button>      
        </div>
    `)
    ConceEstoq.map(veh => {
        if (veh.category == data) {
            $("#viwer-car-car").append(`
            <div class="card-car mb-2 ms-2" >
                <div class="card-car-internal" onclick="setData('${veh.model}')">
                    <div class="card-car-img" style="background: url('./img/${veh.model}.png')" >
                    </div>
                    <div class="card-car-info">
                        <label class="full between mb-4">
                            <p>${capitalize(veh.model)}</p> 
                            <div class="c-c"><p>Stock</p><p class="ms-2">${veh.stock}</p></div>
                        </label>
                        <label class="full between">
                            <div class="c-c"><i class="fal fa-sack-dollar"></i><p class="ms-2">${FormatNumber(veh.price)},00</p></div>

                        </label>
                    </div>
                </div>
            </div>
        `)
        }
    })

}



function setData(data) {
    ConceEstoq.map(veh => {
        if (veh.model == data) {
            LastVeh = veh
            console.log(LastVeh);
        }
    })
}

function buy() {

    if (LastVeh != null) {
        var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
            keyboard: false
        })
        myModal.show()
        document.getElementById('modal-body').innerHTML = `you are sure you want to buy a ${capitalize(LastVeh.model)} for $ ${LastVeh.price}`;
    }

}

function FinishBuy() {
    alt.emit('Dealership:FinishBuy', LastVeh)
}


function Close(params) {
    alt.emit('Dealership:close')
}

function FormatNumber(n) {
    var n = n.toString();
    var r = '';
    var x = 0;

    for (var i = n.length; i > 0; i--) {
        r += n.substr(i - 1, 1) + (x == 2 && i != 1 ? '.' : '');
        x = x == 2 ? 0 : x + 1;
    }

    return r.split('').reverse().join('');
}

function capitalize(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.substr(1);
}