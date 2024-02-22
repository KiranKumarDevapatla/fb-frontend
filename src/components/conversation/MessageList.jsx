import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../index';
import { getUser } from '../../services/AuthServices';

import { ScrollArea } from "../ui/scroll-area";

import { RiMenu2Line } from "react-icons/ri";
import { IoReload } from "react-icons/io5";

const MessageComponent = ({ id, activeStyle, message }) => {
    const { messages, participants: { data } } = message;
    const senderName = data[0].name;
    return (
        <div className={`flex flex-col gap-3 items-start ${activeStyle(id)} px-6 py-4 tracking-wide border-b`}>
            <div className="flex justify-between items-start gap-3 w-full">
                <div className="flex justify-between items-center gap-3">
                    <input type="checkbox" />
                    <div className="flex flex-col justify-center items-start">
                        <div className="text-sm font-semibold">{senderName}</div>
                        <div className="text-xs text-gray-500 font-semibold">
                            Facebook DM
                        </div>
                    </div>
                </div>
                {/* <div className="text-xs text-gray-500 font-semibold">10m</div> */}
            </div>
            <div className="flex flex-col justify-center items-start gap-1 ml-6">
                <div className="text-sm text-gray-500">
                    {messages.data[0].message}
                </div>
            </div>
        </div>
    )
}

const MessageList = () => {
    const { state, dispatch } = useContext(AppContext)
    const [conversations, setConversations] = useState([]);
    const [currrentConversation, setCurrentConversation] = useState("");

    const activeStyle = (id) => {
        return currrentConversation === id ? "bg-gray-100" : "bg-white hover:bg-gray-50"
    }

    const handleSelectConversation = (id) => {
        setCurrentConversation(id);
        dispatch({ type: "CURRENT_CONVERSATION", payload: id })
    }

    useEffect(() => {
        (async () => {
            const response = await getUser(state.userSession?.user.email);
            dispatch({ type: "UPDATE_CONVERSATIONS", payload: response?.conversations });
            setConversations(response?.conversations);
            setCurrentConversation(response?.conversations[0]?.id)
            handleSelectConversation(response?.conversations[0]?.id);
        })();
    }, [])

    return (
        <aside className="w-1/4 bg-white border-r">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center justify-center gap-4">
                    <RiMenu2Line className="h-6 w-6 cursor-pointer" />
                    <h1 className="font-semibold text-xl tracking-wide">
                        Conversations
                    </h1>
                </div>
                <IoReload className="h-6 w-6 cursor-pointer" />
            </div>
            <ScrollArea>
                {
                    conversations.map((m) => {
                        return (
                            <div key={m.id} onClick={() => handleSelectConversation(m.id)} className='cursor-pointer'>
                                <MessageComponent activeStyle={activeStyle} id={m.id} message={m} />
                            </div>
                        )
                    })
                }
            </ScrollArea>
        </aside>
    )
}

export default MessageList