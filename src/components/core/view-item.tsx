import _ from "lodash"
import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../../styles/colors"

type Props = {
    label: string
    value: string
}
export default function ViewItem({ label, value }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {_.toUpper(label)}
            </Text>
            <Text style={styles.value}>
                {value}
                {/* {_.capitalize(value)} */}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: "100%"
    },
    label: {
        letterSpacing: -1,
        fontSize: 12,
        color: COLORS.grey,
        fontWeight: "500",
    },
    value: {
        fontSize: 17

    }
})