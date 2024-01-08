import { StyleSheet, TouchableOpacity, View } from "react-native";
import Heading from "../components/hierarchy/text/heading";
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from "../components/ui/button";
import { COLORS } from "../styles/colors";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import Body from "../components/hierarchy/text/body";
import RegisterForm from "../forms/register-form";


export default function RegisterScreen({ navigation }: { navigation: any }) {
    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.backButtonWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Intro')}>
                    <ChevronLeftIcon size={32} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View>
                    <View>
                        <Heading text="Register an account" />
                        <Body text="Create an account to get started with Wastify. " />
                    </View>
                    <RegisterForm navigation={navigation} />
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
