import React from 'react';
import { Text} from 'react-native';


type Props = {
    text: string
}

export default function Body({ text }: Props) {

    let fontSize = 16;

    return (
        <Text
            style={{
                fontSize,
                fontWeight: "400"
            }}>
            {text}
        </Text>
    )
}