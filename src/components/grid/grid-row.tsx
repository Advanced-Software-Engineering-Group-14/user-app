import { StyleSheet,  View } from 'react-native'

type Props = {
    gap: number
    children: JSX.Element
}

export function GridRow({  gap, children }: Props) {
    return (
        <View style={{
            ...styles.container,
            gap: gap || 16
        }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
    },
})