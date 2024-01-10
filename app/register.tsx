import { StyleSheet, TouchableOpacity, View } from "react-native";
import Heading from "../src/components/hierarchy/text/heading";
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from "../src/components/ui/button";
import { COLORS } from "../src/styles/colors";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import Body from "../src/components/hierarchy/text/body";
import RegisterForm from "../src/forms/register-form";
import { router } from 'expo-router';
import BackButton from "../src/components/ui/back-button";

export default function RegisterScreen() {
    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <View style={styles.container}>
                <BackButton />


                <View style={styles.container}>
                    <View>
                        <View>
                            <Heading text="Register an account" />
                            <Body text="Create an account to get started with Wastify. " />
                        </View>
                        <RegisterForm />
                    </View>
                </View>

            </View>
        </SafeAreaView >
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
