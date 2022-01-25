import { v4 as uuidv4 } from 'uuid';
import * as alt from 'alt-server';
// import chat from 'urp-chat';

let requests = [];

const createRequest = async (source, text, time, cb) => {
    const uid = uuidv4();
    const request = { source: source, reply: cb, done: false };
    requests[uid] = request;

    alt.setTimeout(() => {
        if (requests[uid] && !requests[uid].done) {
            request.reply(false);
            delete requests[uid];
        }
    }, time + 500);

    alt.emitClient(source, 'notifyCenter', uid, 'communicate', text, time);
};

const requestResult = (source, id, reply) => {
    const request = requests[id];
    if (!request) return;
    request.done = true;
    request.reply(reply);
    delete requests[id];
};

alt.onClient('notifyCenter:resolve', requestResult);

export { createRequest };

// chat.registerCmd('prompt', async (source, [message]) => {
//     if (!source) return;
//     const res = await createRequest(source, message, 3000, (res) => {
//         console.log('answer', res)
//     })
// });
