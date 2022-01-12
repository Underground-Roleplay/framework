import Core from 'urp-core';
import * as alt from 'alt-server';
import db from 'mysql2-wrapper';

//> FUNCTION  EXECUT QUERY SQL
const executeSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response);
        };
        db.execute(query, parameters, resolvePromise, alt.resourceName);
    });
};

const insertSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response);
        };
        db.insert(query, parameters, resolvePromise, alt.resourceName);
    });
};

const updateSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response);
        };
        db.update(query, parameters, resolvePromise, alt.resourceName);
    });
};
//>----------------------------------------------------------------------------------------------------------------------------------------

//> FIRST SPAWN THE PLAYER

alt.on('Core:Phone:CreateSQL', async (source) => {
    await insertSync('INSERT INTO phone_contact (ssn,contact) VALUES (?,?)', [
        Core.Functions.GetSsn(source),
        '[]',
    ]);
    await insertSync('INSERT INTO phone_recent (ssn,recent) VALUES (?,?)', [
        Core.Functions.GetSsn(source),
        '[]',
    ]);
});

//>----------------------------------------------------------------------------------------------------------------------------------------
//>  GET DATA IN LOAD INITIAL PHONE
const GetAllData = async (source) => {
    ServLog(`LOADING PHONE DATA`);
    const contact = await executeSync(
        'SELECT contact from phone_contact WHERE ssn = ?',
        [Core.Functions.GetSsn(source)]
    );
    const recent = await executeSync(
        'SELECT recent from phone_recent WHERE ssn = ?',
        [Core.Functions.GetSsn(source)]
    );
    const history = await executeSync(
        'SELECT * from chat WHERE id_player_one = :myphone OR id_player_two = :myphone ',
        { myphone: Core.Functions.GetNumber(source) }
    );
    const mynumber = Core.Functions.GetNumber(source);
    const ssn = Core.Functions.GetSsn(source);

    alt.emitClient(
        source,
        'Phone:GetAllData',
        contact,
        recent,
        history,
        mynumber,
        ssn
    );
};
alt.onClient('Phone:Load', (source) => {
    GetAllData(source);
});
//>----------------------------------------------------------------------------------------------------------------------------------------
//>  VERIFY THE EXISTENCE IF IT DOESN'T EXIST THE CHAT IS CREATED
const GetChatId = async (source, phone) => {
    ServLog(`SEARCHING IF  THERE IS CHAT`);
    ServLog(phone);
    const result = await executeSync(
        'SELECT * from chat WHERE id_player_one = :myphone AND id_player_two = :phone  OR  id_player_one = :phone AND id_player_two = :myphone',
        { myphone: Core.Functions.GetNumber(source), phone: phone }
    );
    if (result.length >= 1) {
        alt.emitClient(source, 'Phone:GetIdChat', result[0].id);
        ServLog(`CHAT FOUND ID: ${result[0].id}`);
    } else {
        const save = await insertSync(
            'INSERT INTO chat (id_player_one,id_player_two) VALUES (?,?)',
            [Core.Functions.GetNumber(source), phone]
        );
        alt.emitClient(source, 'Phone:GetIdChat', save);
        ServLog(`CHAT CREATED ID: ${save}`);
    }
};
alt.onClient('Phone:GetChatId', (source, phone) => {
    GetChatId(source, phone);
});

const UpdateContain = async (source, phone) => {
    console.log(Core.Functions.GetNumber(source), phone);
    const result = await executeSync(
        'SELECT * from chat WHERE id_player_one = :myphone AND id_player_two = :phone  OR  id_player_one = :phone AND id_player_two = :myphone',
        { myphone: Core.Functions.GetNumber(source), phone: phone }
    );
    console.log(result);
    if (result[0].contain_message === 0) {
        await updateSync(
            'UPDATE chat SET contain_message = ? WHERE id = ?',
            [1, result[0].id],
            undefined,
            alt.resourceName
        );
    }
};

alt.onClient('Phone:updatecontain', (source, phone) => {
    UpdateContain(source, phone);
});

