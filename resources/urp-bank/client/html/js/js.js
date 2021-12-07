alt.on("Bank:updateMoney", AttBalance)
alt.on("Bank:charinfo", AttCharinfo)
alt.on("Bank:ssn", AttSSN)
alt.on("Bank:RefreshPage", RefreshPage)

let data = {};
let page = '';
Acount()

function AttBalance(i) {
    console.log('>--AttBAlance');
    data.money = i
}

function AttCharinfo(i) {
    console.log('>--AttCharinfo');
    data.charinfo = i
}

function AttSSN(i) {
    console.log('>--AttSSN');
    data.ssn = i

}

function RefreshPage() {
    console.log(page);
    console.log(data.money.bank);
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
        <input type="number" class="form-control mb-2" id="amount-ssn" placeholder="Enter SSN">
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
            <p>Balance</p>
        </div>
        <div class="full content-center balance mb-3">
            <h2>$ ${data.money.bank},00 </h2>
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
            <p>Balance</p>
        </div>
        <div class="full content-center balance mb-3">
            <h2>$ ${data.money.bank},00 </h2>
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
            <p>Olá</p>
        </div>
        <div class="full content-center balance mb-3">
            <h2>DUDUGUDU</h2>
        </div>
    `)
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

}

function Close(params) {
    alt.emit('Bank:close')
}