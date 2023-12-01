import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../styles/colors";


type Props = {
    action?: ((p: any) => void) | (() => void)
    label: string
    disabled?: boolean
    variant?: "default" | "outline" | "secondary" | "destructive" | "primary"
    full?: boolean
    type?: string
}

export default function Button({ action, label, disabled, variant, full }: Props) {

    const buttonStyles = styles[variant || "default"]

    return (
        <TouchableOpacity style={{
            ...buttonStyles,
            width: full ? "100%" : "auto",
        }} onPress={action} disabled={disabled || false} >
            <Text style={{
                color: (!variant ? COLORS.white : (variant === "default" || variant === "destructive" || variant === "primary" ? COLORS.white : COLORS.black)),
                textAlign: "center"

            }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    default: {
        backgroundColor: COLORS.black,
        borderColor: COLORS.black,
        paddingHorizontal: 20,
        paddingVertical: 22,
        borderRadius: 20,
    },
    outline: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.black,
        paddingHorizontal: 20,
        paddingVertical: 22,
        borderRadius: 20,
        borderWidth: 1,
    },
    primary: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 22,
        borderRadius: 20,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
        paddingHorizontal: 20,
        paddingVertical: 22,
        borderRadius: 20,
    },
    destructive: {
        backgroundColor: COLORS.destructive,
        borderColor: COLORS.destructive,
        paddingHorizontal: 20,
        paddingVertical: 22,
        borderRadius: 20,
    }

})