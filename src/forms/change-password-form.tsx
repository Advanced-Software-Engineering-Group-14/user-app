import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {
    Controller,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import {
    Alert,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { TextInput } from '../components/hierarchy/input/text-input';
import { ChangePasswordFormSchema, changePasswordFormSchema } from './schema';
import { COLORS } from '../styles/colors';
import Button from '../components/ui/button';
import Loader from '../components/core/loading';
import { getReadableValidationErrorMessage } from '../utils/functions';
import {  Redirect, } from 'expo-router';
import {  useSession } from '../components/providers/session-provider';
import { CHANGE_PASSWORD } from '../utils/server/homeowner';
import { useMutation } from '@tanstack/react-query';


export default function ChangePasswordForm() {
    const { user, signOut } = useSession()

    if (!user) {
        return <Redirect href="/login" />
    }
    const methods = useForm<ChangePasswordFormSchema>({
        resolver: zodResolver(changePasswordFormSchema),
        mode: 'onBlur',
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            cnewPassword: "",
        }
    });

    const changePassword = useMutation({
        mutationFn: (values: ChangePasswordFormSchema) => {
            if (user && user.token) {
                return CHANGE_PASSWORD(values)
            }
            throw new Error("Please login again")
        }
    })



    const onSubmit: SubmitHandler<ChangePasswordFormSchema> = async (values) => {
        changePassword.mutate(values, {
            onSuccess: async (newData) => {
                console.log(newData)
                await signOut()
            },
            onError: (error: any) => {
                console.log(error?.response?.data)
                return Alert.alert("Oops!", error?.response?.data?.message || "Couldn't create payment record")
            }
        })

    };

    const onError: SubmitErrorHandler<ChangePasswordFormSchema> = (errors, e) => {
        e?.preventDefault()
        console.log(JSON.stringify(errors));
        Alert.alert('Warning', getReadableValidationErrorMessage(errors));
    };

    if (methods.formState.isLoading || methods.formState.isSubmitting || changePassword.isPending) {
        return <Loader />
    }


    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>

            <ScrollView>
                <View style={styles.root}>
                    <FormProvider {...methods}>
                        <Controller
                            control={methods.control}
                            name="oldPassword"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="Old Password"
                                        secureTextEntry
                                        onBlur={onBlur}
                                        value={value}
                                        keyboardType='ascii-capable'
                                        onChangeText={onChange}
                                        errorMessage={error?.message}
                                    />
                                );
                            }}
                        />
                        <View style={styles.spacing} />
                        <Controller
                            control={methods.control}
                            name="newPassword"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="New Password"
                                        secureTextEntry
                                        onBlur={onBlur}
                                        value={value}
                                        keyboardType='ascii-capable'
                                        onChangeText={onChange}
                                        errorMessage={error?.message}
                                    />
                                );
                            }}
                        />
                        <View style={styles.spacing} />
                        <Controller
                            control={methods.control}
                            name="cnewPassword"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="Confirm New Password"
                                        secureTextEntry
                                        onBlur={onBlur}
                                        value={value}
                                        keyboardType='ascii-capable'
                                        onChangeText={onChange}
                                        errorMessage={error?.message}
                                    />
                                );
                            }}
                        />
                        <View style={styles.spacing} />


                        <Button disabled={methods.formState.isLoading || methods.formState.isSubmitting || changePassword.isPending} action={methods.handleSubmit(onSubmit, onError)} full label="Continue" />
                    </FormProvider>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    safeArea: {
        backgroundColor: 'transparent',
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
});



