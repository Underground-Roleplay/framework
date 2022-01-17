import * as alt from 'alt-client';
import {
    Menu,
    MenuColor,
    MenuItem,
    InputMenuItem,
    InputType,
} from './utils/menu';

let isOpen;

let currentAppartment;

let menu = new Menu(
    'Home system',
    'Select one of the options',
    MenuColor.GREEN
);

menu.addItem(new MenuItem('Buy a Home', 'mdi-home-group'));
menu.addItem(new MenuItem('Sell your Home', 'mdi-currency-usd'));
menu.addItem(new MenuItem('Enter your Home', 'mdi-door-open'));
menu.addItem(
    new InputMenuItem(InputType.TEXT, '..', 'Request Access', 'mdi-bullhorn')
);

menu.onSelect(({ text }) => {
    switch (text) {
        case 'Buy a Home':
            alt.emitServer('homes:buy');
            menu.hide();
            isOpen = false;
            break;
        case 'Sell your Home':
            alt.emitServer('homes:sell');
            menu.hide();
            isOpen = false;
            break;
        case 'Enter your Home':
            alt.emitServer('homes:enter');
            menu.hide();
            isOpen = false;
            break;
    }
});

menu.onInputChange((item, input) => {
    if (item.text !== 'Request Access') return;
    currentAppartment = parseInt(input);
    menu.hide();
    isOpen = false;
    alt.emitServer('homes:request', currentAppartment);
});

alt.onServer('homes:enter', () => {
    alt.log('henlo');
    menu.show();
    isOpen = true;
});

// alt.on('playerData:changed', (key, value, old) => {
//     if (!isOpen) return;
//     if (key === 'inInteraction' && !value && old) {
//         menu.hide();
//         isOpen = false;
//     }
// });
