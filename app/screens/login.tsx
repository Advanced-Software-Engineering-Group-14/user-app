import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LoginForm from '../forms/login-form'
import Button from '../components/ui/button'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../styles/colors';
import Heading from '../components/hierarchy/text/heading';
import Subheading from '../components/hierarchy/text/subheading';
import Body from '../components/hierarchy/text/body';
import { ChevronLeftIcon } from "react-native-heroicons/outline";


const Login = ({ navigation }: { navigation: any }) => {
    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <View style={styles.backButtonWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Intro')}>
                        <ChevronLeftIcon size={32} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View>
                    <View>
                        <Heading text="Log into your account" />
                        <Body text="Enter your credentials to access your dashboard" />
                    </View>
                    <LoginForm navigation={navigation} />
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