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
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { TextInput } from '../components/hierarchy/input/text-input';
import { useAuth } from '../context/auth-context';
import { VerifyEmailFormSchema, verifyEmailFormSchema } from './schema';
import { COLORS } from '../styles/colors';
import Button from '../components/ui/button';
import Loader from '../components/core/loading';
import { getReadableValidationErrorMessage } from '../utils/functions';
import { Link, Redirect, router } from 'expo-router';
import { useSession } from '../components/providers/session-provider';
import Body from '../components/hierarchy/text/body';
import { SEND_VERIFICATION_CODE } from '../utils/server/homeowner';

export default function VerifyEmailForm() {
    const { verify, user, signOut } = useSession()

    if (!user) {
        return <Redirect href="/login" />
    }
    const methods = useForm<VerifyEmailFormSchema>({
        resolver: zodResolver(verifyEmailFormSchema),
        mode: 'onBlur',
        defaultValues: {
            email: user?.email || "",
            code: ""
        }
    });

    const resendCode = async () => {
        const info = {
            email: user?.email || ""
        }

        console.log(user)

        try {
            const result = await SEND_VERIFICATION_CODE(info)
            return Alert.alert("Response!", "A new code has been sent")
        } catch (error: any) {
            console.log("result", error)
            Alert.alert("Response!", error?.response.data?.message)

        }

    }

    const onSubmit: SubmitHandler<VerifyEmailFormSchema> = async (values) => {
        // console.log(JSON.stringify(data));
        const result = await verify!(values)
        if (result && result.error) {
            console.log(result)
            Alert.alert("Oops!", result.message)
            return
        }
        router.replace("/")
    };

    const onError: SubmitErrorHandler<VerifyEmailFormSchema> = (errors, e) => {
        e?.preventDefault()
        console.log(JSON.stringify(errors));
        Alert.alert('Warning', getReadableValidationErrorMessage(errors));
    };

    if (methods.formState.isLoading || methods.formState.isSubmitting) {
        return <Loader />
    }


    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>

            <ScrollView>

                {/* <Loader loading={methods.formState.isLoading || methods.formState.isSubmitting} /> */}

                <View style={styles.root}>
                    <FormProvider {...methods}>
                        <Controller
                            control={methods.control}
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
                        <TouchableOpacity onPress={resendCode}>
                            <Text style={styles.link}>
                                Resend Code
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />



                        <Button disabled={methods.formState.isLoading || methods.formState.isSubmitting} action={methods.handleSubmit(onSubmit, onError)} full label="Continue" />


                        <View style={styles.spacing} />
                        <Body text="or" />

                        <View style={styles.spacing} />


                    </FormProvider>
                    <Button variant='outline' full type='button' action={signOut} label='Logout' />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    root: {
        // flex: 1,
        // paddingVertical: 10,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    safeArea: {
        // flex: 1,
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



