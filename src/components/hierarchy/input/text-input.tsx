import React from 'react';
import {
    TextInput as RNTextInput,
    StyleSheet,
    Text,
    TextInputProps,
    View,
} from 'react-native';
import { COLORS } from '../../../styles/colors';

interface Props extends TextInputProps {
    errorMessage?: string;
    label: string;
}


export const TextInput: React.FC<Props> = ({
    errorMessage,
    label,
    ...textInputProps
}) => {
    return (
        <View style={styles.wrapper}>
            {/* <Text style={styles.label}>{label}</Text> */}
            <RNTextInput
                style={!!errorMessage ? styles.textInputWithError : styles.textInput}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={label}
                {...textInputProps}
            />
            {!!errorMessage && (
                <Text style={styles.errorMessageText}>{errorMessage}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 4,
    },
    textInputWithError: {
        // height: 48,
        borderWidth: 1,
        borderColor: COLORS.destructive,
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 1,
    },
    textInput: {
        // height: 48,
        borderWidth: 1,
        borderColor: COLORS.black,
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 1,
    },
    errorMessageText: {
        color: COLORS.destructive,
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
    },
    label: {
        color: '#000',
        marginBottom: 6,
        fontSize: 14,
    },
});