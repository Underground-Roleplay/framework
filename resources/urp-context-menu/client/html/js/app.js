if ('alt' in window) {
    alt.on('createWheel', (data, entityDate) => {
        createWheel(data, entityDate);
    });
}

document.addEventListener('DOMContentLoaded', (e) => {
    alt.emit('CEFLoaded');
});
function createWheel(obj, entity) {
    let piemenu;
    let wheelspreader;
    let wheelspreadertitle;
    for (let i = 0; i < obj.length; i++) {
        const event = encodeURIComponent(JSON.stringify(obj[i].event));
        if (obj[i].image !== undefined) {
            document.getElementById(
                'piemenu'
            ).innerHTML += `<div id="piemenu-item-${i}" data-wheelnav-navitemimg="${obj[i].image}" onmouseup="alt.emit('emitEvent', '${event}', ${entity}); alt.emit('destroy'); "></div>`;
        } else {
            document.getElementById(
                'piemenu'
            ).innerHTML += `<div id="piemenu-item-${i}" data-wheelnav-navitemtext="${obj[i].title}" onmouseup="alt.emit('emitEvent', '${event}' , ${entity}); alt.emit('destroy'); "></div>`;
        }
    }
    piemenu = new wheelnav('piemenu');
    piemenu.spreaderInTitle = icon.plus;
    piemenu.spreaderOutTitle = icon.cross;
    piemenu.spreaderRadius = piemenu.wheelRadius * 0.34;
    piemenu.wheelRadius = piemenu.wheelRadius * 0.83;
    piemenu.selectedNavItemIndex = null;
    piemenu.createWheel();
    wheelspreader = document.getElementById('wheelnav-piemenu-spreader');
    wheelspreadertitle = document.getElementById(
        'wheelnav-piemenu-spreadertitle'
    );
    wheelspreader.onmouseup = function () {
        alt.emit('destroy');
    };
    wheelspreadertitle.onmouseup = function () {
        alt.emit('destroy');
    };
}
