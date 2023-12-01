import React from 'react';
import { Text} from 'react-native';


type Props = {
    text: string
    styles?: any
}

export default function Heading({ text, styles }: Props) {

    let fontSize = 32;

    return (
        <Text
            style={{
                fontSize,
                fontWeight: "700",
                letterSpacing: -1,
                ...styles
            }}>
            {text}
        </Text>
    )
}