//>----------------------------------------------------------------------------------------------------------------------------------------
//  SAVE  THE  MESSAGE
const SaveMessageId = async (source, type, message, chat_id, phone) => {
    console.log(source, type, message, chat_id, phone);
    await insertSync(
        'INSERT INTO chat_message (type,message,ssn,chave_id) VALUES (?,?,?,?)',
        [type, message, Core.Functions.GetSsn(source), chat_id]
    );
    await updateSync(
        'UPDATE chat SET last_message = ? WHERE id = ?',
        [message, chat_id],
        undefined,
        alt.resourceName
    );
    Core.Functions.PhoneTunel(
        source,
        'Phone:ReciveMessage',
        {
            type: type,
            message: message,
            ssn: Core.Functions.GetSsn(source),
            chat_id: chat_id,
        },
        phone
    );
};
alt.onClient(
    'Phone:CreateMessage',
    (source, type, menssage, chat_id, phone) => {
        SaveMessageId(source, type, menssage, chat_id, phone);
    }
);
//>----------------------------------------------------------------------------------------------------------------------------------------
//>  GET ALL CONVERSATION
const GetChatMessage = async (source, chat_id) => {
    ServLog(`LOADING CONVERSATION DATA`);
    const result = await executeSync(
        'SELECT * from chat_message WHERE chave_id = ? ',
        [chat_id]
    );
    alt.emitClient(source, 'Phone:GetChatMessage', result);
};
alt.onClient('Phone:GetChatMessage', (source, chat_id) => {
    GetChatMessage(source, chat_id);
});
//>----------------------------------------------------------------------------------------------------------------------------------------
//>
const UpdateListContact = async (ssn, data) => {
    await updateSync(
        'UPDATE phone_contact SET contact = ? WHERE  ssn = ?',
        [JSON.stringify(data), ssn],
        undefined,
        alt.resourceName
    );
};

alt.onClient('Phone:UpdateListContact', (source, ssn, data) => {
    UpdateListContact(ssn, data);
}); //Funcionando
//>----------------------------------------------------------------------------------------------------------------------------------------
//>
const UpdateListRecents = async (ssn, data) => {
    await updateSync(
        'UPDATE phone_recent SET recent = ? WHERE ssn = ?',
        [JSON.stringify(data), ssn],
        undefined,
        alt.resourceName
    );
};

alt.onClient('Phone:UpdateListRecents', (source, ssn, data) => {
    UpdateListRecents(ssn, data);
});
//>----------------------------------------------------------------------------------------------------------------------------------------
//>
const Visualized = async (source, chat_id) => {
    await updateSync(
        'UPDATE phone_message SET visualized = ? WHERE chat_id = ?',
        [1, chat_id],
        undefined,
        alt.resourceName
    );
};
alt.onClient('Phone:Visualized', (source, chat_id) => {
    Visualized(chat_id);
});

//>----------------------------------------------------------------------------------------------------------------------------------------
//>
const Deleted = async (source, id) => {
    await updateSync(
        'UPDATE phone_message SET deleted = ? WHERE id = ?',
        [1, id],
        undefined,
        alt.resourceName
    );
};

alt.onClient('Phone:Deleted', (source, id) => {
    Deleted(id);
});
//>----------------------------------------------------------------------------------------------------------------------------------------

///124620035 duduzeira
///193320774 xipanca
///166531286 nick

alt.onClient('Phone:CallLink', (source, number) => {
    console.log(number, 'Phone:CallLink');
    Core.Functions.inviteCallRequest(source, number);
});

alt.onClient('Phone:DestroyCall', (source, number) => {
    Core.Functions.endCall(source, number);
});

alt.onClient('Phone:DestroyCallMy', (source, chanelname, number, inChanel) => {
    if (inChanel !== false) {
        Core.Functions.endCall(source, number);
    }
    Core.Functions.PhoneTunel(source, 'Phone:endCall', '', number);
});

alt.onClient('Phone:AceptCall', (source, number) => {
    ServLog('Phone:aceptCall');
    console.log(number, 'Phone:aceptCall');
    Core.Functions.createCallPhone(source, number);
});

function ServLog(txt) {
    console.log('[SERVER-PHONE] ' + txt);
}
