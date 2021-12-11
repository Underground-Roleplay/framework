alt.on("Bank:updateMoney", AttBalance)
alt.on("Bank:charinfo", AttCharinfo)
alt.on("Bank:ssn", AttSSN)
alt.on("Bank:RefreshPage", RefreshPage)

let data = {};
let page = '';


function AttBalance(i) {
    data.money = i
}

function AttCharinfo(i) {
    data.charinfo = i
    Acount()
}

function AttSSN(i) {
    data.ssn = i

}

function RefreshPage() {
    switch (page) {

        case 'transfer':
            Transferencia()
            break;

        case 'withdraw':

            Saque()
            break;

        case 'deposit':
            console.log();
            Deposito()

            break;

        case 'acount':

            Acount()
            break;

    }
}

function Transferencia() {

    $("#viwer").empty().append(`
        <div class="full content-center mb-1">
            <p>Balance</p>
        </div>
        <div class="full content-center balance mb-3">
            <h2>$ ${data.money.bank},00 </h2>
        </div>
        <p class="mb-1">Transfer</p>
        <input type="text" class="form-control mb-2" id="amount-ssn" placeholder="Enter SSN">
        <input type="number" class="form-control mb-2" id="amount-transfer" placeholder="Enter transfer value">
        <div class=" full content-center box-btn-deposito">
            <button type="button" class="btn btn-success" onclick="FinalizarTransferencia()">Transfer</button>
        </div>
    `)
    page = 'transfer'
}


function Saque() {
    $("#viwer").empty().append(`
        <div class="full content-center mb-1">
            <p>Wallet</p>
        </div>
        <div class="full content-center balance mb-3">
            <h4>$ ${data.money.cash},00 </h4>
        </div>
        <div class="full content-center mb-1">
            <p>Balance</p>
        </div>
        <div class="full content-center balance mb-3">
            <h4>$ ${data.money.bank},00 </h4>
        </div>
        <p class="mb-1">Withdraw </p>
        <input type="number" class="form-control" id="amount-withdraw" placeholder="Enter value for withdrawal">
        <div class=" full content-center box-btn-deposito">
            <button type="button" class="btn btn-success" onclick="FinalizarSaque()">Withdraw</button>
        </div>
    `)
    page = 'withdraw';
}

function Deposito() {
    $("#viwer").empty().append(`
        <div class="full content-center mb-1">
            <p>Wallet</p>
        </div>
        <div class="full content-center balance mb-3">
            <h4>$ ${data.money.cash},00 </h4>
        </div>
        <div class="full content-center mb-1">
        <p>Balance</p>
        </div>
        <div class="full content-center balance mb-3">
            <h4>$ ${data.money.bank},00 </h4>
        </div>
        <p class="mb-1">Deposit</p>
        <input type="number" class="form-control" id="amount-deposit" placeholder="Enter deposit amount">
        <div class=" full content-center box-btn-deposito">
            <button type="button" class="btn btn-success" onclick="FinalizarDeposito()">Deposit</button>
        </div>
        `)
    page = 'deposit';
}

function Acount() {
    $("#viwer").empty().append(`
        <div class="full content-center mb-1">
            <p>Hello</p>
        </div>
        <div class="full content-center balance mb-3">
            <h2>${data.charinfo.firstname} ${data.charinfo.lastname}</h2>
        </div>
        <div class="full content-center mb-1">
            <p>Balance</p>
        </div>
        <div class="full content-center balance mb-3">
            <h2>$ ${data.money.bank},00 </h2>
        </div>
    `)
    document.getElementById('acount-name').innerHTML = data.charinfo.firstname + ' ' + data.charinfo.lastname;

    page = 'acount';
}

function FinalizarDeposito(params) {
    var value = $("#amount-deposit").val();

    alt.emit('Bank:deposit', value)


}

function FinalizarSaque(params) {
    var value = $("#amount-withdraw").val();

    alt.emit('Bank:withdraw', value)

}

function FinalizarTransferencia(params) {
    var data = {}
    data.ssn = $("#amount-ssn").val();
    data.value = $("#amount-transfer").val();
    alt.emit('Bank:transfer', JSON.stringify(data))
}

function Close(params) {
    alt.emit('Bank:close')
}