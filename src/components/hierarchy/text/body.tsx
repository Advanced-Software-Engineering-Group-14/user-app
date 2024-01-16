import React from 'react';
import { Text} from 'react-native';


type Props = {
    text: string
    center?: boolean
}

export default function Body({ text, center }: Props) {

    let fontSize = 16;

    return (
        <Text
            style={{
                fontSize,
                fontWeight: "400",
                textAlign: center ? "center" : "left"
            }}>
            {text}
        </Text>
    )
}