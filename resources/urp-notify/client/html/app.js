const app = {
    showNotify: (type, tittle, message) => {
        let url;
        if (type == 'error'){
            url = 'http://resource/client/html/error.png';
        } else if (type == 'sucess'){
            url = 'http://resource/client/html/sucess.png';
        }
        iziToast.show({
            id: 'haduken',
            class: 'pingo',
            theme: 'dark',
            title: tittle,
            displayMode: 2,
            close: false,
            balloon: false,
            backgroundColor: 'rgba(0, 0, 0, 0.30)',
            message: message,
            position: 'topCenter',
            transitionIn: 'fadeInDown',
            transitionOut: 'fadeOutDown',
            progressBar: true,
            imageWidth: 70,
            layout: 1,
            iconColor: 'rgb(0, 255, 184)',
            messageSize: 12,
            iconUrl:url
        });
        $('.pingo').append(`
            <div class="upLineL"></div>
            <div class="upLineR"></div>
            <div class="line"></div>
            <div class="lineBottom"></div>
        `)
    }
};

if('alt' in window){
    alt.on('notify', (type, tittle, message) => {
        app.showNotify(type, tittle, message);
    });
};
