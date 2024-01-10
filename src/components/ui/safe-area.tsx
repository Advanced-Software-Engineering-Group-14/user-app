import {  StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../styles/colors';

export default function SafeArea({ children }: { children: React.ReactNode }) {
    return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        {children}
    </SafeAreaView>
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
})