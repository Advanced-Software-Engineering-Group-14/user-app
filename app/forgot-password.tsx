import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import LoginForm from '../src/forms/login-form'
import Button from '../src/components/ui/button'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../src/styles/colors';
import Heading from '../src/components/hierarchy/text/heading';
import Body from '../src/components/hierarchy/text/body';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import * as SecureStore from "expo-secure-store"
import { ForgotStoreType } from '../src/types';
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Controller,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { RESET_PASSWORD, SEND_VERIFICATION_CODE, VERIFY_CODE } from '../src/utils/server/auth';
import { TextInput } from '../src/components/hierarchy/input/text-input';
import Loader from '../src/components/core/loading';
import { router, Link } from 'expo-router';
const schemas = {
    sendCode: z.object({
        email: z.string().email({
            message: "Please enter a valid email"
        }).min(8, {
            message: "Please enter more than 8 characters"
        }),
    }),
    verifyCode: z.object({
        code: z.string().min(6, {
            message: "Enter 6 characters"
        }).max(6, "Enter 6 characters"),
    }),
    resetPassword: z.object({
        newPassword: z.string().min(6, {
            message: "Please enter more than 6 characters"
        }),
        rNewPassword: z.string(),
    }).refine((data) => data.newPassword === data.rNewPassword, {
        message: "Passwords don't match",
        path: ["rNewPassword"], // path of error
    }),
}



