import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import DropdownSelect from 'react-native-input-select';
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
import { RegisterFormSchema, registerFormSchema } from './schema';
import { COLORS } from '../styles/colors';
import Button from '../components/ui/button';
import Loader from '../components/core/loading';
import { getReadableValidationErrorMessage } from '../utils/functions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SelectInput } from '../components/hierarchy/input/select-input';
import { router } from 'expo-router';
import { useSession } from '../components/providers/session-provider';

export default function RegisterForm() {
    const { register } = useSession()
    const methods = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<RegisterFormSchema> = async (values) => {
        // console.log(JSON.stringify(data));
        try {
            const result = await register!(values)
            router.replace("/")
            return
        } catch (error: any) {
            Alert.alert("Oops!", error.message)
            return
        }
    };

    const onError: SubmitErrorHandler<RegisterFormSchema> = (errors, e) => {
        e?.preventDefault()
        console.log(JSON.stringify(errors));
        Alert.alert('Warning', getReadableValidationErrorMessage(errors));
    };

    if (methods.formState.isLoading || methods.formState.isSubmitting) {
        return <Loader />
    }


    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>

            <KeyboardAwareScrollView>

                {/* <Loader loading={methods.formState.isLoading || methods.formState.isSubmitting} /> */}

                <View style={styles.root}>
                    <FormProvider {...methods}>
                        <Controller
                            control={methods.control}
                            name="surname"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="Surname"
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={onChange}
                                        errorMessage={error?.message}
                                        autoCapitalize='words'
                                    />
                                );
                            }}
                        />
                        <View style={styles.spacing} />
                        <Controller
                            control={methods.control}
                            name="othernames"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="Othernames"
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={onChange}
                                        errorMessage={error?.message}
                                        autoCapitalize='words'

                                    />
                                );
                            }}
                        />
                        <View style={styles.spacing} />
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
                            name="phone"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="Phone number"
                                        onBlur={onBlur}
                                        value={value}
                                        onChangeText={onChange}
                                        keyboardType='number-pad'
                                        errorMessage={error?.message}
                                    />
                                );
                            }}
                        />
                        <View style={styles.spacing} />

                        <Controller
                            control={methods.control}
                            name="gender"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <SelectInput
                                        // label="Gender"
                                        placeholder="Select a gender..."
                                        options={[
                                            { name: 'MALE', id: 'MALE' },
                                            { name: 'FEMALE', id: 'FEMALE' },
                                        ]}
                                        optionLabel={'name'}
                                        optionValue={'id'}
                                        selectedValue={value}
                                        onValueChange={onChange}
                                        error={!value ? "Gender is required" : ""}

                                    />
                                );
                            }}
                        />
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
                            <TouchableOpacity onPress={() => router.replace("/login")}>
                                <Text style={styles.link}>
                                    Have have an account? Login
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.spacing} />


                        <Button disabled={methods.formState.isLoading || methods.formState.isSubmitting} action={methods.handleSubmit(onSubmit, onError)} full label="Continue" />


                    </FormProvider>
                </View>
            </KeyboardAwareScrollView>
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



