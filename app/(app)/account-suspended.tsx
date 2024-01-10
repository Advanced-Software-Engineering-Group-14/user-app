import { View } from "react-native";
import Heading from "../../src/components/hierarchy/text/heading";
import SafeArea from "../../src/components/ui/safe-area";
import BackButton from "../../src/components/ui/back-button";
import Container from "../../src/components/ui/container";

export default function AccountSuspended() {
    return (
        <SafeArea>
            <BackButton />
            <Container>
                <Heading text="Account Suspended" />

            </Container>
        </SafeArea>
    )
}