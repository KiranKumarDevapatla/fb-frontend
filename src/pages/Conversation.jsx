import React from "react";

import SideNavbar from "../components/conversation/SideNavbar";
import MessageList from "../components/conversation/MessageList";
import MessageArea from "../components/conversation/MessageArea";
import ContactDetails from "../components/conversation/ContactDetails";

const Conversation = () => {
    return (
        <div className="flex h-screen bg-gray-100 font-[roboto]">
            <SideNavbar />
            <MessageList />
            <MessageArea />
            <ContactDetails />
        </div>
    );
};

export default Conversation;
