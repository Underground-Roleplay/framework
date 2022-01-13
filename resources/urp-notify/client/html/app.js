var clippings = [
    {
        top: 32,
        right: 50,
        bottom: 50,
        left: 0,
    },
    {
        top: 28,
        right: 50,
        bottom: 50,
        left: 0,
    },
];

function showNotify(type, tittle, message, time) {
    if (time < 0 || time === null || time === undefined) time = 3000;
    if (type == 'error') {
        var html =
            "<div class='notification-box'><span class='fa-stack'><i class='fas fa-times'></i><i class='fas fa-times fill red'></i></span><div class='group negado'><div class='title denied'>" +
            tittle +
            "</div><div class='texto'>" +
            message +
            '</div></div></div>';
    } else if (type == 'success') {
        var html =
            "<div class='notification-box'><span class='fa-stack'><i class='fas fa-check'></i><i class='fas fa-check fill'></i></span><div class='group'><div class='title'>" +
            tittle +
            "</div><div class='texto'>" +
            message +
            '</div></div></div>';
    } else if (type == 'important') {
        var html =
            "<div class='notification-box'><i class='fas fa-exclamation'></i><i class='fas fa-exclamation fill-imp blue'></i><div class='group'><div class='title important'>" +
            tittle +
            "</div><div class='texto'>" +
            message +
            '</div></div></div>';
    } else if (type == 'communication') {
        var html =
            "<div class='notification-box'><i class='fas fa-bullhorn'></i><i class='fas fa-bullhorn fill-imp yellow'></i><div class='group'><div class='title comunicado'>" +
            tittle +
            "</div><div class='texto'>" +
            message +
            '</div></div></div>';
    }

    $(html)
        .appendTo('.notification-container')
        .animate({ opacity: 1 }, 'fast')
        .delay(time)
        .fadeOut(2000);
    setTimeout(() => {
        $('.fill').animate(
            {
                clip: clippings[1],
            },
            time
        );
        $('.fill-imp').animate(
            {
                clip: clippings[0],
            },
            time
        );
    }, 1000);
}

function showNotifyCenter(type, message, time) {
    if (time < 0 || time === null || time === undefined) time = 3000;
    if (type == 'comunicado') {
        var html = `
			<div class='notification-box-center'>
				<div class="grup-center">
					<div class='title-center'>COMUNICADO</div>
					<div class='texto'>${message}</div>
				</div>
				<div class="grup-button">
					<div class=' success'>Y</div>
					<div class=' denied'>U</div>
				</div>
			</div>
		`;
    }
    $(html)
        .appendTo('.notification-container-topcenter')
        .animate({ opacity: 1 }, 'fast')
        .delay(time)
        .fadeOut(2000);
}

if ('alt' in window) {
    alt.on('notify', (type, tittle, message) => {
        showNotify(type, tittle, message);
    });
    alt.on('notifyCenter', (type, message, time) => {
        showNotifyCenter(type, message, time);
    });
}
