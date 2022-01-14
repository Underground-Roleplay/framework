/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import Core from 'urp-core';

alt.onClient('context:vehicle:engine', (source) => {
    Core.Vehicles.handleToggleEngine(source, source.vehicle);
});
