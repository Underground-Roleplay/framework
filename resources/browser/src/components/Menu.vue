<template>
    <div>
        <v-container v-if="show" class="fill-height" fluid>
            <v-row align="end" justify="end">
                <v-card style="margin-right: 1vw; margin-top: 40vh" width="300">
                    <v-list-item :style="{ backgroundColor: bgColor }">
                        <v-list-item-content>
                            <v-list-item-title
                                class="title"
                                @click="focusInput(items[0].id, true)"
                            >
                                {{ title }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ subtitle }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list dense nav>
                        <v-container
                            style="max-height: 40vh"
                            class="overflow-y-auto"
                        >
                            <v-list-item
                                v-for="(item, idx) in items"
                                :shaped="true"
                                :key="item.id"
                                :class="{
                                    activeItem: currentSelection === idx,
                                    removedPadding: !!item.rightText,
                                }"
                                link
                                :disabled="item.disabled"
                                :ref="'item-' + idx"
                                style="max-height: 2vh"
                                @click="currentSelection = idx"
                            >
                                <v-list-item-icon
                                    style="margin-right: 0.5vw"
                                    v-if="item.icon"
                                >
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>

                                <v-list-item-title>{{
                                    item.text
                                }}</v-list-item-title>

                                <v-list-item-icon
                                    v-if="
                                        item.type !== 'Item' &&
                                        item.type !== 'InputItem'
                                    "
                                >
                                    <v-icon v-if="item.type === 'ForwardItem'"
                                        >mdi-arrow-right-bold</v-icon
                                    >
                                    <v-icon v-else-if="item.type === 'BackItem'"
                                        >mdi-arrow-left-bold</v-icon
                                    >
                                    <v-icon
                                        v-else-if="
                                            item.type === 'CheckboxItem' &&
                                            !item.checked
                                        "
                                        >mdi-checkbox-blank-outline</v-icon
                                    >
                                    <v-icon
                                        v-else-if="
                                            item.type === 'CheckboxItem' &&
                                            item.checked
                                        "
                                        >mdi-checkbox-marked-outline</v-icon
                                    >
                                </v-list-item-icon>
                                <v-list-item-icon v-if="item.rightIcon">
                                    <v-icon>
                                        {{ item.rightIcon }}
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-icon
                                    v-if="item.rightText"
                                    style="width: 10vw; margin-left: 0"
                                >
                                    <p style="font-size: 0.75vw; margin: auto">
                                        {{ item.rightText }}
                                    </p>
                                </v-list-item-icon>
                                <v-text-field
                                    v-if="item.type === 'InputItem'"
                                    v-model="item.input"
                                    :type="item.inputType"
                                    :placeholder="item.placeholder"
                                    :ref="'input-' + item.id"
                                    spellcheck="false"
                                    style="width: 6vw"
                                />
                                <v-list-item-icon
                                    v-if="item.type === 'ListItem'"
                                    style="width: 10vw; margin-right: 2.3vw"
                                >
                                    <v-icon style="margin-right: 0.4vw"
                                        >mdi-arrow-left</v-icon
                                    >
                                    <p
                                        :key="`listItem-${item.selectedItem}`"
                                        :style="{
                                            fontSize: `${
                                                0.9 -
                                                item.items[item.selectedItem]
                                                    .text.length *
                                                    0.02
                                            }vw`,
                                        }"
                                        style="width: 7.2vw; text-align: center"
                                    >
                                        {{ item.items[item.selectedItem].text }}
                                    </p>
                                    <v-icon style="margin-left: 0.4vw"
                                        >mdi-arrow-right</v-icon
                                    >
                                </v-list-item-icon>
                            </v-list-item>
                        </v-container>
                        <v-list-item-subtitle
                            class="float-left"
                            style="margin-top: 0.5vh"
                        >
                            {{ this.currentSelection + 1 }} / {{ items.length }}
                        </v-list-item-subtitle>
                    </v-list>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            show: false,
            title: "",
            subtitle: "",
            items: [],
            currentSelection: 0,
            bgColor: null,
        };
    },
    methods: {
        toggle(state) {
            this.show = state;
            if (!state) this.currentSelection = 0;
        },
        addItem(item) {
            this.items = [...this.items, item];
            //console.log(JSON.stringify(item));
        },
        removeItem(itemId) {
            let item = this.items.findIndex((item) => item.id === itemId);
            if (item === -1) return;
            this.items.splice(item, 1);
        },
        clear() {
            this.items = [];
        },

        setTitle(title) {
            this.title = title;
        },
        setSubtitle(subtitle) {
            this.subtitle = subtitle;
        },
        setBgColor(color) {
            this.bgColor = color;
        },
        setChecked(itemId, checked) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.checked = checked;
        },
        setItemText(itemId, text) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.text = text;
        },
        setItemIcon(itemId, icon) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.icon = icon;
        },
        setItemDisabled(itemId, disabled) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.disabled = disabled;
        },
        setItemRightIcon(itemId, icon) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.rightIcon = icon;
        },
        setItemRightText(itemId, text) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.rightText = text;
        },
        setInput(itemId, input) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.input = input;
        },
        setInputType(itemId, type) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.inputType = type;
        },
        setInputPlaceholder(itemId, placeholder) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.placeholder = placeholder;
        },
        setSelectedListItem(itemId, index) {
            let item = this.items.find((item) => item.id === itemId);
            if (!item) return;
            item.selectedItem = index;
        },

        focusInput(itemId, state) {
            let ref = this.$refs[`input-${itemId}`];
            let el = ref[0].$el.children[0].children[0].children[0].children[0];
            if (state) {
                el.focus();
            } else {
                let item = this.items.find((item) => item.id === itemId);
                alt.emit("menu:setInput", item.id, item.input);
                el.blur();
            }
        },
        moveUp() {
            if (this.currentSelection === 0)
                this.currentSelection = this.items.length - 1;
            else this.currentSelection--;
            let item = this.$refs[`item-` + this.currentSelection][0].$el;
            item.focus();
        },
        moveDown() {
            if (this.currentSelection === this.items.length - 1)
                this.currentSelection = 0;
            else this.currentSelection++;
            let item = this.$refs[`item-` + this.currentSelection][0].$el;
            item.focus();
        },
        moveLeft() {
            let item = this.items[this.currentSelection];
            if (item.type !== "ListItem") return;

            if (item.selectedItem === 0)
                item.selectedItem = item.items.length - 1;
            else item.selectedItem--;

            alt.emit("menu:setListItem", item.id, item.selectedItem);
        },
        moveRight() {
            let item = this.items[this.currentSelection];
            if (item.type !== "ListItem") return;

            if (item.selectedItem === item.items.length - 1)
                item.selectedItem = 0;
            else item.selectedItem++;

            alt.emit("menu:setListItem", item.id, item.selectedItem);
        },
        select() {
            let item = this.items[this.currentSelection];
            alt.emit("menu:select", item.id, this.currentSelection);
        },
    },
    created() {
        if ("alt" in window) {
            alt.on("menu:toggle", this.toggle);

            alt.on("menu:addItem", this.addItem);
            alt.on("menu:removeItem", this.removeItem);
            alt.on("menu:clear", this.clear);

            alt.on("menu:setTitle", this.setTitle);
            alt.on("menu:setSubtitle", this.setSubtitle);
            alt.on("menu:setBgColor", this.setBgColor);
            alt.on("menu:setInput", this.setInput);
            alt.on("menu:setInputType", this.setInputType);
            alt.on("menu:setInputPlaceholder", this.setInputPlaceholder);

            alt.on("menu:setItemChecked", this.setChecked);
            alt.on("menu:setItemText", this.setItemText);
            alt.on("menu:setItemIcon", this.setItemIcon);
            alt.on("menu:setItemDisabled", this.setItemDisabled);
            alt.on("menu:setItemRightIcon", this.setItemRightIcon);
            alt.on("menu:setItemRightText", this.setItemRightText);
            alt.on("menu:setSelectedListItem", this.setSelectedListItem);
            alt.on("menu:focusInput", this.focusInput);

            alt.on("menu:moveUp", this.moveUp);
            alt.on("menu:moveDown", this.moveDown);
            alt.on("menu:moveLeft", this.moveLeft);
            alt.on("menu:moveRight", this.moveRight);
            alt.on("menu:select", this.select);
        }
    },
};
</script>
<style scoped>
.activeItem {
    background-color: rgba(211, 211, 211, 0.25);
}
.removedPadding {
    padding-right: 0;
}
</style>