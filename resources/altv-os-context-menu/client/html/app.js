Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            x: 25,
            y: 25,
            show: false,
            menu: {}
        };
    },
    computed: {
        getPosition() {
            return { position: `fixed !important`, left: `${this.x}px`, top: `${this.y}px` };
        }
    },
    methods: {
        setReady() {
            this.show = true;
        },
        mount(menu, x, y) {
            this.x = x;
            this.y = y;
            this.menu = menu;
            this.show = true;
        },
        dismount() {
            this.show = false;
            this.menu = {};
        },
        select(data) {
            if ('alt' in window) {
                alt.emit('context:Select', data.eventName, data.isServer);
            } else {
                console.log(data.eventName);
            }
        }
    },
    mounted() {
        if ('alt' in window) {
            alt.on('context:Mount', this.mount);
            alt.on('context:Dismount', this.dismount);
        } else {
            // Used as a template when feeding this to a live server for editing.
            // Use the Live Share extenstion in VSCode and open a server with `index.html`.
            this.menu = {
                identifier: 'trashcan1',
                options: [
                    { eventName: 'trashcan:Look', isServer: true, name: 'Look in Trash' },
                    { eventName: 'trashcan:Dig', isServer: true, name: 'Dig in Trash' }
                ],
                title: 'Trash Can'
            };
        }
    }
});
