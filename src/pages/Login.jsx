import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "..";
import { userLogin } from "../services/AuthServices";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
    const navigate = useNavigate();

    const { state, dispatch } = useContext(AppContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);

    // const setTestUser = () => {
    //     setForm({
    //         email: "test@email.com",
    //         password: "test123",
    //     });
    // };

    const handleLogin = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await userLogin(form, rememberMe);
        dispatch({ type: "UPDATE_USER_SESSION", payload: response });
        dispatch({ type: "SET_LOADING", payload: false });
        if (response.token) {
            navigate("/connect");
        }
    };

    return (
        <div className="flex h-screen bg-[#1E4D91] items-center justify-center font-[raleway]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Login to your account
                </h1>
                <div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            placeholder="email@gmail.com"
                            type="email"
                            className="w-full border border-gray-400 p-2 rounded-md"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: String(e.target.value) })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            placeholder="**********"
                            type="password"
                            className="w-full border border-gray-400 p-2 rounded-md"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: String(e.target.value) })
                            }
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex justify-between items-center gap-0.5">
                            <input
                                type="checkbox"
                                id="remember-me"
                                value={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label
                                className="ml-2 block text-sm text-gray-900"
                                htmlFor="remember-me"
                            >
                                Remember Me
                            </label>
                        </div>
                        {/* <div
                            onClick={setTestUser}
                            className="text-xs bg-orange-100 hover:bg-orange-200 cursor-pointer rounded-md px-1 py-0.5"
                        >
                            Test Credentials
                        </div> */}
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            disabled={state.loading}
                            onClick={handleLogin}
                            className="flex justify-center items-center w-full bg-[#1E4D91] hover:bg-blue-900 text-white p-3 rounded-md"
                        >
                            {state.loading ? (<TailSpin visible={true}
                                height="24"
                                width="24"
                                color="#FFFFFF"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperClass="" />) : "Login"}

                        </button>
                        <div className="flex justify-center items-center gap-1 mt-4 text-sm text-gray-600">
                            New to Helpdesk?{" "}
                            <div
                                onClick={() => navigate("/signup")}
                                className="text-blue-900 hover:underline cursor-pointer"
                                href="#"
                            >
                                Sign Up
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
