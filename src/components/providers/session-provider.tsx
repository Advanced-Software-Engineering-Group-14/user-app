import React, { useState } from 'react';
import { useStorageState } from '../../hooks/use-storage-state';
import * as SecureStore from 'expo-secure-store';
import { HomeownerRes } from '../../types';
import { LOGIN_USER } from '../../utils/server/auth';
import config from '../../config';
import axios from 'axios';
import { REGISTER_USER, VerifyCodeInput, SEND_VERIFICATION_CODE, VERIFY_HOMEOWNER_EMAIL, COMPLETE_PROFILE } from '../../utils/server/homeowner';
import { CompleteProfileFormSchema } from '../../forms/schema';

export type ForgotStoreType = {
    username?: string
    tab: "send-code" | "verify-code" | "reset-password"
    token?: string
}

type RegisterInput = {
    email: string
    surname: string
    othernames: string
    gender: "MALE" | "FEMALE",
    phone: string
    password: string
}

export type PromiseError = {
    error: boolean
    message: string
}

type HomeownerResError = HomeownerRes & PromiseError

interface AuthProps {
    register: (info: RegisterInput) => Promise<HomeownerRes | null>
    signIn: (email: string, password: string) => Promise<HomeownerRes | PromiseError | null>;
    signOut: () => Promise<void | null>;
    verify: (info: VerifyCodeInput) => Promise<HomeownerResError | PromiseError  | null>;
    completeProfile: (info: CompleteProfileFormSchema) => Promise<HomeownerRes| PromiseError  | null>
    session?: string | null;
    forgotStore?: string | null
    isLoading: boolean;
    user: HomeownerRes | null
}

const AuthContext = React.createContext<AuthProps>({
    signIn: async () => null,
    signOut: async () => null,
    register: async () => null,
    verify: async () => null,
    completeProfile: async () => null,
    session: null,
    isLoading: false,
    forgotStore: null,
    user: null,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[forgotStoreLoading, forgotStore], setForgotStore] = useStorageState("forgot-store")
    const [user, setUser] = useState<HomeownerRes | null>(null)

    React.useEffect(() => {
        const loadForgotStore = async () => {
            const storeString = await SecureStore.getItemAsync("forgot-store")

            if (!storeString) {
                await SecureStore.setItemAsync("forgot-store", JSON.stringify({ username: "", tab: "send-code", token: "" }))
            }
            setForgotStore(storeString)
        }
        loadForgotStore()
    }, [])

    const onRegister = async (info: RegisterInput) => {
        try {
            const result = await REGISTER_USER(info)


            await SecureStore.setItemAsync("user", JSON.stringify(result))

            setUser(result)
            setSession(JSON.stringify(result))

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`

            return result

        } catch (error) {
            return { error: true, message: (error as any).response?.data?.message }
        }
    }

    const onVerify = async (info: VerifyCodeInput) => {
        try {
            const result = await VERIFY_HOMEOWNER_EMAIL(info)


            await SecureStore.setItemAsync("user", JSON.stringify(result))

            setUser(result)
            setSession(JSON.stringify(result))

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`

            return result

        } catch (error) {
            return { error: true, message: (error as any).response?.data?.message as string}
        }
    }

    const onCompleteProfile = async (info: CompleteProfileFormSchema) => {
        try {
            const result = await COMPLETE_PROFILE(info)


            await SecureStore.setItemAsync("user", JSON.stringify(result))

            setUser(result)
            setSession(JSON.stringify(result))

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`
            
            return result
        } catch (error) {
            return { error: true, message: (error as any).response?.data?.message as string}
        }
    }

    const onLogin = async (email: string, password: string) => {
        console.log(email, password)
        try {
            const result = await LOGIN_USER({
                email,
                password,
            })

            console.log("auth-context", result)
            setUser(result)

            setSession(JSON.stringify(result))


            axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`

            await SecureStore.setItemAsync(config.auth.tokenKey, result?.token || "")
            await SecureStore.setItemAsync("user", JSON.stringify(result))

            return result
        } catch (error: any) {
            console.log(error?.response?.data)
            return { error: true, message: (error as any).response?.data?.message as string }
        }
    }


    const onLogout = async () => {
        // Delete token from storage
        await SecureStore.deleteItemAsync("user")

        // Update the HTTP axios header
        axios.defaults.headers.common["Authorization"] = ""

        // Update auth state
        setSession(null)
        setUser(null)

    }

    const value: AuthProps = {
        isLoading,
        session,
        user,
        register: onRegister,
        signIn: onLogin,
        signOut: onLogout,
        verify: onVerify,
        completeProfile: onCompleteProfile,
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}
