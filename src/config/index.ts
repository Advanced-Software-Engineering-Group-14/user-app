const config = {
    api: {
        base: process.env.EXPO_APP_BASE_API_URL || "https://wastify-server.onrender.com/api/",
        local: process.env.EXPO_APP_LOCAL_API_URL || "http://localhost:8000/api/",
    },
    auth: {
        tokenKey: "token"
    },
    paystack: {
        secret: "sk_test_286e76145d63ce71256505856eaf9860afde0f39",
        public: "pk_test_f2ebb5ec7a19697c6af2f0a6330e28bc7b6ebbdf"
    }
}

export default config