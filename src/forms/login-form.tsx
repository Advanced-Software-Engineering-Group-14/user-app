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
import { LoginFormSchema, loginFormSchema } from './schema';
import { COLORS } from '../styles/colors';
import Button from '../components/ui/button';
import Loader from '../components/core/loading';
import { getReadableValidationErrorMessage } from '../utils/functions';
import { Link, router } from 'expo-router';

export default function LoginForm() {
    const { onLogin } = useAuth()
    const methods = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<LoginFormSchema> = async ({ email, password }) => {
        // console.log(JSON.stringify(data));
        const result = await onLogin!(email, password)
        if (result && result.error) {
            console.log(result?.data)
            Alert.alert("Oops!", result.message)
        }
        // navigation.navigate("Home")
    };

    const onError: SubmitErrorHandler<LoginFormSchema> = (errors, e) => {
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
                        <Controller
                            control={methods.control}
                            name="password"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        secureTextEntry
                                        label="Password"
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
                            <Link asChild href="/register">
                                <TouchableOpacity>
                                    <Text style={styles.link}>
                                        Don't have an account? Register
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                            <Link asChild href="/forgot-password">
                                <TouchableOpacity>
                                    <Text style={styles.link}>
                                    Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                           
                        </View>
                        <View style={styles.spacing} />


                        <Button disabled={methods.formState.isLoading || methods.formState.isSubmitting} action={methods.handleSubmit(onSubmit, onError)} full label="Continue" />


                    </FormProvider>
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



