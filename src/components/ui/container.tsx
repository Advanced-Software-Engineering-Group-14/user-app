import {  StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type Props = {
    children: React.ReactNode
    isCenter?: boolean
    noPadding?: boolean
    vPadding?: boolean
}
export default function Container({ children, isCenter, noPadding, vPadding }: Props) {
    const centerStyle = isCenter ? styles.isCenter : {}
    const vPaddingStyle = vPadding ? styles.vpadding : {}
    const paddingStyle = noPadding ? {} : styles.padding
    
    const fullStyles: StyleProp<ViewStyle> = {
        ...styles.container,
        ...centerStyle,
        ...paddingStyle,
        ...vPaddingStyle,
    }

    return <View style={fullStyles}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        gap: 8,
        // borderWidth: 2
    },
    isCenter: {
        alignItems: "center",
    },
    padding: {
        paddingHorizontal: 16,
    },
    vpadding: {
        paddingVertical: 16,
    },

})