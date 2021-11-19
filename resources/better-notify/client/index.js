import * as alt from 'alt-client';

const view = new alt.WebView('http://resource/client/html/index.html');

let id = 0;

alt.onServer(
  'client:notify:sendMessage',
  ({ iconType, title, message, color, width, duration }) => {
    view.emit('notify:ShowNotification', {
      id: id,
      iconType,
      title,
      message,
      color,
      width,
      duration,
    });
    id++;
  }
);

alt.on(
  'notify:sendMessage',
  ({ iconType, title, message, color, width, duration }) => {
    view.emit('notify:ShowNotification', {
      id: id,
      iconType,
      title,
      message,
      color,
      width,
      duration,
    });
    id++;
  }
);
