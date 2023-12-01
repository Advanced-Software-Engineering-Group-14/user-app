const config = {
    api: {
        base: process.env.EXPO_APP_BASE_API_URL || "https://wastify-server.onrender.com/api/",
        local: process.env.EXPO_APP_LOCAL_API_URL || "http://localhost:8000/api/",
    },
    auth: {
        tokenKey: "token"
    }
}

export default config