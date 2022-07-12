console.log('aqui');

alt.on('load:data', (e) => {
    data = e;
    GerarHTML();
    console.log(data);
});

function GerarHTML() {
    $('#app').empty().append(``);
    data.map((item) => {
        if (item.type == 'button') {
            $('#app').append(`
                <div class="external">
                    <button
                        type="button"
                        onclick="onClick('${item.id}')"
                        class="btn btn-primary"
                    >
                        ${item.name}
                    </button>
                </div>
            `);
        }
        if (item.type == 'input') {
            $('#app').append(`
          
          <div class='external'>
              <form>
                  <fieldset >
                      <div class="mb-3">
                          <input type="text" id="${item.id}" class="form-control" placeholder="${item.name}">
                      </div>
                      <button type="submit"  onclick="onClick('${item.id}')" class="btn btn-primary">Confirm</button>
                  </fieldset>
              </form>
          </div>
          `);
        }
    });
}

function onClick(id) {
    const result = data.find((i) => {
        if (i.id == id) return i;
    });
    if (result.type === 'button') {
        return alt.emit('defaultMenu:event', result);
    }
    if (result.type === 'input') {
        result.value = $(`#${result.id}`).val();
        return alt.emit('defaultMenu:event', result);
    }
}
