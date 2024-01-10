import React from 'react'
import { View,  StyleSheet,  } from 'react-native'
import Heading from '../../src/components/hierarchy/text/heading';
import Body from '../../src/components/hierarchy/text/body';
import SafeArea from '../../src/components/ui/safe-area';
import BackButton from '../../src/components/ui/back-button';
import Container from '../../src/components/ui/container';
import VerifyEmailForm from '../../src/forms/verify-email-form'

export default function VerifyAccount() {
    return (
        <SafeArea>
           <BackButton />

            <Container>
                <View>
                    <View>
                        <Heading text="Verify Account" />
                        <Body text="Enter the verification code sent to your email. If you submit an expired code, a new one will be sent" />
                    </View>
                    <VerifyEmailForm />
                </View>
            </Container>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 16,
        justifyContent: "center"
    },
})