const ForgotPasswordScreen = () => {
    const [forgotStore, setForgotStore] = useState<ForgotStoreType>({ username: "", tab: "send-code", token: "" });

    const forms = {
        sendCode: useForm<z.infer<typeof schemas.sendCode>>({
            resolver: zodResolver(schemas.sendCode),
            defaultValues: {
                email: "",
            },
        }),
        verifyCode: useForm<z.infer<typeof schemas.verifyCode>>({
            resolver: zodResolver(schemas.verifyCode),
            defaultValues: {
                code: "",
            },
        }),
        resetPassword: useForm<z.infer<typeof schemas.resetPassword>>({
            resolver: zodResolver(schemas.resetPassword),
            defaultValues: {
                newPassword: "",
                rNewPassword: "",
            },
        }),
    }

    const mutations = {
        sendCode: async (values: z.infer<typeof schemas.sendCode>) => {
            const info = {
                email: values.email,
            }
            // console.log(info)

            try {
                const result = await SEND_VERIFICATION_CODE(info)

                console.log("result: ", result)
                if (result?._id) {
                    await SecureStore.setItemAsync("forgot-store", JSON.stringify({
                        tab: "verify-code",
                        username: values.email,
                        token: ""
                    }))


                    setForgotStore({
                        tab: "verify-code",
                        username: values.email,
                        token: ""
                    })

                } else {
                    Alert.alert("Something went wrong")
                }

            } catch (error) {
                console.log("function error", error)
                Alert.alert("Something went wrong")
            }
            return
        },
        verifyCode: async (values: z.infer<typeof schemas.verifyCode>) => {
            const info = {
                code: values.code,
                email: forgotStore?.username || ""
            }

            try {
                const result = await VERIFY_CODE(info)

                if (result?._id) {
                    await SecureStore.setItemAsync("forgot-store", JSON.stringify({
                        tab: "reset-password",
                        username: info.email,
                        token: ""
                    }))

                    setForgotStore({
                        tab: "reset-password",
                        username: info.email,
                        token: ""
                    })


                } else {
                    Alert.alert("Something went wrong")
                }

            } catch (error) {
                Alert.alert("Something went wrong")
            }

            return
        },
        resetPassword: async (values: z.infer<typeof schemas.resetPassword>) => {
            const info = {
                newPassword: values.newPassword,
                email: forgotStore?.username || ""
            }

            try {
                const result = await RESET_PASSWORD(info)

                if (result?._id) {
                    await SecureStore.setItemAsync("forgot-store", JSON.stringify({
                        tab: "send-code",
                        username: "",
                        token: ""
                    }))

                    return router.replace("/login")


                } else {
                    Alert.alert("Something went wrong")
                }

            } catch (error) {
                Alert.alert("Something went wrong")
            }

            return
        },
    }

    const onError = (
        errors: any,
        e: any
    ) => {
        e?.preventDefault()
        console.log(JSON.stringify(errors));
        // Alert.alert('Warning', getReadableValidationErrorMessage(errors));
    };



    useEffect(() => {
        const loadForgotStore = async () => {
            const storeString = await SecureStore.getItemAsync("forgot-store")

            if (storeString) {
                const store: ForgotStoreType = JSON.parse(storeString)

                setForgotStore(store)
            } else {
                await SecureStore.setItemAsync("forgot-store", JSON.stringify(forgotStore))
            }
        }
        loadForgotStore()

    }, []);

    console.log(forgotStore)

    if (forms.resetPassword.formState.isLoading || forms.resetPassword.formState.isSubmitting || forms.sendCode.formState.isLoading || forms.sendCode.formState.isSubmitting || forms.verifyCode.formState.isLoading || forms.verifyCode.formState.isSubmitting) {
        return <Loader />
    }

    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <View style={styles.backButtonWrapper}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon size={32} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View>
                    <View style={{
                        marginBottom: 28
                    }}>
                        <Heading text={["send-code", "verify-code"].includes((forgotStore as any).tab) ? "Forgot your password?" : "Update your password"} />
                        <Body text={forgotStore?.tab === "send-code"
                            ? "Enter your email address to receive an email with a verification code."
                            : (forgotStore?.tab === "verify-code" ? `Enter the 6 digit code sent to your email address (${forgotStore?.username})`
                                : `Hello ${forgotStore?.username}, kindly enter a new password to use with your account`)} />
                    </View>

                    {/* SEND CODE FORM */}
                    {
                        forgotStore?.tab === "send-code" && (
                            <View style={styles.root}>
                                <FormProvider {...forms.sendCode}>
                                    <Controller
                                        control={forms.sendCode.control}
                                        name="email"
                                        render={({
                                            field: { onChange, onBlur, value },
                                            fieldState: { error },
                                        }) => {
                                            return (
                                                <TextInput
                                                    label="Email"
                                                    onBlur={onBlur}
                                                    value={value}
                                                    keyboardType='email-address'
                                                    onChangeText={onChange}
                                                    errorMessage={error?.message}
                                                />
                                            );
                                        }}
                                    />
                                    <View style={styles.spacing} />

                                    <View style={styles.spacing} />
                                    <View style={styles.linkWrapper}>
                                        <TouchableOpacity onPress={() => router.replace("/register")}>
                                            <Text style={styles.link}>
                                                Don't have an account? Register
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => router.replace("/login")}>
                                            <Text style={styles.link}>
                                                Remember Password?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.spacing} />


                                    <Button disabled={forms.sendCode.formState.isLoading || forms.sendCode.formState.isSubmitting} action={forms.sendCode.handleSubmit(mutations.sendCode, onError)} full label="Continue" />


                                </FormProvider>
                            </View>
                        )
                    }

                    {/* VERIFY CODE FORM */}
                    {
                        forgotStore?.tab === "verify-code" && (
                            <View style={styles.root}>
                                <FormProvider {...forms.verifyCode}>
                                    <Controller
                                        control={forms.verifyCode.control}
                                        name="code"
                                        render={({
                                            field: { onChange, onBlur, value },
                                            fieldState: { error },
                                        }) => {
                                            return (
                                                <TextInput
                                                    label="Code"
                                                    onBlur={onBlur}
                                                    value={value}
                                                    keyboardType='number-pad'
                                                    onChangeText={onChange}
                                                    errorMessage={error?.message}
                                                />
                                            );
                                        }}
                                    />
                                    <View style={styles.spacing} />

                                    <View style={styles.spacing} />
                                    <View style={styles.linkWrapper}>
                                    <TouchableOpacity onPress={() => router.replace("/register")}>
                                            <Text style={styles.link}>
                                                Don't have an account? Register
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => router.replace("/login")}>
                                            <Text style={styles.link}>
                                                Remember Password?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.spacing} />


                                    <Button disabled={forms.verifyCode.formState.isLoading || forms.verifyCode.formState.isSubmitting} action={forms.verifyCode.handleSubmit(mutations.verifyCode, onError)} full label="Continue" />


                                </FormProvider>
                            </View>
                        )
                    }

                    {/* RESET PASSWORD FORM */}
                    {
                        forgotStore?.tab === "reset-password" && (
                            <View style={styles.root}>
                                <FormProvider {...forms.resetPassword}>
                                    <Controller
                                        control={forms.resetPassword.control}
                                        name="newPassword"
                                        render={({
                                            field: { onChange, onBlur, value },
                                            fieldState: { error },
                                        }) => {
                                            return (
                                                <TextInput
                                                    secureTextEntry
                                                    label="New Password"
                                                    onBlur={onBlur}
                                                    value={value}
                                                    onChangeText={onChange}
                                                    errorMessage={error?.message}
                                                />
                                            );
                                        }}
                                    />
                                    <View style={styles.spacing} />
                                    <Controller
                                        control={forms.resetPassword.control}
                                        name="rNewPassword"
                                        render={({
                                            field: { onChange, onBlur, value },
                                            fieldState: { error },
                                        }) => {
                                            return (
                                                <TextInput
                                                    secureTextEntry
                                                    label="Confirm New Password"
                                                    onBlur={onBlur}
                                                    value={value}
                                                    onChangeText={onChange}
                                                    errorMessage={error?.message}
                                                />
                                            );
                                        }}
                                    />
                                    <View style={styles.spacing} />
                                    <View style={styles.linkWrapper}>
                                    <TouchableOpacity onPress={() => router.replace("/register")}>
                                            <Text style={styles.link}>
                                                Don't have an account? Register
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => router.replace("/login")}>
                                            <Text style={styles.link}>
                                                Remember Password?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.spacing} />


                                    <Button disabled={forms.resetPassword.formState.isLoading || forms.resetPassword.formState.isSubmitting} action={forms.resetPassword.handleSubmit(mutations.resetPassword, onError)} full label="Continue" />


                                </FormProvider>
                            </View>
                        )
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 16,
        justifyContent: "center"
    },
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    backButtonWrapper: {
        padding: 10,

    },
    root: {
        // flex: 1,
        // paddingVertical: 10,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    errorMessageText: {
        color: COLORS.destructive,
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
    },
    spacing: {
        marginBottom: 10,
    },
    link: {
        fontSize: 12,
    },
    linkWrapper: {
        width: "100%",
        paddingHorizontal: 4,
        justifyContent: 'space-between',
        flexDirection: "row",
    }
})

export default ForgotPasswordScreen