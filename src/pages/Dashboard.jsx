import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "..";
import { TailSpin } from "react-loader-spinner";

const Dashboard = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AppContext);

    const disconnectFB = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        window.FB.getLoginStatus(function (response) {
            window.FB.logout(function (response) { });
        });
        localStorage.removeItem("clientID");
        localStorage.removeItem("businessDetails");
        dispatch({ type: "UPDATE_CLIENT_ID", payload: null });
        dispatch({ type: "UPDATE_BUSINESS", payload: null });
        dispatch({ type: "UPDATE_CONVERSATIONS", payload: [] });
        setTimeout(() => {
            dispatch({ type: "SET_LOADING", payload: false });
            navigate("/connect");
        }, 2000)
    };

    const fetchConversations = async () => {
        navigate("/conversations");
    };

    return (
        <div className="flex h-screen bg-[#1E4D91] items-center justify-center font-[raleway]">
            <div className="flex flex-col items-center justify-center gap-8 bg-white p-10 rounded-xl shadow-lg w-96">
                <div className="tracking-wide">
                    <h1 className="text-xl font-bold text-center mb-4">
                        Facebook Page Integration
                    </h1>
                    <div>
                        Integrated Page Name:{" "}
                        <span className="font-[poppins] font-bold tracking-wide">
                            {state.businessData?.businessName}
                        </span>
                    </div>
                    <div className="font-[poppins] tracking-wide text-sm mt-1 text-gray-600">
                        Category: <span className="text-black">{state.businessData?.category}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <button
                        disabled={state.loading}
                        onClick={disconnectFB}
                        className="flex justify-center items-center w-full bg-red-700 hover:bg-red-800 text-white p-3 rounded-md"
                    >
                        {state.loading ? (<TailSpin visible={true}
                            height="24"
                            width="24"
                            color="#FFFFFF"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperClass="" />) : "Delete Integration"}

                    </button>
                    <button
                        onClick={fetchConversations}
                        className="w-full bg-[#1E4D91] hover:bg-blue-900 text-white p-3 rounded-md"
                    >
                        Reply To Messages
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
