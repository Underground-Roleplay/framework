import * as alt from "alt-client";
import { config } from "../shared/config";

alt.on("keyup", (keycode) => {
  switch (keycode) {
    case config.switchChannelsKey: // Key: F1
      alt.emitServer("voice:rangeChanged");
      break;
  }
});