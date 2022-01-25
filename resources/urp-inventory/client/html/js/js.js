let slotActived = [
  {name:'',type:''},
  {name:'',type:''},
  {name:'',type:''},
]
let dataChest =[]
let chestType ='';


const updateDrag = () => {
  $('.actions').hide();
  $('.slot-item-img').draggable({
      helper: 'clone',
      appendTo: 'body',
      zIndex: 99999,
      revert: 'invalid',
      opacity: 0.5,
      with: 64,
      start: function(event, ui) {
          $(this).children().children('img').hide();
          itemData = { name: $(this).data('name'), type: $(this).data('type') };
          if (itemData.name === undefined || itemData.type === undefined) return;
          $('.actions').show();
      },
      stop: function() {
          $(this).children().children('img').show();
          
          $('.actions').hide();
      }
  })
  $('.use').droppable({
      hoverClass: 'hoverControl',
      drop: function(event, ui) {
        itemData = { name: ui.draggable.data('name'), type: ui.draggable.data('type'), useable: ui.draggable.data('use') };
          if (itemData.name === undefined || itemData.type === undefined) return;
          if (itemData.useable) {
            alt.emit('inventory:useItem', {name:itemData.name, type:itemData.type})
            alt.emit('inventory:requestDataInvetory') 
          }else return
        }
      })
      $('.send').droppable({
        hoverClass: 'hoverControl',
        drop: function(event, ui) {
          itemData = { name: ui.draggable.data('name'), amount: ui.draggable.data('amount')};
          if (itemData.name === undefined ) return;
          
          alt.emit('inventory:sendItem', {name:itemData.name,amount:itemData.amount, type:itemData.type})
          alt.emit('inventory:requestDataInvetory') 
        }
      })
      $('.drop').droppable({
        hoverClass: 'hoverControl',
        drop: function(event, ui) {
          itemData = { name: ui.draggable.data('name'), amount: ui.draggable.data('amount')};
          if (itemData.name === undefined ) return;
          
          alt.emit('inventory:dropItem', {name:itemData.name, amount:itemData.amount})
          alt.emit('inventory:requestDataInvetory') 
      }
  })
  updateDragChest()
}

const updateDragSlotActive = () => {
  $('.slotActived-img-I').draggable({
    helper: 'clone',
    appendTo: 'body',
    zIndex: 99999,
    revert: 'invalid',
    opacity: 0.5,
    start: function(event, ui) {
      $(this).children().children('img').hide();
      itemData = { name: $(this).data('name'), type: $(this).data('type') };
      if (itemData.name === undefined || itemData.type === undefined) return;
    },
    stop: function() {
      $(this).children().children('img').show();
    }
  })
  $('.slotActived-img-II').draggable({
    helper: 'clone',
    appendTo: 'body',
    zIndex: 99999,
    revert: 'invalid',
    opacity: 0.5,
    start: function(event, ui) {
      $(this).children().children('img').hide();
      itemData = { name: $(this).data('name'), type: $(this).data('type') };
      if (itemData.name === undefined || itemData.type === undefined) return;
    },
    stop: function() {
      $(this).children().children('img').show();
    }
  })
  $('.slotActived-img-III').draggable({
    helper: 'clone',
    appendTo: 'body',
    zIndex: 99999,
    revert: 'invalid',
    opacity: 0.5,
    start: function(event, ui) {
      $(this).children().children('img').hide();
      itemData = { name: $(this).data('name'), type: $(this).data('type') };
      if (itemData.name === undefined || itemData.type === undefined) return;
    },
    stop: function() {
      $(this).children().children('img').show();
    }
  })
  updateDropActived()
}
const updateDropActived = () => {
  $('.active-slot-I').droppable({
    hoverClass: 'hoverControl',
    drop: function(event, ui) {
      itemData = { name: ui.draggable.data('name'), type:ui.draggable.data('type'), origin: ui.draggable.data('origin') };
      if (itemData.origin === undefined || itemData.name === undefined) return;
      if (itemData.origin === 'inventory' && itemData.type === 'weapon') {
        slotActived[0] = {name: itemData.name, type: itemData.type}
        alt.emit('inventory:transferActived',itemData.name,0) 
        alt.emit('inventory:requestDataInvetory') 
      }else return
    }
  })
  $('.active-slot-II').droppable({
    hoverClass: 'hoverControl',
    drop: function(event, ui) {
      itemData = { name: ui.draggable.data('name'), type:ui.draggable.data('type'), origin: ui.draggable.data('origin') };
      if (itemData.origin === undefined || itemData.name === undefined) return;
      if (itemData.origin === 'inventory' && itemData.type === 'weapon') {
        slotActived[1] = {name: itemData.name, type: itemData.type}
     
        alt.emit('inventory:transferActived',itemData.name,1) 
        alt.emit('inventory:requestDataInvetory')

      }else return
    }
  })
  $('.active-slot-III').droppable({
    hoverClass: 'hoverControl',
    drop: function(event, ui) {
      itemData = { name: ui.draggable.data('name'), type:ui.draggable.data('type'), origin: ui.draggable.data('origin') };
      if (itemData.origin === undefined || itemData.name === undefined) return;
      if (itemData.origin === 'inventory' && itemData.type === 'weapon') {
        slotActived[2] = {name: itemData.name, type: itemData.type}
      
        alt.emit('inventory:transferActived',itemData.name,2) 
        
        alt.emit('inventory:requestDataInvetory') 
      }else return
    }
  })
}

