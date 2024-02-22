import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../services/AuthServices";
import { AppContext } from "..";
import { TailSpin } from "react-loader-spinner";

const Signup = () => {
    const navigate = useNavigate();

    const { state, dispatch } = useContext(AppContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [rememberMe, setRememberMe] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch({ type: "SET_LOADING", payload: true });

        const response = await userSignup(form, rememberMe);
        dispatch({ type: "UPDATE_USER_SESSION", payload: response });
        dispatch({ type: "SET_LOADING", payload: false });
        if (response.token) {
            navigate("/connect");
        }
    };

    return (
        <div className="flex h-screen bg-[#1E4D91] items-center justify-center font-[raleway]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>
                <form>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            placeholder="Username"
                            type="text"
                            className="w-full border border-gray-400 p-2 rounded-md"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: String(e.target.value) })
                            }
                        />
                    </div>
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
                    <div className="flex items-center mb-6">
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
                    <div className="flex flex-col items-center">
                        <button
                            disabled={state.loading}
                            onClick={(e) => handleSignup(e)}
                            className="flex justify-center items-center w-full bg-[#1E4D91] hover:bg-blue-900 text-white p-3 rounded-md"
                        >
                            {state.loading ? (<TailSpin visible={true}
                                height="24"
                                width="24"
                                color="#FFFFFF"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperClass="" />) : "Sign Up"}
                        </button>
                        <div className="flex justify-center items-center gap-1 mt-4 text-sm text-gray-600">
                            Already have an account?{" "}
                            <div
                                onClick={() => navigate("/login")}
                                className="text-blue-900 hover:underline cursor-pointer"
                                href="#"
                            >
                                Login
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
