import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios"
import * as SecureStore from "expo-secure-store"
import config from "../config";
import { LOGIN_USER, SEND_VERIFICATION_CODE } from "../utils/server/auth";
import { REGISTER_USER } from "../utils/server/homeowner";
import { HomeownerRes } from "../types";


type RegisterInput = {
    email: string
    surname: string
    othernames: string
    gender: "MALE" | "FEMALE",
    phone: string
    password: string
}

interface AuthProps {
    authState?: {
        token: string | null
        authenticated: boolean | null
        user: HomeownerRes | null

    }
    onRegister?: (info: RegisterInput) => Promise<any>
    onLogin?: (email: string, password: string) => Promise<any>
    onLogout?: () => Promise<any>
}

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

type AuthTypeArg = {
    token: string | null
    authenticated: boolean | null
    user: HomeownerRes | null
}

export type ForgotStoreType = {
    username?: string
    tab: "send-code" | "verify-code" | "reset-password"
    token?: string
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthTypeArg>({
        token: null,
        authenticated: null,
        user: null
    })

    const [forgotStore, setForgotStore] = useState<ForgotStoreType>({ username: "", tab: "send-code", token: "" });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(config.auth.tokenKey)
            const localUser = await SecureStore.getItemAsync("user")
            // console.log("stored-token", token);

            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

                setAuthState({
                    token,
                    authenticated: true,
                    user: localUser && JSON.parse(localUser)
                })
            }

        }

        const loadForgotStore = async () => {
            const storeString = await SecureStore.getItemAsync("forgot-store")

            if (storeString) {
                const store: ForgotStoreType = JSON.parse(storeString)

                setForgotStore(store)
            } else {
                await SecureStore.setItemAsync("forgot-store", JSON.stringify(forgotStore))
            }
        }

        loadToken()
        loadForgotStore()
    }, []);

    const register = async (info: RegisterInput) => {
        try {
            const result = await REGISTER_USER(info)


            await SecureStore.setItemAsync("user", JSON.stringify(result))


            setAuthState({
                token: result.token,
                authenticated: true,
                user: result
            })

            return result

        } catch (error) {
            return { error: true, message: (error as any).response?.data?.message }
        }
    }

    const login = async (email: string, password: string) => {
        console.log(email, password)
        try {
            const result = await LOGIN_USER({
                email,
                password,
            })

            console.log("auth-context", result)

            setAuthState({
                token: result.token,
                authenticated: true,
                user: result
            })

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`

            await SecureStore.setItemAsync(config.auth.tokenKey, result?.token || "")
            await SecureStore.setItemAsync("user", JSON.stringify(result))

            return result
        } catch (error: any) {
            console.log(error?.response?.data)
            return { error: true, message: (error as any).response?.data?.message }
        }
    }

    const logout = async () => {
        // Delete token from storage
        await SecureStore.deleteItemAsync(config.auth.tokenKey)
        await SecureStore.deleteItemAsync("user")

        // Update the HTTP axios header
        axios.defaults.headers.common["Authorization"] = ""

        // Update auth state
        setAuthState({
            token: null,
            authenticated: null,
            user: null
        })
    }



    const value: AuthProps = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}