import React, { useContext, useState } from 'react';

import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { AppContext } from '../../context/AppContext';
import { getInitials } from '../../utils/utils';
import { sendMessage } from '../../services/MessageServices';

const MessageLabel = ({ text, senderProfile }) => {

    return (
        <div className="flex flex-col gap-4 h-full w-full mb-4">
            <div className="flex items-start justify-start space-x-2">
                <Avatar className="border">
                    <AvatarImage
                        alt={senderProfile?.name}
                        src="/placeholder.svg?height=40&width=40"
                    />
                    <AvatarFallback>{getInitials(senderProfile?.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <div className="text-sm w-fit bg-white shadow-sm p-2 px-8 rounded-md">
                        {text.message}
                    </div>
                    <div className="text-xs text-gray-500 font-semibold tracking-wide">
                        {senderProfile?.name}
                    </div>
                </div>
            </div>
        </div>
    )
}

const MessageArea = () => {
    const { state, dispatch } = useContext(AppContext);

    const [reply, setReply] = useState("");

    const conversation = state.conversations?.find(({ id }) => id === state.currentConversation);

    const messages = conversation?.messages.data;
    const senderProfile = state.conversations?.length > 0 && state.conversations[0]?.participants?.data[0];
    const PSID = senderProfile.id;

    const handleSendMessage = (e) => {
        if (e.key === 'Enter') {
            sendMessage(state.pageData.page_access_token, state.pageData.page_id, PSID, reply);
            setReply("");
        }
    }

    return (
        <main className="w-2/4 bg-white border-r">
            <div className="flex flex-col w-full h-screen bg-gray-100">
                <div className="flex items-center justify-between p-4 border-b bg-white">
                    <div className="text-lg font-semibold tracking-wide">{senderProfile?.name || ""}</div>
                </div>
                <ScrollArea className="p-4 h-[51.5rem]">
                    {
                        messages?.map((m) => (
                            <MessageLabel key={m.id} text={m} senderProfile={senderProfile} />
                        ))
                    }
                </ScrollArea>
                <div className="p-4 bg-gray-100">
                    <Input placeholder={`Message ${senderProfile?.name}`} value={reply} onChange={(e) => setReply(e.target.value)} onKeyUp={handleSendMessage} />
                </div>
            </div>
        </main>
    )
}

export default MessageArea