const updateDragChest = () => {
  
  $('.slot-chest-img').draggable({
    helper: 'clone',
    appendTo: 'body',
    zIndex: 99999,
    revert: 'invalid',
    opacity: 0.5,
    with: 64,
    start: function(event, ui) {
      $(this).children().children('img').hide();
      itemData = { name: $(this).data('name'), type: $(this).data('type') };
      if (itemData.name === undefined || itemData.type === undefined) return;
    },
    stop: function() {
      $(this).children().children('img').show();
    }
  })
  $('.chest-drop').droppable({
    hoverClass: 'hoverControl',
    drop: function(event, ui) {
      itemData = { name: ui.draggable.data('name'), oringin: ui.draggable.data('origin'), amount: ui.draggable.data('amount') };
      if (itemData.name === undefined || itemData.oringin === 'chest') return;
      alt.emit('inventory:transferChest',itemData.name, itemData.amount, chestType) 
      alt.emit('inventory:requestDataInvetory') 
    }
  })
  $('.inventory-drop').droppable({
    hoverClass: 'hoverControl',
    drop: function(event, ui) {
      itemData = { name: ui.draggable.data('name'), oringin: ui.draggable.data('origin'), slot: ui.draggable.data('slot'), amount: ui.draggable.data('amount') };
      if (itemData.name === undefined || itemData.oringin === 'inventory') return;
      if (itemData.oringin === 'chest') {
        alt.emit('inventory:transferInventory',itemData.name, itemData.amount, chestType)  
         
      }
      if (itemData.oringin === 'activedSlot') {
        alt.emit('inventory:transfer:activedInventory',itemData.name,itemData.slot) 
      }
      alt.emit('inventory:requestDataInvetory')       
     
    }
  })
}
const createItemInventory = (obj,amount) => {
  $('#map-item-inventory').append(` 
    <div class="slot-item">   
      <p class="amount">x${amount}</p>
      <img class="slot-item-img" data-amount="${amount}" data-type="${obj.type}" data-name="${obj.name}" data-use="${obj.useable}" data-origin="${'inventory'}"  width="64px" da height="64px" src="./img/images/${obj.image}">
      <p class="name">${obj.label}</p>                
    </div> 
  `)
}
const createItemChest = (obj,amount) => {
  $('#map-item-chest').append(` 
    <div class="slot-item">   
      <p class="amount">x${amount}</p>
      <img class="slot-chest-img" data-amount="${amount}" data-type="${obj.type}" data-name="${obj.name}" data-use="${obj.useable}" data-origin="${'chest'}"  width="64px" da height="64px" src="./img/images/${obj.image}">
      <p class="name">${obj.label}</p>                
    </div> 
  `)
}


const updateChest = () => {
  $('#map-item-chest').empty()
  dataChest.map(obj =>{
    if (obj != null || obj != undefined ) {
      if (obj.unique) {
        for (let i = 0; i < obj.amount; i++) {
          createItemChest(obj,'1')
        }
      }else{
        
        createItemChest(obj, obj.amount)
      }
    }
  })
  updateDrag()
}

const updateInventory = (inventory,actived) => {
  $('#map-item-inventory').empty()
  inventory.map(obj =>{
    if (obj != null || obj != undefined ) {
      if (obj.unique) {
        for (let i = 0; i < obj.amount; i++) {
          createItemInventory(obj,'1')
        }
      }else{
        createItemInventory(obj, obj.amount)
      }
    }
  })
  updateDrag()
  updateSlotActived(actived)
}

const updateSlotActived = (actived) => {
  for (let i = 0; i < actived.length; i++) {
    if (actived[i].name !== '' && actived[i].name !== null && Object.keys(actived[i]).length > 0) {
      $(`#activedSlot-${i}`).empty().append(` 
        <img data-name="${actived[i].name}" data-origin="${'activedSlot'}" data-slot="${i}"   class="slotActived-img-I" width="65px" height="65px" src="./img/images/${actived[i].name}.png" alt="">
        <p class="name">weapon_dagger</p> 
      `)
    }else{
      $(`#activedSlot-${i}`).empty()
    }
  }
  updateDragSlotActive()
}
const updateDataHome = (data) => {
  dataChest = data
  chestType = 'home'
  $("#chestInventory").css("opacity", "1");
  updateChest()
}
const updateDataVehice = (data) => {
  dataChest = data
  chestType = 'vehicle'
  $("#chestInventory").css("opacity", "1");
  updateChest()
}
const updateDataChest = (data) => {
  dataChest = data
  chestType = 'chest'
  $("#chestInventory").css("opacity", "1");
  updateChest()
}

alt.on("inventory:dataRequest", updateInventory)

alt.on("inventory:dataHomeRequest", updateDataHome)
alt.on("inventory:dataVehiceRequest", updateDataVehice)
alt.on("inventory:dataChestRequest", updateDataChest)