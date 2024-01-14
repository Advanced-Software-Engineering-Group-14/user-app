import { Text, View, StyleSheet } from "react-native"
import { PickupStatus } from "../../types"
import _ from "lodash"
import { COLORS } from "../../styles/colors"

type Props = {
    status: PickupStatus
}

export default function PickupStatusBadge({ status }: Props) {
    const colorsMap = {
        "pending": "#585a5c",
        "assigned": "#fcba03",
        "ongoing": "#2085f7",
        "completed": COLORS.primary,
        "cancelled": COLORS.destructive,
        "paid": "#b603fc",

    }
    return (
        <View style={styles.container} >
            <View style={{
                ...styles.brick,
                backgroundColor: colorsMap[status]
            }}>

            </View>
            <Text style={{
                ...styles.text,
                color: colorsMap[status],
            }}>
                {_.toUpper(status)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: "100%",
        flex: 1,
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        // justifyContent

    },
    brick: {
        width: 20,
        height: 20,
        aspectRatio: "1/1",
        borderRadius: 4,
    },
    text: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: "500"
    }
})