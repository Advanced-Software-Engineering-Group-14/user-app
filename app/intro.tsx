import { StyleSheet, View } from "react-native";
import Heading from "../src/components/hierarchy/text/heading";
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from "../src/components/ui/button";
import { COLORS } from "../src/styles/colors";


export default function IntroScreen() {
    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Heading styles={styles.heading} text="Wastify" />
                    <Button
                        variant="secondary"
                        full
                        label="Login"
                        link="/login"
                    />
                    <Button
                        full
                        link="/register"
                        variant="outline"
                        label="Sign Up"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        // paddingBottom: "",
    },
    safeArea: {
        // flex: 1,
        backgroundColor: COLORS.white,
    },
    wrapper: {
        paddingHorizontal: 10,
        gap: 16,
        width: "100%",
        marginBottom: 40
    },
    heading: {
        textAlign: "center",
        fontSize: 48,
        marginBottom: 10,
    }
})