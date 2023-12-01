import React from 'react';
import { Text} from 'react-native';


type Props = {
    text: string
}

export default function Subheading({ text }: Props) {

    let fontSize = 20;

    return (
        <Text
            style={{
                fontSize,
                fontWeight: "500"
            }}>
            {text}
        </Text>
    )
}