import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Dimensions

} from 'react-native';



const Loader = () => {

    return (

        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    animating={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        // borderWidth: 2,
        height: 300,
        // width: 200,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000000'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#00000010',
        height: 100,
        width: 100,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20
    }
});

export default Loader;