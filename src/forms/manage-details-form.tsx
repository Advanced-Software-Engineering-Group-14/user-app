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
import { ManageDetailsFormSchema, manageDetailsFormSchema } from './schema';
import { COLORS } from '../styles/colors';
import Button from '../components/ui/button';
import Loader from '../components/core/loading';
import { getReadableValidationErrorMessage } from '../utils/functions';
import { Link, Redirect, router } from 'expo-router';
import { PromiseError, useSession } from '../components/providers/session-provider';
import Body from '../components/hierarchy/text/body';
import { SEND_VERIFICATION_CODE } from '../utils/server/homeowner';
import { SelectInput } from '../components/hierarchy/input/select-input';


export default function ManageDetailsForm() {
    const { user, signOut, manageDetails } = useSession()

    if (!user) {
        return <Redirect href="/login" />
    }

    const methods = useForm<ManageDetailsFormSchema>({
        resolver: zodResolver(manageDetailsFormSchema),
        mode: 'onBlur',
        defaultValues: {
            othernames: user?.othernames || "",
            surname: user?.surname || "",
            phone: user?.phone || "",
            gender: user?.gender || "MALE",
            residence: user?.residence || "",
            idType: user?.identification?.idType || "COUNTRY",
            idNo: user?.identification?.no || ""
        }
    });

 

    const onSubmit: SubmitHandler<ManageDetailsFormSchema> = async (values) => {
        // console.log(JSON.stringify(data));

        try {
            const result = await manageDetails!(values)
            router.replace("/")
        } catch (error: any) {
            Alert.alert("Oops!", error.message)
            return
        }
  
    };

    const onError: SubmitErrorHandler<ManageDetailsFormSchema> = (errors, e) => {
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
                            name="residence"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="Residence"
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
                            name="idType"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <SelectInput
                                        // label="Gender"
                                        placeholder="Select an ID type..."
                                        options={[
                                            { name: 'Voters ID', id: 'VOTER' },
                                            { name: 'Ghana Card', id: 'COUNTRY' },
                                            { name: 'Drivers License', id: 'DRIVER' },
                                        ]}
                                        optionLabel={'name'}
                                        optionValue={'id'}
                                        selectedValue={value}
                                        onValueChange={onChange}
                                        error={!value ? "ID Type is required" : ""}

                                    />
                                );
                            }}
                        />
                        <Controller
                            control={methods.control}
                            name="idNo"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => {
                                return (
                                    <TextInput
                                        label="ID Number"
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




                        <Button disabled={methods.formState.isLoading || methods.formState.isSubmitting} action={methods.handleSubmit(onSubmit, onError)} full label="Continue" />


                        


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



