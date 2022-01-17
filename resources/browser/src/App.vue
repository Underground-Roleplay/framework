<template>
    <v-app id="app">
        <Menu />
    </v-app>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
    components: {
        Menu: Menu
    },
    data() {
        return {};
    },
    methods: {},
    mounted() {
        this.$vuetify.theme.dark = true;
    },
};
</script>

<style>

html{
    overflow-y: hidden !important;
}

body,
#app {
    background: transparent !important;
}

.logo {
    position: absolute;
    bottom: 0px;
    right: 0px;
    margin-right: 0.5vw;
    margin-bottom: 0.5vh;
}

#dev_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: auto;
}
</style>
