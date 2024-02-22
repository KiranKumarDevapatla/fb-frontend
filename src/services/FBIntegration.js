export const checkIntegration = () => {
    const response = () => {
        window.FB.getLoginStatus((response) => {
            return response.json();
        });
    };
    if (response.status === "connected") {
        return {
            status: true,
            authResponse: response.authResponse,
        };
    } else {
        return {
            status: false,
            authResponse: null,
        };
    }
};
