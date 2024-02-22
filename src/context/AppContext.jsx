import { createContext, useEffect, useReducer } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const reducerFn = (state, action) => {
        switch (action.type) {
            case "UPDATE_USER_SESSION":
                return {
                    ...state,
                    userSession: action.payload,
                };
            case "UPDATE_CLIENT_ID":
                return {
                    ...state,
                    clientID: action.payload,
                };
            case "UPDATE_BUSINESS":
                return {
                    ...state,
                    businessData: action.payload,
                };
            case "UPDATE_CONVERSATIONS":
                return {
                    ...state,
                    conversations: action.payload,
                };
            case "UPDATE_PAGE_DATA":
                return {
                    ...state,
                    pageData: action.payload,
                };
            case "CURRENT_CONVERSATION":
                return {
                    ...state,
                    currentConversation: action.payload
                }
            case "UPDATE_INTEGRATION_STATUS":
                return {
                    ...state,
                    isIntegrated: {
                        status: action.payload.status,
                        authResponse: action.payload.authResponse,
                    },
                    clientID: action.payload.authResponse.userID,
                };
            case "SET_LOADING":
                return {
                    ...state,
                    loading: action.payload
                }
            default:
                return state;
        }
    };

    const initialState = {
        userSession: null,
        clientID: null,
        businessData: {
            businessName: "",
            category: ""
        },
        pageData: {
            pageId: "",
            page_access_token: "",
        },
        conversations: [],
        currentConversation: [],
        isIntegrated: {
            status: false,
            authResponse: null,
        },
        loading: false
    };

    const setDefault = () => {
        const business = JSON.parse(localStorage.getItem("businessDetails"));
        dispatch({ type: "UPDATE_BUSINESS", payload: business })
    }

    const [state, dispatch] = useReducer(reducerFn, initialState);

    useEffect(() => {
        setDefault();
    }, [])

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
