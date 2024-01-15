import { StyleSheet, Text, View } from 'react-native'

type Props = {
    cols: number
    children: JSX.Element
}

export function GridContainer({ cols, children }: Props) {
    return (
        <View style={{
            ...styles.container,
            flex: cols || 2,
        }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "auto",
        width: "100%",
    },
})