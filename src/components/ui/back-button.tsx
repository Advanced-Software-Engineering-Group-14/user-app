import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { COLORS } from '../../styles/colors'
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { router } from 'expo-router';


export default function BackButton() {
    
    const canGoBack = router.canGoBack()
    function goBack() {
        // console.log(canGoBack)
        if (router.canGoBack()) {
            return router.back()
        } else {
            return Alert.alert("Oops!", "There is no screen to go back to")
        }
    }
    return canGoBack && (
        <View style={styles.backButtonWrapper}>
            <TouchableOpacity onPress={goBack}>
                <ChevronLeftIcon size={32} color={COLORS.black} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    backButtonWrapper: {
        // padding: 10,
    }
})