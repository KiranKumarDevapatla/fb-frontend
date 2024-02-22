import axios from "axios";

const MESSAGE_API = "https://graph.facebook.com/v19.0/";

let conversations = [];

export const getConversationList = (page_id, page_access_token) => {
    const response = new Promise((resolve, reject) => {
        (async () => {
            const res = await axios.get(`https://graph.facebook.com/v19.0/${page_id}/conversations?fields=participants,messages{id,message}
            &access_token=${page_access_token}`)
            if (res && !res.error) {
                const conversations = res.data.data[0];
                resolve(conversations);
            } else {
                reject(res.error)
            }
        })();
    });

    return response;
};

export const getMessagesInConversation = async (
    page_access_token,
    conversation_id
) => {
    try {
        const response =
            await axios.get(`${MESSAGE_API}/${conversation_id}/conversations?fields=messages
        &access_token=${page_access_token}`);
        return response.data.messages.data;

    } catch (e) {
        console.log(e);
    }
};

export const getMessageDetails = async (page_access_token, message_id) => {
    try {
        const response =
            await axios.get(`${MESSAGE_API}/${message_id}?fields=id,created_time,from,to,message
        &access_token=${page_access_token}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getAllConversations = async () => {
    return conversations;
};

export const sendMessage = async (page_access_token, page_id, PSID, messageText) => {

    // Construct the message body
    const data = {
        "object": "page",
        "entry": [
            {
                "id": `${page_id}`,
                "page_access_token": `${page_access_token}`,
                "messaging": [
                    {
                        "id": `${PSID}`,
                        "message": `${messageText}`
                    }
                ]
            }
        ]
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        await axios.post(`https://helpdeskbackend-d76bb5965927.herokuapp.com/webhook`, data, config)
    } catch (e) {
        console.log(e);
    }
}