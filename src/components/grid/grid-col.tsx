import { StyleSheet,  View } from 'react-native'

type Props = {
    col: number
    children: JSX.Element
}

export function GridCol({  col, children }: Props) {
    return (
        <View style={{
            ...styles.container,
            flex: col || 1
        }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
    },
})