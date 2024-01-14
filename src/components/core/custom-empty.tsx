import { View, Text, StyleSheet } from "react-native"
import { RectangleGroupIcon } from "react-native-heroicons/outline";
import { COLORS } from "../../styles/colors";

type Props = {
    title?: string
}

export default function CustomEmpty({ title }: Props) {
    return (
        <View style={styles.container}>
            <View>
                <RectangleGroupIcon strokeWidth={1} size={78} color={COLORS.black} />
            </View>
            <Text style={styles.text}>
                There {title ? "were" : "was"} no {title || "data"} found
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        flex: 1,
    },
    text: {
        fontSize: 16
    }
})