import Core from 'urp-core';
import * as alt from 'alt-client';
import * as natives from 'natives'

let isOpen = false


const openCellPhone = () => {

    Core.Browser.open('http://resources/urp-phone/client/html/index.html#/', true, false)

    //> GET DATA IN LOAD INITIAL PHONE
    Core.Browser.on('load', () => {
        alt.emitServer('Phone:Load')
    })
    //>VERIFY THE EXISTENCE IF IT DOESN'T EXIST THE CHAT IS CREATED
    Core.Browser.on('Phone:GetChatId', (phone) => { 
        alt.emitServer('Phone:GetChatId',phone)
    })
    //> SAVE  THE  MESSAGE
    Core.Browser.on(`Phone:CreateMessage`, (type,message,chat_id,phone) => {
        alt.emitServer('Phone:CreateMessage',type,message,chat_id,phone)
    })
    //>  GET ALL CONVERSATION
    Core.Browser.on(`Phone:GetChatMessage`, (chat_id) => { 
        alt.emitServer('Phone:GetChatMessage',chat_id) 
    })



    //>
    Core.Browser.on(`Phone:UpdateContact`, (ssn,data) => {
        alt.emitServer('Phone:UpdateListContact',ssn,data)
    })
    Core.Browser.on(`Phone:UpdateRecents`, (ssn,data) => {
        alt.emitServer('Phone:UpdateListRecents',ssn,data)
    })
    Core.Browser.on(`Phone:updatecontain`, (phone) => {
        console.log(phone);
        alt.emitServer('Phone:updatecontain',phone)
    })

    
    Core.Browser.on(`Phone:SendMessage`, (type,menssage,chat_id) => {
        alt.emitServer('Phone:SendMessage',type,menssage,chat_id) 
    })
    
    
    
    
    /*
    Core.Browser.on(`Phone:Visualized`, (chat_id) => {
        alt.emitServer('Phone:GetAllMessageId',chat_id)
    })
    
    Core.Browser.on(`Phone:Deleted`, (id) => {
        alt.emitServer('Phone:Deleted',1)
    })*/
    
    
    
    Core.Browser.on(`Phone:CallLink`, (number) => {
        alt.emitServer('Phone:CallLink',number)
    })
    Core.Browser.on(`Phone:CreateMessage`, (type,message,chat_id) => {
        alt.emitServer('Phone:CreateMessage',type,message,chat_id)
    })
    
    
    
    Core.Browser.on(`Phone:DestroyCallMy`, (chanelName,number,inChanel) => {
        closeCellPhone()
        console.log(chanelName,number);
        alt.emitServer('Phone:DestroyCallMy',chanelName,number,inChanel)
    })
    
    
    alt.toggleGameControls(false)
    isOpen = true
}


const openCallLink = (number) => {

    Core.Browser.open(`http://resources/urp-phone/client/html/index.html#/PhoneCallfull/CallLink?number=${number}&recebendo=true`, true, false)
    Core.Browser.on(`Phone:CallAcept`, (number) => {
        alt.emitServer('Phone:AceptCall',number)
    })
    Core.Browser.on(`Phone:DestroyCall`, (number) => {
        closeCellPhone()
        alt.emitServer('Phone:DestroyCall',number)
    })


    isOpen = true
}

//> RETURN OF DATA INITIALIZATION
alt.onServer('Phone:GetAllData' , (DataContact,DataRecent,DataHistory,DataNumber,DataSsn) => {
    Core.Browser.emit('Phone:GetAllData',DataContact,DataRecent,DataHistory,DataNumber,DataSsn)
})
//> RETURN IF PLAYER ACCEPTS A CONNECTION
alt.onServer('Phone:inCall' , (data) => {
    Clienlog('Phone:inCall') 
    Core.Browser.emit('Phone:InChanel')
})
//> RETURN IF RECEIVING A CALL
alt.onServer('Phone:inviteCallRequest' , (number) => {
    openCallLink(number)
})
//> RETURN IF CHAT DOES NOT EXIST RETURN NEW CHAT ID
    alt.onServer('Phone:GetChatMessage' , (result) => {
        Core.Browser.emit('Phone:GetChatMessage',result)
    })
//> RETURN IF CHAT DOES NOT EXIST RETURN NEW CHAT ID
    alt.onServer('Phone:GetIdChat' , (id) => {
        Core.Browser.emit('Phone:GetIdChat',id)
    })
    alt.onServer('Core:Client:Phone' , (id) => {
        alt.emitServer('Phone:CreateSQL',id)
    })

const closeCellPhone = () => {
    
    Core.Browser.close()
    alt.toggleGameControls(true)
    isOpen = false
}






//<<>> TUNEL
    //> RETURN TO END CALL
        alt.onServer('Phone:endCall' , (number) => {
            Clienlog('Phone:endCall') 
            closeCellPhone(number)
        })
    //> RETURN IF YOU RECEIVE A MESSAGE
        alt.onServer('Phone:ReciveMessage' , (data) => {
            Core.Browser.emit('Phone:ReciveMessage',data)
            alt.emit('notify', 'error', 'teste', 'new mssage')
        })


 alt.on('keydown', (key) => {
    if (key === 75) {
        if (!isOpen) {
            openCellPhone()
        
        }else{
            closeCellPhone()
        }
        
     }
 })


 function Clienlog(txt) {
     console.log('[CLIENT-PHONE] ' +txt);
 }