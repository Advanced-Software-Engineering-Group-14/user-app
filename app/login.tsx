import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LoginForm from '../src/forms/login-form'
import Button from '../src/components/ui/button'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../src/styles/colors';
import Heading from '../src/components/hierarchy/text/heading';
import Body from '../src/components/hierarchy/text/body';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { router } from 'expo-router';
import BackButton from '../src/components/ui/back-button';

const Login = () => {
    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <BackButton />
         

            <View style={styles.container}>
                <View>
                    <View>
                        <Heading text="Log into your account" />
                        <Body text="Enter your credentials to access your dashboard" />
                    </View>
                    <LoginForm  />
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

    }
})

export default Login