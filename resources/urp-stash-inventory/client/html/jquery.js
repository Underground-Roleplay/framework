let disabled = false;
let disabledFunction = null;
let type = null;
class Interval {
    constructor(time) {
        var timer = false;
        this.start = function () {
            if (this.isRunning()) {
                clearInterval(timer);
                timer = false;
            }

            timer = setInterval(function () {
                disabled = false;
            }, time);
        };

        this.stop = function () {
            clearInterval(timer);
            timer = false;
        };

        this.isRunning = function () {
            return timer !== false;
        };
    }
}

const disableInventory = (ms) => {
    disabled = true;

    if (disabledFunction === null) {
        disabledFunction = new Interval(ms);
        disabledFunction.start();
    } else {
        if (disabledFunction.isRunning()) {
            disabledFunction.stop();
        }
        disabledFunction.start();
    }
};

$(document).ready(function () {
    alt.on('stash:inventory:dataRequest', (inv, stash, chestType, maxWeight, maxInvWeight) => {
        updateMochila(inv, stash, maxWeight,maxInvWeight);
        console.log(chestType)
        type = chestType;
    });



    document.onkeyup = function (data) {
        if (data.which == 27) {
            alt.emit('stash:inventory:close')
        }
    };
});

const updateDrag = () => {
    $('.item').draggable({
        helper: 'clone',
        appendTo: 'body',
        zIndex: 99999,
        revert: 'invalid',
        opacity: 0.5,
        start: function (event, ui) {
            if (disabled) return false;

            $(this).children().children('img').hide();
            itemData = {
                key: $(this).data('item-key'),
                vehname: $(this).data('vehname-key'),
            };

            if (itemData.key === undefined || itemData.vehname === undefined)
                return;

            let $el = $(this);
            $el.addClass('active');
        },
        stop: function () {
            $(this).children().children('img').show();

            let $el = $(this);
            $el.removeClass('active');
        },
    });

    $('.item2').draggable({
        helper: 'clone',
        appendTo: 'body',
        zIndex: 99999,
        revert: 'invalid',
        opacity: 0.5,
        start: function (event, ui) {
            if (disabled) return false;

            $(this).children().children('img').hide();
            itemData = { key: $(this).data('item-key') };

            if (itemData.key === undefined) return;

            let $el = $(this);
            $el.addClass('active');
        },
        stop: function () {
            $(this).children().children('img').show();

            let $el = $(this);
            $el.removeClass('active');
        },
    });

    $('.esquerda').droppable({
        hoverClass: 'hoverControl',
        accept: '.item2',
        drop: function (event, ui) {
            itemData = { key: ui.draggable.data('item-key') };

            if (itemData.key === undefined) return;
            disableInventory(500);
            alt.emit(
                'stash:inventory:transferInventory',
                itemData.key,
                Number($('#amount').val()),
                type
            );
            alt.emit('stash:inventory:requestDataInvetory', type);

            document.getElementById('amount').value = 1;
        },
    });

    $('.direita').droppable({
        hoverClass: 'hoverControl',
        accept: '.item',
        drop: function (event, ui) {
            itemData = {
                key: ui.draggable.data('item-key'),
                vehname: ui.draggable.data('vehname-key'),
            };

            if (itemData.key === undefined || itemData.vehname === undefined)
                return;

            disableInventory(500);

            alt.emit(
                'stash:inventory:transferChest',
                itemData.key,
                Number($('#amount').val()),
                type
            );
            alt.emit('stash:inventory:requestDataInvetory', type);

            document.getElementById('amount').value = 1;
        },
    });
};

const formatarNumero = (n) => {
    var n = n.toString();
    var r = '';
    var x = 0;

    for (var i = n.length; i > 0; i--) {
        r += n.substr(i - 1, 1) + (x == 2 && i != 1 ? '.' : '');
        x = x == 2 ? 0 : x + 1;
    }

    return r.split('').reverse().join('');
};

const updateMochila = (inv, stash, maxWeight, maxInvWeight) => {
    const getCurrentWeight = (data) => {
        let weight = 0;
        if (!data) return;
        for (let i = 0; i < data.length; i++) {
            weight = !data[i]
                ? weight
                : weight + data[i].weight * data[i].amount;
        }
        return parseInt(weight);
    };
    const nameList = stash.sort((a, b) => (a.name > b.name ? 1 : -1));
    const nameList2 = inv.sort((a, b) => (a.name > b.name ? 1 : -1));
    $('#inventory').html(`
	<div class="peso"><b>USED:</b>  ${formatarNumero(getCurrentWeight(inv))}    <s>|</s>    <b>DISPONIBLE:</b>  ${formatarNumero(
        (parseInt(maxInvWeight) -
        getCurrentWeight(inv) )
    )}    <s>|</s>    <b>MAX WEIGHT:</b>  ${formatarNumero(parseInt(maxInvWeight))}</div>
	<div class="peso2"><b>USED:</b>  ${formatarNumero(getCurrentWeight(stash)
    )}    <s>|</s>    <b>DISPONIBLE:</b>  ${formatarNumero(
        maxWeight -
        getCurrentWeight(stash)
    )}    <s>|</s>    <b>MAX WEIGHT:</b>  ${formatarNumero(maxWeight)}</div>
			<div class="esquerda">
				${nameList2
                    .map(
                        (item) => `
					<div class="item" data-item-key="${item.name}" data-amount-key="${item.amount}" data-vehname-key="${
                            item.vehname
                        }">
					<div id="quantity">${
                        item.amount > 1 && item.unique
                            ? 1
                            : formatarNumero(item.amount)
                    }</div>
					<div class="image" style="background-image: url(http://localhost/inv/${
                        item.image
                    });"></div>
					<div id="itemname">${item.label}</div>
					<div id="peso">${(item.weight * item.amount * 0.001).toFixed(2)}</div>
					</div>
				`
                    )
                    .join('')}
			</div>

			<div class="meio">
				<input id="amount" class="qtd" maxlength="9" spellcheck="false" value="1" placeholder="QUANTITY">
			</div>

			<div class="direita">
				${nameList
                    .map(
                        (item) => `
					<div class="item2" data-item-key="${item.name}" data-amount-key="${item.amount}" data-vehname-key="${
                            item.vehname
                        }">
					<div id="quantity">${
                        item.amount > 1 && item.unique
                            ? 1
                            : formatarNumero(item.amount)
                    }</div>
					<div class="image" style="background-image: url(http://localhost/inv/${
                        item.image
                    });"></div>
					<div id="itemname">${item.label}</div>
					<div id="peso">${(item.weight * item.amount * 0.001).toFixed(2)}</div>
					</div>
				`
                    )
                    .join('')}
			</div>
		`);
    updateDrag();
};
