import DropdownSelect from 'react-native-input-select';
import {
    StyleSheet,
} from 'react-native';
import { DropdownProps } from 'react-native-input-select/lib/typescript/types/index.types';
import { COLORS } from '../../../styles/colors';



export const SelectInput: React.FC<DropdownProps> = ({ ...selectProps }) => {
    return (
        <DropdownSelect
            {...selectProps}
            dropdownErrorStyle={styles.dropdownErrorStyle}
            dropdownErrorTextStyle={{ color: 'red', fontWeight: '500' }}
            primaryColor={COLORS.black}
            dropdownStyle={styles.dropdownStyle}
        />
    )
}

const styles = StyleSheet.create({
    dropdownErrorStyle: {
        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    dropdownStyle: {
        backgroundColor: "transparent",
        paddingHorizontal: 12,
        paddingVertical: 5,
        minHeight: 50,
        borderRadius: 12
    },
    dropdownErrorTextStyle: {
        color: 'red',
        fontWeight: '500',
    }
})