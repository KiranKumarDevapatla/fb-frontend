import axios from "axios";
const sign = require("jwt-encode");

const BACKEND_API = "https://helpdeskbackend-d76bb5965927.herokuapp.com";

export const userSignup = async (formData, rememberMe) => {
    try {
        const {
            data: { user },
        } = await axios.post(`${BACKEND_API}/signup`, formData);
        const token = sign({ _id: user._id }, process.env.REACT_APP_JWT_SECRET);

        const session = {
            user: {
                name: user.name,
                email: user.email,
                clientID: null,
            },
            token,
        };
        if (rememberMe) localStorage.setItem("session", JSON.stringify(session));
        return session;
    } catch (e) {
        console.log("Error", e.message);
    }
};

export const userLogin = async (formData, rememberMe) => {
    try {
        const {
            data: { user },
        } = await axios.post(`${BACKEND_API}/login`, formData);

        const token = sign({ _id: user._id }, process.env.REACT_APP_JWT_SECRET);
        const session = {
            user: {
                name: user.name,
                email: user.email,
                clientID: null,
            },
            token,
        };
        if (rememberMe) localStorage.setItem("session", JSON.stringify(session));
        return session;
    } catch (e) {
        console.log("Error", e.message);
    }
};

export const getUser = async (email) => {
    try {
        const response = await axios.post(`${BACKEND_API}/get-user`, { email });
        return response.data.user;
    } catch (e) {
        console.log("Error", e.message);
    }
};

export const updateClientID = async (email, clientID) => {
    try {
        const {
            data: { user },
        } = await axios.post(`${BACKEND_API}/add-client-id`, { email, clientID });
        return user.clientID;
    } catch (e) {
        console.log("Error", e.message);
    }
};

export const updateConversations = async (email, conversations) => {
    try {
        const { data } = await axios.post(`${BACKEND_API}/update-conversations`, {
            email,
            conversations,
        });
        return data.conversations;
    } catch (e) {
        console.log("Error", e.message);
    }
};

export const checkAuth = () => {
    const session = JSON.parse(localStorage.getItem("session"));
    return session.token;
};
