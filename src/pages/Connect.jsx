import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "..";
import { useNavigate } from "react-router-dom";
import { updateClientID, updateConversations } from "../services/AuthServices";
import { getPageDetails } from "../services/PageSubscriptions";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { getConversationList, sendMessage } from "../services/MessageServices";

const Connect = () => {
    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(false);

    const processResponse = async (response) => {
        dispatch({ type: "UPDATE_INTEGRATION_STATUS", payload: response });
        const clientID = await updateClientID(
            state.userSession.user.email,
            response.authResponse.userID
        );
        dispatch({ type: "UPDATE_CLIENT_ID", payload: clientID });
        localStorage.setItem("clientID", JSON.stringify(clientID));

        setOpenDialog(false);
        if (clientID) {
            navigate("/dashboard");
        }
    };

    const handleUpdateConversations = async (conversations) => {
        const response = await updateConversations(state.userSession.user.email, conversations);
        dispatch({
            type: "UPDATE_CONVERSATIONS",
            payload: response
        });
    }

    const connectFB = () => {
        setOpenDialog(true);

        setTimeout(() => {
            window.FB.login(
                function (response) {
                    if (response.status === "connected") {
                        getPageDetails(response.authResponse.accessToken, response.authResponse.userID)
                            .then((res) => {
                                getConversationList(res.page_id, res.page_access_token)
                                    .then((conversations) => {
                                        handleUpdateConversations(conversations)
                                    }).catch((e) => {
                                        console.log(e);
                                    })

                                dispatch({
                                    type: "UPDATE_PAGE_DATA",
                                    payload: {
                                        pageId: res.page_id,
                                        page_access_token: res.page_access_token,
                                    },
                                });

                                dispatch({
                                    type: "UPDATE_BUSINESS",
                                    payload: {
                                        businessName: res.businessName,
                                        category: res.category,
                                    },
                                });
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                        processResponse(response);
                    }
                },
                { scope: "pages_show_list,pages_messaging" }
            );
        }, 1000);
    };

    const userLogout = () => {
        dispatch({ type: "SET_LOADING", payload: true });
        localStorage.clear("session");
        setTimeout(() => {
            dispatch({ type: "SET_LOADING", payload: false });
            navigate("/login");
        }, 1000);
    };

    useEffect(() => {
        const clientID = JSON.parse(localStorage.getItem("clientID"));
        if (clientID) {
            dispatch({ type: "UPDATE_CLIENT_ID", payload: clientID });
            navigate("/dashboard");
        } else navigate("/connect");
    }, []);

    return (
        <div className="flex h-screen bg-[#1E4D91] items-center justify-center font-[raleway]">
            <div className="flex flex-col items-center justify-center gap-6 bg-white p-10 rounded-xl shadow-lg w-96">
                <h1 className="text-md font-bold text-center mb-4">
                    Facebook Page Integration
                </h1>
                <button
                    onClick={connectFB}
                    className="flex justify-center items-center w-full bg-[#1E4D91] hover:bg-blue-900 text-white p-3 rounded-md"
                >
                    {openDialog ? (
                        <ThreeDots
                            visible={true}
                            height="24"
                            width="24"
                            color="#FFFFFF"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperClass=""
                        />
                    ) : (
                        "Connect Page"
                    )}
                </button>
                <button
                    disabled={state.loading}
                    onClick={userLogout}
                    className="flex justify-center items-center w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-md"
                >
                    {state.loading ? (
                        <TailSpin
                            visible={true}
                            height="24"
                            width="24"
                            color="#FFFFFF"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperClass=""
                        />
                    ) : (
                        "Logout"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Connect;
