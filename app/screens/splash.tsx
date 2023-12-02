import { View, Text, Dimensions, StyleSheet } from "react-native";
import { ChevronLeftIcon, TrashIcon } from "react-native-heroicons/outline";
import { COLORS } from "../styles/colors";
import Heading from "../components/hierarchy/text/heading";


export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <View>
            <TrashIcon size={82} color={COLORS.black} />

            </View>
           <Heading text="Wastify" />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        weight: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    }
})