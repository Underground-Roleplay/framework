(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on('input', function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty('oldValue')) {
                this.value = this.oldValue;
                this.setSelectionRange(
                    this.oldSelectionStart,
                    this.oldSelectionEnd
                );
            }
        });
    };
})(jQuery);

$(document).on('contextmenu', function (event) {
    event.preventDefault();
});

function str_reverse(str) {
    var splitString = str.split('');
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join('');
    return joinArray;
}
$(document).ready(function () {
    var actionContainer = $('.inventory-mask, .inventory-content');
    alt.on('inventory:dataRequest', (data, maxWeight) => {
        syncInventory(data, maxWeight);
        actionContainer.fadeIn(500);
        open = true
    });  

    document.onkeyup = function (data) {
        if (data.which === 27) {
            alt.emit('inventory:closeInv')
        }
    };

    
 

});

const numberFormatter = (n) => {
    var n = n.toString();
    var r = '';
    var x = 0;

    for (var i = n.length; i > 0; i--) {
        r += n.substr(i - 1, 1) + (x == 2 && i != 1 ? '.' : '');
        x = x == 2 ? 0 : x + 1;
    }

    return r.split('').reverse().join('');
};

var syncInventory = (data, maxWeight) => {
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
    var nameList = data.sort((a, b) => (a.name > b.name ? 1 : -1));

    $('.inventory-title').html(`    
    <div class="d-flex justify-content-center bd-highlight mb-3">
    <div class="p-2 bd-highlight barra"><p class="cima">Max Weight</p><p class="down">${numberFormatter(parseInt(maxWeight))}kg</p></div>
    <div class="p-2 bd-highlight barra"><p class="cima">Used</p><p class="down">${numberFormatter(
        getCurrentWeight(data)
    )}kg</p></div>
    <div class="p-2 bd-highlight "><p class="cima">Disponible</p><p class="down">${numberFormatter(
        parseInt(maxWeight) -
        getCurrentWeight(data)
    )}kg</p></div>
    </div>
    `);
    $('.row.objects').html(`    
    ${nameList
        .map(
            (item) => `
        <div class="cell" data-item-key="${item.name}" data-item-type="${
                item.type
            }">
        <div class="options">
          <div class="option" data-event="use">Use</div>
          <div class="option" data-event="send">Send</div>
          <div class="option" data-event="drop">Drop</div>
        </div> 
        <div class="amount-option">
          <div class="row">
            <div class="left">
              <div class="plus"><i class="fas fa-minus"></i></div>
            </div>
            <div class="center"><input type="text" class="amount-value" placeholder="0" style="border: 0px; outline: 0px; width: 100%; height: 100%; text-align: center; padding-left: 5px; padding-right: 5px;" /></div>
            <div class="right">
              <div class="minus"><i class="fas fa-plus"></i></div>
            </div>
          </div>
          <div class="row">
            <button class="button" data-event="send">send</button>
          </div>
          <div class="row">
            <button class="button cancel" data-event="cancel">Cancel</button>
          </div>
        </div>
        <div class="row">
          <span class="amount">${
              item.amount > 1 && item.unique ? 1 : numberFormatter(item.amount)
          }</span>
        </div>
        <div class="row">
          <div class="image" style="background-image: url(http://localhost/inv/${
              item.image
          })"></div>
        </div>
        <div class="row">
          <div class="name">${item.label} <i>(${(
                item.weight *
                item.amount *
                0.001
            ).toFixed(2)}kg)</i></div>
        </div>
      </div>
    `
        )
        .join('')}
		`);
};

window.Option = false;

$(document).ready(function () {
    $(document).on('mousedown', '.objects .cell', function (ev) {
        if (ev.which == 3) {
            $('.cell .options').hide();
            $('.amount-option').hide();
            $(this).find('.options').show();
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).is('.objects .cell').length) {
            $('.cell .options').hide();
        }
    });

    $(document).on('click', '.options .option', function () {
        var event = $(this).data('event');
        var parentEl = $(this).closest('.cell');
        if (event == 'send' || event == 'drop') {
            Option = event;
            parentEl.find('.amount-option').show();
            parentEl.find('.amount-option').find('input').val('');
        } else if (event == 'use') {
            var $el = $(this).closest('.cell');
            var amount = 1;
            alt.emit('inventory:useItem', {
                name: $el.data('item-key'),
                type: $el.data('item-type'),
            });
            alt.emit('inventory:requestDataInvetory');
        }
    });

    $(document).on('click', '.amount-option button', function () {
        var event = $(this).data('event');
        if (event == 'send') {
            var paramUrl = Option == 'send' ? 'sendItem' : 'dropItem';
            var $el = $(this).closest('.cell');
            var amount = Number($el.find('.amount-value').val());
            if (paramUrl == 'sendItem'){
                alt.emit('inventory:sendItem', {
                    name: $el.data('item-key'),
                    amount,
                    type: $el.data('item-type'),
                })
            }
            if (paramUrl == 'dropItem'){
                alt.emit('inventory:dropItem', {
                    name: $el.data('item-key'),
                    amount,
                    type: $el.data('item-type'),
                })
            }

            alt.emit('inventory:requestDataInvetory');
        }
        Option = false;

        $('.amount-option').hide();
    });

    $('.row.objects').inputFilter(function (value) {
        return /^\d*$/.test(value);
    });

    $('.row.objects').on('click', '.amount-option .left', function () {
        var amountVal = $(this)
            .closest('.cell')
            .find('.amount-option .center input');
        if (amountVal.val() == '') {
            amountVal.val('0');
        }
        if (parseInt(amountVal.val()) - 1 >= 0) {
            amountVal.val(parseInt(amountVal.val()) - 1);
        }
    });

    $('.row.objects').on('click', '.amount-option .right', function () {
        var amountVal = $(this)
            .closest('.cell')
            .find('.amount-option .center input');
        if (amountVal.val() == '') {
            amountVal.val('0');
        }
        amountVal.val(parseInt(amountVal.val()) + 1);
    });
});
