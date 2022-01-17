/// <reference types="@altv/types-webview" />
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

new Vue({
    // @ts-ignore
    vuetify,
    render: (h) => h(App),
}).$mount("#app");

if (!("alt" in window)) {
    window.alt = {
        emit: (event, ...args) => {
            console.log(`Event emitted: ${event} (Args: ${args.toString()})`);
        },
        on: (event, handler) => {
            console.log(`Added event handler for '${event}'`);
        },
        off: (event, handler) => {
            console.log(`Removed event handler for '${event}'`);
        },
    };
}
