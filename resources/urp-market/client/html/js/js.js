alt.on("Market:updateData", AttBalance)

let quantidade = 1;
let index = '';
let value = 0;
let product = []


function AttBalance(data) {
   product = data
   index = '';
   value = 0;
   filter('drink')
}


function CloseComfirmed() {
    $("#comfirmed").css("display", "none");
    $('#comfirmed').empty()
    index = ''
    quantidade = 1
}


function comfirmed(i) {
       $("#comfirmed").css("display", "flex");
       product.map((obj)=>{
           if (obj.index === i) {
                value = obj.value
                
                $('#comfirmed').append(`
                    <div class="comfirmed-externo">
                        <i class="fal fa-times-circle" onclick="CloseComfirmed()" ></i>
                        <div class="comfirmed-img background"  style="background-image: url('./img/item/${obj.index}.png');"></div>
                        <p>${obj.name}</p>
                        <div class="btn-select">
                            <div class="btn-count" onclick="count('down')">
                                <i class="fal fa-chevron-left" ></i>
                            </div>
                            <div class="btn-count" onclick="count('up')">
                                <i class="fal fa-chevron-right"></i>
                            </div>
                        </div>
                        <input class="input input-item" value="1" id="amount" type="number" onkeyup="count('input')">
                        <h4>Total</h4>
                        <h5 id="total">$ ${obj.value}</h5>
                        <button class="btn btn-primary" onclick="purchaseComfirmed('${obj.index}')">Comfirmed</button>
                    </div>
                `)

        }
    })

}

function count(type) {
    if (value > 1 && quantidade >=1) {
        if (type ==='input') {
            input = $('#amount').val();
            if (input < 1) {
                quantidade = 1
            }else{
                quantidade = input
            }
        }
        if (type ==='up') {
            quantidade ++
          
            console.log(quantidade);
        }
        if (type ==='down' && quantidade > 1) {
            quantidade --
            console.log(quantidade);
        }
        $('#amount').val(quantidade);
        document.getElementById('total').innerHTML = `$ ${quantidade * value}`;  
    }
}


function purchaseComfirmed(i) {
    alt.emit('Market:purchase',quantidade, i,value)
    $("#comfirmed").css("display", "none");
    $('#comfirmed').empty()
    setTimeout(() => { 
        index = ''
        quantidade = 1
    }, 50);

}

function filter(i) {
    $('#boxProdutos').empty().append(` <div class="storange" id='storange' ></div`)
    product.map((obj)=>{
        if (obj.type === i) {
            $('#storange').append(`
                <div class="item">
                    <div class="item-interno">
                        <div class="item-img background"  style="background-image: url('./img/item/${obj.index}.png');"></div>
                        <div class="text-duplo">
                            <label>${obj.name}</label>
                            <p>x1</p>
                        </div>
                        <div class="text-duplo">
                            <p>Valor</p>
                            <p>$ ${obj.value}</p>
                        </div>
                        <button class="btn btn-success" onclick="comfirmed('${obj.index}')">purchase</button>
                    </div>
                </div>
            `)
        }
    })
}


function Close() {
    alt.emit('Market:close')
}

