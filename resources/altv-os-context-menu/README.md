# Open Source - Context Menu - alt:V

[❤️ Become a Sponsor of my Open Source Work](https://github.com/sponsors/Stuyk/)

[⌨️ Learn how to script for alt:V](https://altv.stuyk.com/)

[💡 Need a Roleplay Script? Try Athena!](https://gtavathena.com/)

⭐ This repository if you found it useful!

---

![](https://i.imgur.com/srGHPbB.jpeg)

# Description

This allows you to create a simple context menu for players to utilize. Which means they can hold `left alt` and `right-click` on objects to select different objects based on their models. Which is great for creating in-depth options for players to utilize.

## Installing Dependencies / Installation

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge

After simply add the name of this resource to your `server.cfg` resource section.

`altv-os-context-menu`

Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/Stuyk/altv-os-context-menu
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```

# Configuring A Menu

All menus must be created on **client-side**.
They only need to be initialized once.
They are attached to an identifier and an entity id.

Go in-game. Hold `alt` and `right-click` on any object.
Open your console with `F8` then look at the model number for the object.

`alt.emit('context:CreateMenu')`

| Argument | Description                                           |
| -------- | ----------------------------------------------------- |
| `model`  | The model of the model you wish to append options to. |
| `title`  | The name of the menu.                                 |

### Example

```js
alt.on('context:Ready', () => {
    alt.emit('context:CreateMenu', 1329570871, 'Trash Can');
});
```

# Appending to Menu

All menus have an identifier.
Use the identifier to apply options to a menu.

`alt.emit('context:CreateMenu')`

| Argument            | Description                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------- |
| `model`             | The model of the model you wish to append options to.                                         |
| `contextOptionName` | The name of the option you are appending.                                                     |
| `eventCallbackName` | The event to call when the option is selected. Comes through `alt.emit` or `alt.onClient`     |
| `isServer`          | If true. Then the `callbackName` event will come through `alt.onClient`. Otherwise `alt.emit` |

### Example

```js
alt.on('context:Ready', () => {
    alt.emit('context:CreateMenu', 1329570871, 'Trash Can');
    alt.emit('context:AppendToMenu', 1329570871, 'Look in Trash', 'trashcan:Look', false);
    alt.emit('context:AppendToMenu', 1329570871, 'Dig in Trash', 'trashcan:Dig', true);
});
```

### Example - Recieving the Event on Client-side.

```js
alt.on('trashcan:Look', data => {
    alt.log(JSON.stringify(data));
});
```

### Example - Recieving the Event on Server-side.

```js
alt.onClient('trashcan:Dig', (player, data) => {
    console.log(data);
    alt.log(`${player.name} has dug in the trash. What an animal!`);
});
```

# Other alt:V Open Source Resources

-   [Authentication by Stuyk](https://github.com/Stuyk/altv-os-auth)
-   [Discord Authentication by Stuyk](https://github.com/Stuyk/altv-discord-auth)
-   [Global Blip Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-blip-manager)
-   [Global Marker Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-marker-manager)
-   [Chat by Dzeknjak](https://github.com/jovanivanovic/altv-os-chat)
-   [Entity Sync for JS by LeonMrBonnie](https://github.com/LeonMrBonnie/altv-os-js-entitysync)
