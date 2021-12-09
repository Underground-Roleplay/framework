let vehList = [];
let CarRental = [];

let LastVeh = null

alt.on("Garage:UpdateVeh", RefreshVeh)

function RefreshVeh(i) {
    vehList = [];
    vehList = JSON.parse(i)
    MyGarageMap()

}


function MyGarageMap() {
    $("#viwer-main").empty().append(`
        <div class='between c-c'><h3 class="mb-3">My Garage</h3><i class="fal fa-times" onclick="Close()"></i></div>
        <div class="viwe-car-overflow" id="viwer-car-car">
        </div>
        <div class="between">
            <button type="button" class="btn btn-primary" onclick="WithdrawCar()">Retirar</button>
            <button type="button" class="btn btn-secondary" onclick="SaveCar()">Guardar</button>
        </div>
    `)
    vehList.map(veh => {
        $("#viwer-car-car").append(`
            <div class="card-car mb-2" onclick="setData('${veh.model}')">
                <div class="card-car-img" style="background: url('./img/${veh.model}.png')">
                </div>
                <div class="card-car-info">
                    <label class="full between mb-4">
                        <p>${veh.model}</p> 
                        <div class="c-c"><i class="fal fa-gas-pump"></i><p class="ms-2">%</p></div>
                    </label>
                    <label class="full between">
                        <div class="flex"><p>Plate:</p><p class="ms-2">${veh.plate}</p></div>
                        <div class="c-c"><i class="fal fa-car-crash"></i><p class="ms-2">85%</p></div>
                    </label>
                </div>
            </div>
        `)
    })

}


function CarRentalMap() {

    alt.emit('Garage:notify', 'error', 'erro', ' doesn`t exist yet')
        /*
         $("#viwer-main").empty().append(`
             <h3 class="mb-3">Car Rental</h3>
             <div class="viwe-car-overflow" id="viwer-car-car">
             </div>
             <div class="between">
                 <button type="button" class="btn btn-primary" onclick="WithdrawCar()">Retirar</button>
                 <button type="button" class="btn btn-secondary" onclick="SaveCar()">Guardar</button>
             </div>
         `)
         CarRental.map(veh => {
             $("#viwer-car-car").append(`
                 <div class="card-car mb-2">
                     <div class="card-car-img" style="background: url('./img/${veh.model}.png')">
                     </div>
                     <div class="card-car-info">
                         <label class="full between mb-4">
                             <p>${veh.model}</p> 
                             <div class="c-c"><i class="fal fa-gas-pump"></i><p class="ms-2">${veh.metadata.fuel}%</p></div>
                         </label>
                         <label class="full between">
                             <div class="flex"><p>Plate:</p><p class="ms-2">${veh.plate}</p></div>
                             <div class="c-c"><i class="fal fa-car-crash"></i><p class="ms-2">85%</p></div>
                         </label>
                     </div>
                 </div>
             `)
         })*/

}


function setData(data) {
    vehList.map(veh => {
        if (veh.model == data) {
            LastVeh = veh
        }
    })
}

function SaveCar() {
    alt.emit('Garage:Save')
}

function WithdrawCar() {
    if (LastVeh) {
        alt.emit('Garage:Withdraw', LastVeh)
    }
}

function Close(params) {
    alt.emit('Garage:close')
}