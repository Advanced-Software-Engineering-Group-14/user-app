import { Link, router } from "expo-router";
import { IconProps } from "../../types";
import { Text, View, StyleSheet, DimensionValue, TouchableOpacity } from "react-native";
import { COLORS } from "../../styles/colors";

type ActionLinkProps = {
    href: string
    icon: ({ size, ...props }: IconProps) => JSX.Element
    text: string
    color?: string
}

export default function ActionLink({ href, icon: Icon, text, color }: ActionLinkProps) {
    return (
     
            <TouchableOpacity onPress={() => router.replace(href)} style={{
                ...styles.container,
                backgroundColor: color || COLORS.black,
                borderColor: color || COLORS.black,

            }}>
                <Icon size={32} color={COLORS.white} />
                <Text style={styles.title}>
                    {text}
                </Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 0,
        width: "90%",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        padding: 20,
        borderRadius: 16,
        // minWidth: "100%"
    },
    title: {
        fontSize: 13,
        fontWeight: "400",
        textAlign: "center",
        color: COLORS.white
    },
    actionContainer: {
        flexDirection: "row",
        gap: 8,
    }

})